(function($){

    $.fn.splitter = function(options){

        return this.each(function() {
            var self = $(this);
            function empty() {}
            options = $.extend({
                minWidth: 20,
                defaultWidth: 200
            }, options);
            if(!options.onStartDrag) {
                options.onStartDrag = empty;
            }
            if(!options.onDrag) {
                options.onDrag = empty;
            }
            if(!options.onEndDrag) {
                options.onEndDrag = empty;
            }

            var children = self.children();
            var left_panel = children.first();
            var right_panel = left_panel.next();

            var _splitter = $('<div class="__splitter">');
            var _startX, _offsetX;

            ;(function(){
                self.addClass('__splitter_container');
                _splitter.on('mousedown', onStartDrag);
                left_panel.addClass('splitter_panel __splitter_panel_left');
                right_panel.addClass('splitter_panel __splitter_panel_right');
                left_panel.after(_splitter);

                onPosition(options.defaultWidth);
            })();

            function onPosition(x) {
                var minWidth = options.minWidth;
                if(x < minWidth || x+minWidth > self.width()) {
                    return;
                }

                _splitter.css('left', x);
                left_panel.css('width', x);
                right_panel.css('width', self.width() - x - _splitter.width());
            }

            function onStartDrag(event) {
                _startX = event.clientX;
                _offsetX = _splitter.position().left;
                $(document).on('mousemove', onDrag);
                $(document).on('mouseup', onEndDrag);
                options.onStartDrag.call(self, event);
            }

            function onDrag(event) {
                var x = _offsetX + event.clientX - _startX;
                onPosition(x);
                options.onDrag.call(self, event);
            }

            function onEndDrag(event) {
                $(document).off('mousemove', onDrag);
                $(document).off('mouseup', onEndDrag);
                options.onEndDrag.call(self, event);
            }
        });
    }
})(jQuery)
