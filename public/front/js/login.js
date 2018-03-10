/**
 * Created by 陶林 on 2018/3/8.
 */
$(function(){
    $('.btn_login').on('click',function(e){
        e.preventDefault;//阻止button的提交功能
        var username=$('[name=username]').val();
        var password=$('[name=password]').val();
    //    先校验表单
        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(!password){
            mui.toast('请输入密码');
            return;
        }

    //    ajax请求
        $.ajax({
            type:'post',
            url:'/user/login',
            data:$('form').serialize(),
            success:function(info){
                console.log(info);
                if(info.error){
                    mui.toast(info.message);
                    return;
                }
                if(info.success){
                   if(location.href.indexOf('retUrl')!=-1){
                       history.go(-1);
                   }else{
                       location.href='user.html';
                   }
                }
            }
        })
    })
})