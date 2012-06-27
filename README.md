inject.js
=========

asynchronous resource loader with callback


What is inject.js?
------------------
inject.js is a very tiny asynchronus resource loader with callback functions.
i use it for my mobile first projects to progressivly enhance the page by adding single javascript and css files in a non blocking manner.
my javascript files do not depent on code from other files.


What is inject.js not?
---------------------------
inject.js is not a AMD/CommonJS module loader like curl, require.js, etc.
inject.js is not a conditional ressource loader like yepnope.


Installation
------------
Download the files from github and add them to your page. 
I prefer adding javascript files just before the closing </body> tag.

    <head>
        
        
        
    </head>
    <body>
        
        ...
        
        <script src="/js/inject.min.js"></script>
    </body>


Usage
-----

    // load and execute single script
    inject.js('/path/to/file.js')
    
    // load single css file
    inject.css('/path/to/file.css')
    
    // load a script and execute a function after it has been loaded
    inject.js('/path/to/file.js', function() {
        
    });
    
    // load a css file and execute a function after it has been loaded
    inject.css('/path/to/file.css',function(){
        
    });

### Nesting
You can use inject.js() or inject.css() inside the callback to load additional ressource which depend on previous injected files.

    inject.js('/path/to/jquery-1.7.1.min.js',function(){
        inject.js('/path/to/jquery.plugin.one.js', function(){
            $('body').one();
        })
        inject.js('/path/to/jquery.plugin.two.js', function(){
            $('body').two();
        })
    });

BUT: I don't recommend doing it because the dependend files are requested only after the first file has loaded.
I plan to enable parallel loading but in order execution of files in a later version.


What's coming next?
-------------------

I plan to extend the script for:
- parallel downloads 
- in order execution

