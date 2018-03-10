/**
 * Created by ���� on 2018/3/6.
 */
$(function(){
    //发送ajax，动态渲染导航栏
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        success:function(info){
            console.log(info);
            $('.nav_aside').html(template('tmp_nav',info))

            //渲染二级分类
            render(info.rows[0].id)
        }
    })

    $('.nav_aside').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');//点到那个li 就让那个li有now的类
        var id=$(this).children().data('id')//获取id
        render(id);
    })


    //    ajax请求二级分类
    function render(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id,
            },
            success:function(info){
                console.log(info);
                $('.content_info').html(template('tmp_info',info))
            }
        })
    }

})