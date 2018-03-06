/**
 * Created by 陶林 on 2018/3/5.
 */
$(function(){
    var page=1;
    var pageSize=5;
    function render(){
        $.ajax({
            type:'GET',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(info){
                console.log(info);
                $('tbody').html(template('tmp-user',info))

                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total/pageSize),
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }
    render();

    $('tbody').on('click','.btn',function(){
        $('#userModal').modal('show');//开启模态框

        var id=$(this).parent().data('id');//获取到id
        var isDelete=$('this').hasClass('btn-danger')?0:1;//获取有isDelete

        $('.btn_confirm').off().on('click',function(){
            //ajax请求
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete,
                },
                success:function(info){
                    if(info.success){
                        //关闭模态框
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            })
        })
    })

})