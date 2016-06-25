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
 * callback为回调函数 more返回的为插件的set函数对象，more.set()参数为true或false
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
            if (typeof(options.animate) == "undefined") {
                options.animate = $(".more[data-target='more']")
            }
            if (typeof(options.disabled) == "undefined") {
                options.disabled = false;
            }
            if (typeof(options.cycle) == "undefined") {
                options.cycle = 4;
            }
            if (typeof(options.frequency) == "undefined") {
                options.frequency = 1000;
            }
            //定义内部引用参数
            this.options = {
                disabled: options.disabled,
                target: options.animate,
                cycle: options.cycle,
                frequency: options.frequency,
                animateOn: "加载中",
                animateOff: "加载更多",
                animateOver: "没有更多了"
            }
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
                            options.object.container.scrollTop(options.scrollTop - 1);
                            more.animate();
                            return options.callback(more.set);
                        }
                    }
                }
            });
        },
        click: function(options) {
            options.object.on("click", function() {
                if (!more.options.disabled) {
                    more.options.disabled = true;
                    more.animate();
                    return options.callback(more.set);
                }
            });
        },
        animate: function() {
            var count = 0;
            var showTxt = more.options.animateOn;
            more.options.target.html(showTxt);
            more.options.interval = setInterval(function() {
                count++;
                showTxt += ".";
                if (count % more.options.cycle == 0) {
                    showTxt = more.options.animateOn;
                }
                more.options.target.html(showTxt);
            }, more.options.frequency)
        },
        set: {
            disabled: function(disabled) {
                clearInterval(more.options.interval);
                more.options.disabled = disabled;
                if (!disabled) {
                    more.options.target.html(more.options.animateOff);
                } else {
                    more.options.target.html(more.options.animateOver);
                }
            }
        }
    }
    $.fn.more = function(options) {
        options.object = $(this);
        more.init(options);
    }
})(jQuery);