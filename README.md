# Node.js Learning & Fundamentals Refresh  

Learning Node.js and refreshing its fundamentals using the latest LTS version 22.  

## What is Node.js?  
Node.js is a cross-platform runtime environment for running JavaScript applications. It uses the V8 engine, which was originally built for the Chromium browser.  

Since Node.js is a runtime environment that allows JavaScript to run outside a browser, it does not support browser-specific functions like `window.alert()`.  

## How to Create a Custom Module in Node.js?  
A custom module in Node.js is simply a JavaScript function or set of functions that can be reused. It is created using `exports` or `module.exports`.  

- To load a local module, use:  
  ```js
  const myModule = require('./moduleName')`;
- To load a built-in Node.js module, use `require('moduleName')`, such as ` const http = require('http')`.

## How Does the fs Module Work?
The fs (File System) module in Node.js is used for handling files. It is a core module and provides several built-in functions for file operations, such as:

- writeFileSync
- writeFile
- readFileSync
- readFile
- appendFileSync
- appendFile
- copyFile
- unlinkSync
- mkdirSync
- ...and more

## Synchronous vs Asynchronous Methods
 - Methods with "Sync" (e.g., writeFileSync, readFileSync) run synchronously, meaning they block execution until the operation is complete.
 - Methods without "Sync" (e.g., writeFile, readFile) run asynchronously, meaning they don’t block execution and instead use callbacks or Promises.
