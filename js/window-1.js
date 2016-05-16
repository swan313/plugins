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
 * @handler4CloseBtn 关闭回调函数
 * @handler4AlertBtn 弹窗确定回调函数
 * @text4AlertBtn   弹窗确定按钮文字  默认：确定
 * @lassName    定制弹窗皮肤 window_skin_X
 * @hasMask   弹窗是否是模态  默认：true
 * @isDraggable 弹窗是否可拖动 默认：true
 * @dragHandle 拖动把手 默认：null 全弹窗可拖动
*
*/
define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
    function Window(){
        this.cfg = {
            width: 500,
            height: 300,
            title: '系统消息',
            content: '',
            handler4AlertBtn: null,
            handler4CloseBtn: null,
            hasCloseBtn: false,
            skinClassName: null,
            text4AlertBtn: '确定',
            hasMask: true,
            isDraggable: true,
            dragHandle: null
        };
        this.handlers = {};
    }
    Window.prototype = $.extend({},new widget.Widget(),{
        renderUI: function(){
            this.boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">' + this.cfg.title + '</div>' +
                    '<div class="window_body">' + this.cfg.content + '</div>' +
                    '<div class="window_footer"><input class="window_alertBtn" type="button" value="' + this.cfg.text4AlertBtn + '"></div>' +
                '</div>'
            );
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }
            if(this.cfg.hasCloseBtn){
                this.boundingBox.append('<span class="window_closeBtn">&times;</span>');
            }
            this.boundingBox.appendto(document.body);
        },
        bindUI: function(){
            var that = this;
            this.boundingBox.delegate('.window_alertBtn','click',function(){
                that.fire('alert');
                that.destroy();
            }).delegate('.window_closeBtn','click',function(){
                that.fire('close');
                that.destroy();
            });

            if(this.cfg.handler4AlertBtn){
                this.on('alert',this.cfg.handler4AlertBtn);
            }
            if(this.cfg.handler4CloseBtn){
                this.on('close',this.cfg.handler4CloseBtn);
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
            var CFG = $.extend(this.cfg,cfg),
                boundingBox = $(
                    '<div class="window_boundingBox">' +
                        '<div class="window_header">' + CFG.title + '</div>' +
                        '<div class="window_body">' + CFG.content + '</div>' +
                        '<div class="window_footer"><input class="window_alertBtn" type="button" value="' + CFG.text4AlertBtn + '"></div>' +
                    '</div>'
                ),
                btn = boundingBox.find('.window_footer input'),
                mask = null,
                that = this;

            if(CFG.hasMask){
                mask = $('<div class="window_mask"></div>');
                mask.appendTo('body');
            }
            boundingBox.appendTo('body');



            btn.click(function(){
                //CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();
                mask && mask.remove();
                that.fire('alert');
            });

            boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
            });

            if(CFG.hasCloseBtn){
                var closeBtn = $('<span class="window_closeBtn">&times;</span>');
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function(){
                    //CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire('close');
                });
            }

            if(CFG.skinClassName){
                boundingBox.addClass(CFG.skinClassName);
            }
            if(CFG.isDraggable){
                if(CFG.dragHandle){
                    boundingBox.draggable({handle: CFG.dragHandle});
                }else{
                    boundingBox.draggable();
                }
            }
            if(CFG.handler4AlertBtn){
                this.on('alert',CFG.handler4AlertBtn);
            }
            if(CFG.handler4CloseBtn){
                this.on('close',CFG.handler4CloseBtn);
            }

            return this;

        },
        confirm: function(){},
        prompt: function(){}
    });
    return {
        Window: Window
    }
});