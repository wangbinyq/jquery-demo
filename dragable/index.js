(function($){
    $.fn.dragable = function() {
        var _zIndex = 0;

        return this.each(function() {
            var el = $(this);
            var pos = el.position();
            el.css('position', 'absolute');

            el.on('mousedown', onStartDrag);

            var _offsetX = 0,
                _offsetY = 0,
                _startX = 0,
                _startY = 0;

            _zIndex = Math.max(_zIndex, el.css('z-index')) || 0;

            function onStartDrag(e) {
                _startX = e.clientX;
                _startY = e.clientY;
                _offsetX = el.position().left;
                _offsetY = el.position().top;
                _zIndex++;
                el.css('z-index', _zIndex);
                $(document).on('mousemove', onDrag);
                $(document).on('mouseup', onEndDrag);
            }

            function onDrag(e) {
                e.preventDefault();
                var x = _offsetX + event.clientX - _startX;
                var y = _offsetY + event.clientY - _startY;

                el.css('left', x);
                el.css('top', y);
            }

            function onEndDrag(e) {
                $(document).off('mousemove', onDrag);
                $(document).off('mouseup', onEndDrag);
            }
        });
    };
})(jQuery);
