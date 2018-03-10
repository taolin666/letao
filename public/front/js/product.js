/**
 * Created by ���� on 2018/3/8.
 */
$(function(){
    var id=getSearch('productId')
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{id:id},
        success: function (info) {
            console.log(info);
            $('.mui-scroll').html(template('tmp',info));
            //���³�ʼ���ֲ�ͼ
            mui('.mui-slider').slider();
            //���³�ʼ��numbox
            mui('.mui-numbox').numbox();
            //����ѡ�����
            $('.size span').on('click',function(){
                $(this).addClass('now').siblings().removeClass('now');
            })
        }
    })


    //���ܶ������빺�ﳵ
    //1. ����ťע�����¼�
    //2. ��ȡproductId, num, size ,����ajax����
    $('body').on('click','.btn_add_cart',function(){
        var size=$('.size span.now').text();
        var num=$('.mui-numbox-input').val();
            if(!size){
                mui.toast('请选择尺寸');
            }
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:id,
                size:size,
                num:num,
            },
            success:function(info){
                console.log(info);
                if(info.error){
                //    跳转当前页码，并把当前页传过去。
                    location.href="login.html?retUrl="+location.href;
                }
                if(info.success){
                    mui.confirm('添加成功','温馨提示', ['去购物','继续浏览'],function(e){
                        if(e.index==0){
                            location.href='cart.html';
                        }
                    })
                }
            }
        })

    })
})