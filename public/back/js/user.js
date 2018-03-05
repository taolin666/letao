/**
 * Created by луаж on 2018/3/5.
 */
$(function(){
    var page=1;
    var pageSize=5;
    $.ajax({
        type:'GET',
        url:'/user/queryUser',
        data:{
            page:page,
            pageSize:pageSize,
        },
        success:function(info){
            console.log(info);
        }
    })
})