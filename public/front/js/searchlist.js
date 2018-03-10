/**
 * Created by ���� on 2018/3/7.
 */
$(function(){
// 功能一   将地址栏的key属性放到input框里
    var val=getSearch('key');
    $('.search_text').val(val)
    render();
    $('.search_text').val('');


//    功能二  点击搜索按钮
    $('.search_btn').on('click', function () {
        var val=$(this).siblings().val();
        render(val)
    })
    function render(val){
        var parem={};
        parem.page=1;
        parem.pageSize=10;
        parem.proName=val;
//处理price与num， 如果lt_sort下有now这个类，就传排序字段，否则不传
        var $now=$('.content-tit a.now')
        if($now.length>0){
            var price=$now.data('type');
            var num =$now.find('span').hasClass('fa-angle-down')?2:1
            parem[price]=num;
        }
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:parem,
            beforeSend:function(){
                $('.content-main').html("<div class='load'></div>")
            },
            success:function(info){
                console.log(info);
                setInterval(function(){
                    $('.content-main').html(template('tmp',info))
                },2000)
            }
        })
    }
    render()




//    功能三 排序功能
    $(".content-tit a[data-type]").on('click',function(){
        var $this=$(this);
        if($this.hasClass('now')){
            $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        }else{
            $this.toggleClass('now').siblings().removeClass('now');
            $('.sort span').removeClass('fa-angle-up').addClass('fa-angle-down')
        }
        render()
    })
})