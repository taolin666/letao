/**
 * Created by 陶林 on 2018/3/6.
 */
$(function(){
    var page=1;
    var pageSize=5;
    var $form=$('form')
    function render(){

        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(info){
                //console.log(info);
                $('tbody').html(template('tmp-second',info))

                //    分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentpage:page,
                    totalPages:Math.ceil(info.total/pageSize),
                    onPageClicked:function (a,b,c,p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }
    render()

//添加二级分类
    $('.add_category').on('click',function(){
        $('#secondModal').modal('show');//模态框显示

        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100,
            },
            success:function(info){
                console.log(info);
                $('.dropdown-menu').html(template('tmp2',info))
            }
        })
    })

    //给下拉框中所有的a标签注册点击事件
    $('.dropdown-menu').on('click','a',function(){
        //获取内容渲染在上面
        $('.dropdown-text').text($(this).text())
        //获取id给URL栏
        $("[name='categoryId']").val($(this).parent().data('id'))
        //改变校验图标
        //$form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    //初始化图片上传
    $("#btn-upload").fileupload({
        dataType: "json",//指定响应的格式
        done: function (e, data) {//图片上传成功之后的回调函数
            //通过data.result.picAddr可以获取到图片上传后的路径
            console.log(data);
            console.log(data.result.picAddr);

            //设置给img_box中img的src属性
            $(".img_box img").attr("src", data.result.picAddr);

            //把图片的地址赋值给brandLogo
            $("[name='brandLogo']").val(data.result.picAddr);

            //把brandLogo改成成功
            //$form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    $form.bootstrapValidator({
        excluded: [],//不校验的内容
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
                    }
                }
            }
        }
    });


    //给表单注册校验成功事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        console.log($form.serialize());
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $form.serialize(),
            success:function(info){
                if(info.success){
                    //1. 关闭模态框
                    $('#secondModal').modal('hide');
                    //2. 重新渲染第一页
                    page=1;
                    render()
                    //3. 重置内容和样式
                    $form.data('bootstrapValidator').resetForm();
                    //4. 重置下拉框组件和图片
                    $('.dropdown-text').text('请选择一级菜单');
                    $("[name='categoryId']").val('');
                    $('.img_box img').attr('src','images/none.png')
                    $("[name='brandLogo']").val('');
                }
            }
        })
    })
})