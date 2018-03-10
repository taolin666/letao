/**
 * Created by ���� on 2018/3/7.
 */
$(function() {
    //$('.btn_empty').on('click',function(){
    //    $('.history').remove();
    //    mui.confirm('你是否清空所有的历史记录','温馨提示',['取消','确定'],function(){
    //        $('.his_empty').show();
    //    })
    //})


    //列表渲染功能
    //1. 从本地缓存中获取到需要渲染的数据
    function getHistory() {
        var history = localStorage.getItem("history_list") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    function render() {
        var arr = getHistory();
        console.log(arr);
        $('.history').html(template('tmp', {arr: arr}));
    }

    render();

    //功能二：清空
    //1. 给清空按钮注册点击事件(委托)
    //2. 清空 search_list 这个值
    //3. 重新渲染
    $('.btn_empty').on('click', function () {
        mui.confirm('你是否清空所有的历史记录', '温馨提示', ['取消', '确定'], function (e) {
            //通过e.index就可以知道点击了那个按钮
            console.log(e);
            if (e.index === 0) {
                localStorage.removeItem('history_list');
                render();
            }
        })
    })


    //功能3：删除
    //1. 给删除按钮注册点击事件
    //2. 获取到删除的下标
    //3. 获取到web存储中的数组
    //4. 删除数组中对应下标那项
    //5. 重新设置search_list的值
    //6. 重新渲染。
    $('.history').on('click', '.btn_delete', function () {
        var that = this;
        mui.confirm('你是否清空所有的历史记录', '温馨提示', ['取消', '确定'], function (e) {
            if (e.index === 0) {
                var index = $(that).data(id);
                //    数组
                var arr = getHistory();
                //删除
                arr.splice('index', 1);
                //把json对象转成json字符串
                localStorage.setItem('history_list', JSON.stringify(arr));

                render()

            }

        })
    })


    //功能4： 增加
    //1. 给搜索按钮注册事件
    //2. 获取到文本框value值
    //3. 获取到存储中的数组
    //4. 把value值添加到数组中的最前面
    //5. 重新设置search_list的值
    //6. 重新渲染 （跳转到搜索详情页）

    $('.search_btn').on('click', function () {
       var value = $('.search_text').val().trim();//拿到input的值
        $('.search_text').val('');//清空input的值
        if(value == "") {
            mui.toast("请输入搜索关键字");
            return;
        }
        var arr=getHistory();//拿出json的字符串转成json的对象

        //把value添加到数组的最前面
        //需求1：数组长度不能过10
        //需求2：如果这个搜索关键字已经存在，需要删除掉
        //获取value在数组中的位置})
        var index=arr.indexOf(value)
        if(index !=-1){
            arr.splice(value,1);
        }
        if(arr.length >=10){
            arr.pop();
        }
        arr.unshift(value);

        localStorage.setItem('history_list',JSON.stringify(arr));
        location.href="searchlist.html?key="+value;
    })



})