/**
 * Created by Administrator on 2016/1/6.
 */

/*
 * @width    弹窗宽度
 * @height   弹窗高度
 * @x        弹窗X轴数值
 * @y        弹窗y轴数值
 * @title    弹窗标题
 * @content  弹窗内容
 * @hasCloseBtn  是否有右上关闭按钮 默认：false
 * @text4AlertBtn   弹窗确定按钮文字  默认：确定
 * @hasMask   弹窗是否是模态  默认：true
 * @isDraggable 弹窗是否可拖动 默认：true
 * @dragHandle 拖动把手 默认：null 全弹窗可拖动
 * @skinClassName    定制弹窗皮肤 window_skin_X
 * @text4ConfirmBtn confirm的 ‘确认’ 按钮
 * @textCancelBtn   ‘取消’ 按钮
 * @handler4CloseBtn 关闭回调函数
 * @handler4AlertBtn 弹窗确定回调函数
 * @handler4ConfirmBtn  confirm的 ‘确认’ 按钮的回调函数
 * @handler4CancelBtn  confirm的 ‘取消’ 按钮的回调函数
 * @text4PromptBtn      prompt ‘确定’ 按钮，默认：‘确定
 * @isPromptInputPassword   是否是密码类型的输入框，默认：false
 * @dtValue4PromptInput     设置弹窗的默认值，默认：’‘
 * @maxlength4PromPtInput   设置输入框输入的最多字符数
 * @handler4PromptBtn       prompt确定时的回调函数
 *
*/
define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
    function Window(){
        this.cfg = {
            width: 500,
            height: 300,
            title: '系统消息',
            content: '',
            hasCloseBtn: false,
            hasMask: true,
            isDraggable: true,
            dragHandle: null,
            skinClassName: null,
            text4AlertBtn: '确定',
            text4ConfirmBtn: '确定',
            text4CancelBtn: '取消',
            text4PromptBtn: '确定',
            isPromptInputPassword: false,
            defaultValue4PromptInput: '',
            maxlength4PromPtInput: 10,
            handler4AlertBtn: null,
            handler4CloseBtn: null,
            handler4ConfirmBtn: null,
            handler4CancelBtn: null,
            handler4PromptBtn: null
        };
        this.handlers = {};
    }
    Window.prototype = $.extend({},new widget.Widget(),{
        renderUI: function(){
            var footerContent = '';
            switch(this.cfg.winType){
                case "alert":
                    footerContent = '<input class="window_alertBtn" type="button" value="' + this.cfg.text4AlertBtn + '">';
                    break;
                case "confirm":
                    footerContent = '<input type="button" value="' + this.cfg.text4ConfirmBtn + '" class="window_confirmBtn"><input type="button" value="' + this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
                    break;
                case "prompt":
                    this.cfg.content += '<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword ? "password" : "text") + '" value="' + this.cfg.defaultValue4PromptInput + '" maxlength="' +
                            this.cfg.maxlength4PromPtInput + '" class="window_promptInput"></p>';
                    footerContent = '<input type="button" value="' + this.cfg.text4PromptBtn + '" class="window_promptBtn"><input type="button" value="' + this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
                    break;
            }
            this.boundingBox = $(
                '<div class="window_boundingBox">' +
                    //'<div class="window_header">' + this.cfg.title + '</div>' +
                    '<div class="window_body">' + this.cfg.content + '</div>' +
                    //'<div class="window_footer">' + footerContent + '</div>' +
                '</div>'
            );
            if(this.cfg.winType != 'common'){
                this.boundingBox.prepend('<div class="window_header">' + this.cfg.title + '</div>');
                this.boundingBox.append('<div class="window_footer">' + footerContent + '</div>');
            }
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }
            if(this.cfg.hasCloseBtn){
                this.boundingBox.append('<span class="window_closeBtn">&times;</span>');
            }
            this.boundingBox.appendTo(document.body);
            this._promptInput = this.boundingBox.find('.window_promptInput');
        },
        bindUI: function(){
            var that = this;
            this.boundingBox.delegate('.window_alertBtn','click',function(){
                that.fire('alert');
                that.destroy();
            }).delegate('.window_closeBtn','click',function(){
                that.fire('close');
                that.destroy();
            }).delegate('.window_confirmBtn','click',function(){
                that.fire('confirm');
                that.destroy();
            }).delegate('.window_cancelBtn','click',function(){
                that.fire('cancel');
                that.destroy();
            }).delegate('.window_promptBtn','click',function(){
                that.fire('prompt',that._promptInput.val());
                that.destroy();
            });

            if(this.cfg.handler4AlertBtn){
                this.on('alert',this.cfg.handler4AlertBtn);
            }
            if(this.cfg.handler4CloseBtn){
                this.on('close',this.cfg.handler4CloseBtn);
            }

            if(this.cfg.handler4ConfirmBtn){
                this.on('confirm',this.cfg.handler4ConfirmBtn);
            }
            if(this.cfg.handler4CancelBtn){
                this.on('cancel',this.cfg.handler4CancelBtn);
            }

            if(this.cfg.handler4PromptBtn){
                this.on('prompt',this.cfg.handler4PromptBtn);
            }
        },
        syncUI: function(){
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
            });
            if(this.cfg.skinClassName){
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if(this.cfg.isDraggable){
                if(this.cfg.dragHandle){
                    this.boundingBox.draggable({handle:this.cfg.dragHandle});
                }else{
                    this.boundingBox.draggable();
                }
            }
        },
        destructor: function(){
            this._mask && this._mask.remove();
        },

        alert: function(cfg){
            $.extend(this.cfg,cfg,{winType: 'alert'});
            this.render();
            return this;
        },
        confirm: function(cfg){
            $.extend(this.cfg,cfg,{winType: 'confirm'});
            this.render();
            return this;
        },
        prompt: function(cfg){
            $.extend(this.cfg,cfg,{winType: 'prompt'});
            this.render();
            this._promptInput.focus();
            return this;
        },
        common: function(cfg){
            $.extend(this.cfg,cfg,{winType: 'common'});
            this.render();
            return this;
        }
    });
    return {
        Window: Window
    }
});