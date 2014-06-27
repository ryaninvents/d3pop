define(['d3','lodash','yaml'], function(d3,_,yaml){
    console.log(arguments);
    return {
        'text/pop/json': function(script){
            return JSON.parse(script);
        }
    };
});
