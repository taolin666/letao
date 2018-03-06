/**
 * Created by ���� on 2018/3/6.
 */
$(function(){
    var currentPage= 1,pageSize=5;

    function render(){
//    ��Ⱦ����
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                $('tbody').html(template('tmp-first',info))

                //    ��Ⱦ��ҳ
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentpage:currentPage,
                    totalPages:Math.ceil(info.total/pageSize),
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render()
    $('.add_category').on('click',function(){
        $('#firstModal').modal('show');//ģ̬����ʾ
    })
    //表单校验功能
    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类的名称"
                    }
                }

            }
        }
    });

    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
                if(info.success){
                    $('#firstModal').modal('hide');//关闭模态框
                //    重新渲染第一页
                        page=1;
                    render();
                //    把模态框的数据重置
                    $form.data("bootstrapValidator").resetForm();
                }
            }
        })
    })
})


