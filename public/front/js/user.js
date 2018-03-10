/**
 * Created by луаж on 2018/3/8.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(info){
            console.log(info);
            $('.user_info').html(template('tmp_info',info));
        }
    })


    $('.btn_logout').on('click',function(){

        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(info){
                //console.log(info);
                if(info.success){
                    location.href="login.html";
                }
            }
        })
    })
})