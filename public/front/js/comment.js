/**
 * Created by ���� on 2018/3/6.
 */

    //区域滚动
    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    });


//轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });


//截取地址栏的信息转成对象形式的封装
function getSearch(key){
    var str=location.search;
    var str1=decodeURI(str);
    var str2=str1.slice(1);
    var str3=str2.split('&');//变成数组
    var obj={};
    str3.forEach(function(element,index){
        var k=element.split('=')[0];
        var v=element.split('=')[1];
        obj[k]=v;

    })
    return obj[key];
}
