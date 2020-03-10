const OPTIMIZED_RESIZE_EVENT = 'optimizedResize';
// https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function(evt) {
    const throttle = function(type, name, obj) {
        obj = obj || window;
        let running = false;
        const func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle('resize', evt);

})(OPTIMIZED_RESIZE_EVENT);

export { OPTIMIZED_RESIZE_EVENT };