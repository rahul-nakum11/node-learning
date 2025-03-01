# Node.js Learning & Fundamentals Refresh  

Learning Node.js and refreshing its fundamentals using the latest LTS version 22.  

## What is Node.js?  
Node.js is a cross-platform runtime environment for running JavaScript applications. It uses the V8 engine, which was originally built for the Chromium browser.  

Since Node.js is a runtime environment that allows JavaScript to run outside a browser, it does not support browser-specific functions like `window.alert()`.  

## How to Create a Custom Module in Node.js?  
A custom module in Node.js is simply a JavaScript function or set of functions that can be reused. It is created using `exports` or `module.exports`.  

- To load a local module, use:  
  ```js
  const myModule = require('./moduleName');
