define(['d3','mathjs','lodash','pop/base'], function(d3,math,_){
    /**
     * Uses the "camera" metaphor to create a perspective projection.
     * @class PerspectiveCamera
     * @constructor
     * @param opt {obj} Options hash.
     * @param [opt.fov=45] {number} Vertical field-of-view in radians.
     * @param [opt.aspect = 1] {number} Ratio of `(horizontal FOV)/(vertical FOV)`. 
     *          Takes precedence over `opt.svg` if both are present.
     * @param [opt.svg] {D3 svg element} SVG element for automatic aspect calculation.
     * @param [opt.origin = [0,0,10]] {Vector} Location of camera origin.
     * @param [opt.lookAt = [0,0,0]] {Vector} Location that the camera is "looking at".
     * @param [opt.up = [0,1,0]] {Vector} "Up" direction
     */
    var PerspectiveCamera = d3.pop.projection.PerspectiveCamera = function(opt){
        this._fov = opt.fov ? opt.fov || 45;
        this._aspect = (function(){
            if(opt.aspect){
                return opt.aspect;
            }else if(opt.svg){
                var width, height;
                if(_.isFunction(opt.svg.attr) && (width = opt.svg.attr('width')) && (height = opt.svg.attr('height'))){
                    return width / height;
                }
            }
            return 1;
        })();
        this._origin = opt.origin || [0,0,10];
        this._lookAt = opt.lookAt || [0,0,0];
    };

    _.assign(PerspectiveCamera.prototype, {
        transform: function(v){
        }
    });

    return PerspectiveCamera;
});
