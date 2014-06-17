define(['d3','lodash'], function(d3,_){
    return {
        'text/pop/json': function(script){
            return JSON.parse(script);
        }
    };
});
