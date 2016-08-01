# jQuery 插件高级概念

## 提供插件默认设置接口

jQuery 插件应该暴露修改默认设置的接口. 使用户能用最少代码覆盖, 自定义插件.

```
// Plugin definition.
$.fn.hilight = function( options ) {

    // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var opts = $.extend( {}, $.fn.hilight.defaults, options );

    // Our plugin implementation code goes here.

};

// Plugin defaults – added as a property on our plugin function.
$.fn.hilight.defaults = {
    foreground: "red",
    background: "yellow"
};
```

用户能够修改默认背景:

```
// This needs only be called once and does not
// have to be called from within a "ready" block
$.fn.hilight.defaults.foreground = "blue";
```

现在 `hilight` 插件的默认背景色就被修改成蓝色了.

## 提供修改插件实现的接口

## 使私有接口非公开

## 更好的模型

## 不要创建插件相关的语法
