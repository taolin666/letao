/**
 * Created by ���� on 2018/3/6.
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

                //    ��ҳ
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

//��Ӷ�������
    $('.add_category').on('click',function(){
        $('#secondModal').modal('show');//ģ̬����ʾ

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

    //�������������е�a��ǩע�����¼�
    $('.dropdown-menu').on('click','a',function(){
        //��ȡ������Ⱦ������
        $('.dropdown-text').text($(this).text())
        //��ȡid��URL��
        $("[name='categoryId']").val($(this).parent().data('id'))
        //�ı�У��ͼ��
        //$form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    //��ʼ��ͼƬ�ϴ�
    $("#btn-upload").fileupload({
        dataType: "json",//ָ����Ӧ�ĸ�ʽ
        done: function (e, data) {//ͼƬ�ϴ��ɹ�֮��Ļص�����
            //ͨ��data.result.picAddr���Ի�ȡ��ͼƬ�ϴ����·��
            console.log(data);
            console.log(data.result.picAddr);

            //���ø�img_box��img��src����
            $(".img_box img").attr("src", data.result.picAddr);

            //��ͼƬ�ĵ�ַ��ֵ��brandLogo
            $("[name='brandLogo']").val(data.result.picAddr);

            //��brandLogo�ĳɳɹ�
            //$form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    $form.bootstrapValidator({
        excluded: [],//��У�������
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //У�����
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "��ѡ��һ������"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "������������������"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "���ϴ�Ʒ��ͼƬ"
                    }
                }
            }
        }
    });


    //����ע��У��ɹ��¼�
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        console.log($form.serialize());
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $form.serialize(),
            success:function(info){
                if(info.success){
                    //1. �ر�ģ̬��
                    $('#secondModal').modal('hide');
                    //2. ������Ⱦ��һҳ
                    page=1;
                    render()
                    //3. �������ݺ���ʽ
                    $form.data('bootstrapValidator').resetForm();
                    //4. ���������������ͼƬ
                    $('.dropdown-text').text('��ѡ��һ���˵�');
                    $("[name='categoryId']").val('');
                    $('.img_box img').attr('src','images/none.png')
                    $("[name='brandLogo']").val('');
                }
            }
        })
    })
})