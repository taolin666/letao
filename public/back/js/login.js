/**
 * Created by ���� on 2018/3/4.
 */
//$function 的作用：1防止全局污染
$(function () {
 var $form=$('form');
    //表单校验
    $form.bootstrapValidator({
        //
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空",
                    },
                    callback:{
                        message:"用户名不存在",
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空",
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"长度应该在6-12位",
                    },
                    callback:{
                        message:"密码错误",
                    }
                }
            }
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    })
    //当表单校验成功时，会触发success.form.bv事件，此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        console.log($form.serialize())
        //ajax请求
        $.ajax({
            type:'POST',
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href="index.html";
                }
                if(info.error==1000){
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(info.error===1001){
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
            }
        })
    });
//    表单重置功能
    $("[type='reset']").on('click',function(){
        $form.data('bootstrapValidator').resetForm();
    })
})