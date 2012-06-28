/* inject.js
 * author: dansajin@web.de
 * desc: asynchronous resource loader with callback
 * scope: loads js and css files async
 * usage: inject.js('filepath',callback()); or inject.css('filepath',callback());
 * licence: none
 */

(function (window,document) {
  
  // stateless variables 
  var appent_to = document.head || document.getElementsByTagName("head")[0];
  
  // tests 
  function is_func(func) { return Object.prototype.toString.call(func) == "[object Function]"; }
  
  // load ressource by injecting it 
  function load(file,callback){
    // inject script or link element 
    appent_to.appendChild(file);
    // run our callback 
    execute_callback(file,callback);
  }
  
  // run our callback 
  function execute_callback(file,callback){
    // bind listeners only if we need them 
    if (is_func(callback)) { 
      // listen for onload or state changes in IE 
      file.onload = file.onreadystatechange = function () {
        var state = this.readyState;
        if ( !callback.done && (!state || /loaded|complete/.test(state)) ) {
          callback.done = true;
          /*
          // remove listeners because of memory leak in IE 
          file.onload = file.onreadystatechange = null;
          */
          callback();
        }
      }
    }
  }
  
  // public objects 
  function scriptTag(url,callback){
    // create the script element and set properties 
    var script = document.createElement("script");
    script.async = true;
    script.src = url;
    // request script 
    load(script,callback);
  }
  
  function linkTag(url,callback){
    // create the link element and set properties 
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    // request link 
    load(link,callback);
  }
  
  // object api 
  function create_sandbox(){
    return {
      js : scriptTag,
      css : linkTag
    }
  }
  
  // create main api 
  window.inject = create_sandbox()
})(window,document);

