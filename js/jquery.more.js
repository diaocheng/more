/**
 * 加载更多插件
 * options={
 *     [disabled:boolean(false/true)],
 *     [offset:integer],
 *     callback:function(more){
 *         ...
 *     }
 * }
 * @param  boolean options.disabled 可选参数(默认为false)
 * @return integer options.offset  当绑定为window时为可选参数(默认为0)
 * callback为回调函数 more返回的为插件的disabled,animate.target和animate.interval参数对象
 */
(function($) {
    'use strict';
    var more = {
        init: function(options) {
            if (typeof(options) == "undefined") {
                throw new Error('参数未定义');
            }
            if (typeof(options.object) == "undefined") {
                throw new Error('未绑定对象');
            }
            if(typeof(options.animate)=="undefined"){
                options.animate=$("#more[data-target='more']")
            }
            if (typeof(options.disabled) == "undefined") {
                options.disabled = false;
            }
            this.options = {
                disabled: options.disabled,
            };
            if (options.object[0] == window) {
                if (typeof(options.offset) == "undefined") {
                    options.offset = 0;
                }
                options.object = {
                    container: $(window),
                    document: $(document)
                }
                options.scrollTop = options.object.container.scrollTop();
                this.scroll(options);
            } else {
                this.click(options);
            }
        },
        scroll: function(options) {
            options.object.container.on("scroll", function() {
                if (!more.options.disabled) {
                    if (options.object.container.scrollTop() + options.object.container.height() + options.offset >= options.object.document.height() && options.object.container.scrollTop() > options.offset) {
                        //只能向下滑动加载
                        if (options.scrollTop <= options.object.container.scrollTop()) {
                            more.options.disabled = true;
                            options.scrollTop = options.object.container.scrollTop();
                            //防止不能触发滚动
                            options.object.container.scrollTop(options.scrollTop - 5);
                            more.loading(options.animate);
                            return options.callback(more.options.animate);
                        }
                    }
                }
            });
        },
        click: function(options) {
            options.object.on("click", function() {
                if (!more.options.disabled) {
                    more.options.disabled = true;
                    more.loading(options.animate);
                    return options.callback(more.options.animate);
                }
            });
        },
        loading: function(options) {
            var count = 0;
            var text = "加载中";
            options.html(text);
            more.options.animate = {
                target: options,
                interval: setInterval(function() {
                    count++;
                    text += ".";
                    if (count % 4 == 0) {
                        text = "加载中";
                    }
                    options.html(text);
                }, 1000),
                stop:function(options){
                    clearInterval(more.options.animate.interval);
                    more.options.disabled=options.disabled;
                    more.options.animate.target.html(options.text);
                }
            }
        }
    }
    $.fn.more = function(options) {
        options.object = $(this);
        more.init(options);
    }
})(jQuery);