(function ($){
    var el = $('<div class="_snackbar">');
    var timeOut;

    var snackbar = $.snackbar = function(options) {
        var options = $.extend({
            autoHideDuration: 4000,
            message: '',
            onActionTouchTap: function(){},
            onReuqestClose: function(){},
        }, options);

        if(!$.contains(document, el)) {
            $(document.body).append(el);
        }

        el.html(options.message)
        setTimeout(function() {
            el.addClass('snackbarshow');
        }, 0);
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            el.removeClass('snackbarshow')
        }, options.autoHideDuration);
    };
})(jQuery);
