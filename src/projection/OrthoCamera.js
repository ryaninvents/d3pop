define(['d3','mathjs','lodash'], function(d3,math,_){
    /**
     * Uses the "camera" metaphor to create an orthographic projection.
     * @class OrthoCamera
     * @constructor
     * @param opt {obj} Options hash.
     * @param [opt.fov=10] {number} Vertical field-of-view in world units.
     * @param [opt.aspect = 1] {number} Ratio of `(horizontal FOV)/(vertical FOV)`. 
     *          Takes precedence over `opt.svg` if both are present.
     * @param [opt.svg] {D3 svg element} SVG element for automatic aspect calculation.
     * @param [opt.origin = [0,0,10]] {Vector} Location of camera origin.
     * @param [opt.lookAt = [0,0,0]] {Vector} Location that the camera is "looking at".
     * @param [opt.up = [0,1,0]] {Vector} "Up" direction
     */
    var OrthoCamera = d3.pop.projection.OrthoCamera = function(opt){
        this._fov = opt.fov !== undefined? opt.fov || 10;
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
        this._up = opt.up || [0,1,0];
    };

    _.assign(OrthoCamera.prototype, {
        get FOV: function(){return this._fov},
        get aspect: function(){return this._aspect},
        get origin: function(){return this._origin},
        get lookAt: function(){return this._lookAt},
        get normal: function(){
            var n = math.minus(this.lookAt, this.origin);
            return math.divide(n, math.norm(n));
        },
        get forward: function(){
            return this.normal;
        },
        get up: function(){
            return this._up;
        },
        get right: function(){
            return math.cross(this.normal, this.up);
        },
        transform: function(P){
            var O = this.origin;
            var n_hat = this.normal;
            var V = math.minus(P, O);
            var d = math.dot(V, n_hat);
            var P_ = math.minus(P, math.multiply(d, n_hat));
            var D = math.minus(P_, O);
            return [math.dot(D,this.right), math.dot(D,this.up), d];
        }
    });

    return OrthoCamera;
});
