define(['d3','lodash','parsers/index'], function(d3,_, parsers){
    /**
     * @function d3.pop
     * @static
     * @param el
     * @param opt
     */
    d3.pop = function(el, opt){
        if(_.isString(el)){
            // allow the user to pass a selector
            el = d3.selectAll(el);
        }else if(!el){
            // if nothing, just pop all the d3pop scripts
            el = d3.selectAll('script[data-pop]');
        }
        // attach the SVG elements to the same places
        // in the DOM
        el.each(function(x,i){
            var sc = d3.select(this);
            // The script element contains all the info for our stage.
            var script = sc.text();
            // The script type tells us how to interpret it.
            var scriptType = sc.attr('type');
            // Replace the <script> tag with an SVG tag in the same place.
            sc.node().outerHTML = '<svg data-pop id="data-pop-'+i+'"></svg>';
            // Select the SVG element we just created.
            var svg = d3.select('#data-pop-'+i+'[data-pop]');
            // TODO: set width and height

            // Now pop!
            // TODO: parse script
            pop(svg);
        });
    };

    /**
     * @function pop
     * @private
     * @static
     */
    function pop(svg, stage){
    };

    return d3.pop;
});
