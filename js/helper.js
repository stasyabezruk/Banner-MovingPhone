'use strict'
var helper = {   
    addEvent: function (evnt, elem, func) {
       if (elem.addEventListener)
          elem.addEventListener(evnt,func,false);
       else if (elem.attachEvent) {
          elem.attachEvent("on"+evnt, func);
       }
       else {
          elem[evnt] = func;
       }
    }    
}