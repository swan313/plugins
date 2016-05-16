/**
 * Created by Administrator on 2016/1/6.
 */
requirejs.config({
    paths:{
        jquery: 'jquery-1.11.3',
        jqueryUI: 'jquery-ui.min'
    }
});

requirejs(['jquery','window'],function($,w){
    $('#a').click(function(){
        new w.Window().alert({
            width: 300,
            height: 150,
            y: 50,
            title: '提示',
            hasCloseBtn: true,
            content: 'welcome!',
            text4AlertBtn: 'OK',
            handler4AlertBtn: function(){
                alert('you click the alert button')
            },
            handler4CloseBtn: function(){
                alert('you click the close button')
            },
            hasMask: false,
            dragHandle: '.window_header'

        });


    });

    $('#b').click(function(){
        var win = new w.Window();
        win.confirm({
            width: 300,
            height: 150,
            y: 50,
            title: '提示',
            hasCloseBtn: true,
            content: 'welcome!',
            text4ConfirmBtn: 'OK',
            text4CancelBtn: 'No',
            skinClassName: 'window_skin_a',
            handler4AlertBtn: function(){
                alert('you click the alert button')
            },
            handler4CloseBtn: function(){
                alert('you click the close button')
            },
            hasMask: false,
            dragHandle: '.window_header'
        }).on('confirm',function(){
            alert('OK');
        });
        win.on('cancel',function(){
            alert('No');
        });
    });

    $('#c').click(function(){
        var win = new w.Window();
        win.prompt({
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true,
            title: '请输入您的名字',
            content: '我们将会为您保密您输入的信息',
            text4PromptBtn: '输入',
            text4CancelBtn: '取消',
            defaultValue4PromptInput: '张三',
            dragHandle: '.window_header',
            handler4PromptBtn: function(inputValue){
                alert('您输入的内容是：'+ inputValue);
            },
            handler4CancelBtn: function(){
                alert('取消');
            }
        });

    });

    $('#d').click(function(){
        var win = new w.Window();
        win.common({
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true,
            content: '我们将会为您保密您输入的信息'


        });

    });
});