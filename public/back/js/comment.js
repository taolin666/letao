/**
 * Created by ���� on 2018/3/4.
 */
$(function(){
    //
    $(document).ajaxStart(function(){
        NProgress.start()
    })
    $(document).ajaxStop(function(){
        setInterval(function(){
            NProgress.done()
        },500)
    })


})
$(function () {
    //
    $('.child').prev().on('click',function(){
        $(this).next().slideToggle();
    })
    //
    $('.icon_menu').on('click',function(){
        $(".lt_aside").toggleClass("n");
        $('.lt_main').toggleClass('now');
        $('.lt_header').toggleClass('now');
    })

//    ���˳���ťע���¼�
    $('.icon_logout').on('click',function(){
        $('#logoutModal').modal('show');

    //    ����˳�����
        $('.btn_logout').off().on('click',function(){
            $.ajax({
                type:"get",
                url:"/employee/employeeLogout",
                success:function (data) {
                    console.log(data);
                    if(data.success){
                        //退出成功
                        location.href = "login.html";
                    }
                }
            });
        })
    })
})