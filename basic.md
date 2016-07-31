# Q

> 翻译 [How to Create a Basic Plugin](https://learn.jquery.com/plugins/basic-plugin-creation/)

如果你需要在 jQuery 选择器上执行一系列重复操作, 这时候你需要编写 jQuery 插件.

## jQuery 对象方法

在开始编写插件前, 首先需要了解 jQuery 原理. 请看下面的代码:

```
$( "a" ).css( "color", "red" );
```
这是一段非常简单的 jQuery 代码, 但是你知道这背后发生了什么? 当你使用 `$` 函数选择元素时, 它返回 jQuery 对象. 你可以在这个对象上调用各种方法 (比如 `.css(), .click()` 等). 这些 jQuery 方法通过 `$.fn` 原型继承. 我们可以通过在 `$.fn` 上添加属性, 就可以调用自己的方法.

## 一个简单的插件

本小节我们通过创建一个使所有元素变绿的插件来了解如何创建 jQuery 插件. 通过在 `$.fn` 上添加 `greenify` 方法来实现:

```
$.fn.greenify = function() {
    this.css('color', 'green');
};
$('a').greenify();
```

可以在 `greenify` 看到我们通过 `this` 来调用 `.css`, 而不是 `$(this)`, 这是因为我们的 `greenify` 函数已经是和 `.css()` 一样, 都是 jQuery 对象的方法.

## 链式调用
我们可以在插件函数中返回 `this` 来实现链式调用:

```
$.fn.greenify = function() {
    this.css('color', 'green');
    return this;
};
$('a').greenify().addClass('greenified');
```

## `$` 变量和作用域

通常我们使用 jQuery 的别名 `$` 变量来使用 jQuery, 如果你使用 jQuery 以外的库中也使用了 `$` 变量, 你需要调用 `jQuery.noConflict()` 使 jQuery 不使用 `$`. 但是在我们的插件代码中不能生效, 因为我们直接使用 `$` 变量作为 jQuery 的别名. 为了更通用化, 并且依旧使用 `$` 别名, 将我们的代码包裹在立即函数调用中, 并且传递 jQuery:

```
(function($){
    $.fn.greenify = function() {
        this.css('color', 'green');
        return this;
    };
})(jQuery);
```

## 减少插件数目

在实现 jQuery 插件时, 应该减少挂载在 `$.fn` 上的插件. 这能减少插件相互覆盖的情况. 下面是一个不推荐的用法:

```
(function($){
    $.fn.openPopup = function() {
        // Open popup code.
    };

    $.fn.closePopup = function() {
        // Close popup code.
    };
})(jQuery);
```

推荐的做法是: 使用一个插件, 通过参数来执行不同操作:

```
(function( $ ) {

    $.fn.popup = function( action ) {

        if ( action === "open") {
            // Open popup code.
        }

        if ( action === "close" ) {
            // Close popup code.
        }

    };

}( jQuery ));
```

## `each` 方法

通常使用 jQuery 选择器都返回 `DOM` 元素的集合, 如果插件是在特定元素上执行,  比如获取数据, 元素位置等操作, 就需要使用 `each` 方法, 这能保证我们的代码对每个元素都起作用:

```
$.fn.rectify = function() {

    return this.each(function() {
        var width = $(this).css('width');
        this.css('height', width)
    });

};
```

上述的代码使 `DOM` 对象高和宽相同, 如果不使用 `each`, 那么就只对第一个对象起作用.
因为 `each` 本身就是链式调用, 所以我们直接返回 `each` 的结果.

## 插件添加选项参数

当插件越来越复杂的时候, 可以为插件添加选项参数:

```
(function ( $ ) {

    $.fn.colorfy = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
        }, options );

        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });

    };

}( jQuery ));

$( "div" ).colorfy({
    color: "orange"
});

```

## 例子
一些 jQuery 插件的例子
