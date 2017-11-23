"use strict";

//推荐歌单
$.ajax({
    url: "http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&method=baidu.ting.song.getRecommandSongList&song_id=877578&num=9", //请求地址
    dataType: "jsonp", //指定为jsonp类型
    jsonpCallback: 'f',
    count: 10,

    success: function f(data) {
        //console.log(data.result.list);
        var res = data.result.list;
        var str = '';
        res.forEach(function (item, index) {
            str += '<a href=""><div class="photo"><img src="' + item.pic_small + '"/></div><p>' + item.title + '</p></a>';
        }), $(".figure").html(str);
    },
    error: function error(err) {
        //失败的回调函数
        throw new Error(err);
    }
});
//最新音乐
$.ajax({
    url: "http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&method=baidu.ting.billboard.billList&type=1&size=10", //请求地址
    dataType: "jsonp", //指定为jsonp类型
    jsonpCallback: 'fn',
    count: 10,

    success: function fn(data) {
        //console.log(data.song_list);
        var res = data.song_list;
        var str = '';
        res.forEach(function (item, index) {
            str += '<div class="music clearfix"><div class="fl"><p class="song">' + item.title + '</p><p class="author">' + item.author + '</p></div><div class="fr"><i class="iconfont icon-playon"></i></div></div>';
        }), $(".new").html(str);
    },
    error: function error(err) {
        //失败的回调函数
        throw new Error(err);
    }
});
//热歌榜
$.ajax({
    url: "http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&method=baidu.ting.billboard.billList&type=2&size=20", //请求地址
    dataType: "jsonp", //指定为jsonp类型
    jsonpCallback: 'ag',
    count: 10,

    success: function ag(data) {
        console.log(data.song_list);
        var res = data.song_list;
        var str = '';
        res.forEach(function (item, index) {
            str += '<a class="floor1"><div class="music clearfix"><div class="num fl">' + (index + 1) + '</div><div class="fl"><p class="song">' + item.title + '</p><p class="author">' + item.author + '</p></div><div class="fr"><i class="iconfont icon-playon"></i></div></div></a>';
        }), $(".agog").html(str);
    },
    error: function error(err) {
        //失败的回调函数
        throw new Error(err);
    }
});

//搜索
var ipt = document.querySelector(".ipt input");
console.log(ipt);
var li = document.querySelectorAll(".div1 li");
var src = 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&method=baidu.ting.search.catalogSug&query=';
for (var _i = 0; _i < li.length; _i++) {
    li[_i].onclick = function () {
        ipt.value = this.innerHTML;
        $(".div1").hide();
        $(".div5").show();
        $.ajax({
            url: src + ipt.value,
            dataType: "jsonp", //指定为jsonp类型
            success: function success(data) {
                console.log(data.song);
                var res = data.song;
                var str = '';
                res.forEach(function (item, index) {
                    console.log("1");
                    str += '<a class="floor1"><div class="music clearfix"><div class="num fl"><p class="song">' + item.songname + '</p><p class="author">' + item.artistname + '</p></div><div class="fr"><i class="iconfont icon-playon"></i></div></div></a>';
                }), $(".div5").html(str);
            },
            error: function error(err) {
                //失败的回调函数
                throw new Error(err);
            }
        });
    };
}
ipt.onchange = function () {
    $(".div1").hide();
    $(".div5").show();
    var val = this.value;
    $.ajax({
        url: src + val,
        dataType: "jsonp", //指定为jsonp类型
        success: function success(data) {
            console.log(data.song);
            var res = data.song;
            var str = '';
            res.forEach(function (item, index) {
                console.log("1");
                str += '<a class="floor1"><div class="music clearfix"><div class="num fl"><p class="song">' + item.songname + '</p><p class="author">' + item.artistname + '</p></div><div class="fr"><i class="iconfont icon-playon"></i></div></div></a>';
            }), $(".div5").html(str);
        },
        error: function error(err) {
            //失败的回调函数
            throw new Error(err);
        }
    });
};

//主页模态框
var modal = document.getElementsByClassName("modal")[0];
var carte = document.getElementsByClassName("carte")[0];
var lg = document.getElementsByClassName("lg")[0];
/*---点击菜单,显示模态框---*/
carte.onclick = function () {
    modal.className = "modal active";
};
/*---点击模态框,隐藏---*/
modal.onclick = function (e) {
    e = e || window.event;
    if (e.target.className === "modal active") {
        modal.className = "modal";
        lg.style.display = "none";
    }
};
//主页选项卡
var m_btn = document.querySelectorAll(".m-top span");
var m_content = document.querySelectorAll(".m-main>div");
console.log(m_btn);
console.log(m_content);

var _loop = function _loop(_i2) {
    m_btn[_i2].onclick = function () {
        for (var j = 0; j < m_btn.length; j++) {
            m_btn[j].className = "";
            m_content[j].className = "";
        }
        this.className = "active";
        m_content[_i2].className = "active";
    };
};

for (var _i2 = 0; _i2 < m_btn.length; _i2++) {
    _loop(_i2);
}
/*---获取cookie---*/

var turn = document.getElementById("turn"),
    div1 = document.querySelector(".data .div1"),
    bye = document.getElementById("bye"),
    div2 = document.querySelector(".data .div2");

function setCookie(key, value, time) {
    var date = new Date();
    date.setDate(date.getDate() + time); // 当前时间 + 30天
    document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + date;
}
var _cookie = document.cookie;
var arr = _cookie.split(";");
for (var i = 0; i < arr.length; i++) {
    if (arr[i].split("=")[0].trim()) {
        if (!sessionStorage.getItem("name")) {
            turn.innerHTML = arr[i].split("=")[1];
        } else {
            turn.innerHTML = sessionStorage.getItem("name");
        }
        div1.style.display = "block";
        div2.style.display = "none";
    } else {
        div1.style.display = "none";
        div2.style.display = "block";
    }
}
/*---移除cookie---*/
function removeCookie(key) {
    setCookie(key, null, -1);
}
bye.onclick = function () {
    removeCookie("username");
    location.reload();
    sessionStorage.clear();
};
/*---背景图---*/
var data = document.querySelector(".data");
if (!sessionStorage.getItem("pic2")) {
    data.style.backgroundImage = 'url(http://img1.imgtn.bdimg.com/it/u=1769181433,1179787488&fm=27&gp=0.jpg)';
} else {
    var ul = sessionStorage.getItem("pic2");
    data.style.backgroundImage = 'url(' + ul + ')';
}
/*---点击银行卡管理---*/
var card = document.getElementsByClassName("card")[0];
var address = document.getElementsByClassName("address")[0];

var a = getCookie("username");
var st = document.cookie.indexOf("username=");

card.onclick = function () {
    if (st == -1) {
        lg.style.display = "block";
        lg.innerHTML = "请先登录";
    } else {
        location.href = "card.html";
    }
};
address.onclick = function () {
    if (st == -1) {
        lg.style.display = "block";
        modal.className = "modal active";
        lg.innerHTML = "请先登录";
    } else {
        location.href = "address.html";
    }
};

//获取cookie
function getCookie(key) {
    var _cookie = document.cookie; //username=wally; age=17; sex=man
    var arr = _cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].split("=")[0].trim() === key) {
            return arr[i].split("=")[1];
        }
    }
}