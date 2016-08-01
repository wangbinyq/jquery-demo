# 使用 jQuery UI 创建状态插件

> 翻译 [Writing Stateful Plugins with the jQuery UI Widget Factory](https://learn.jquery.com/plugins/stateful-plugins-with-widget-factory/)

大多数的 jQuery 插件都是无状态的, 即我们在 `DOM` 元素上调用插件方法来增强交互. 但是很多功能不能通过这种简单的模式得到.

jQuery UI 提供了一种更高级的插件系统以实现更强大的功能. 新的插件系统能管理状态, 允许单个插件提供多功能, 同时提供了多种扩展方式. 这个系统被称为插件工厂, 在 jQuery UI 1.8 版本以 `$.widget` 接口提供, 另外, 它还能独立于 jQuery UI 存在.

我们通过一个简单的进度条插件来展示插件工厂的能力.
