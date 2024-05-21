---
author: Jasmine Hirpara
excerpt: This is a very simple boilerplate setup for a frontend javascript project using webpack and eslint
tags: [javascript, webpack, eslint, bolierplate]
---

## Setting up JS Boilerplate with `webpack` and `eslint`

This is a very simple boilerplate setup for a frontend javascript project using [webpack](https://webpack.js.org) and [eslint](https://eslint.org/)

Frontend web application development has become much more sophisticated given the availability of tools that aid it. Here we will set a boilerplate project with a well known module bundler called `webpack`

### Pre-requisites

In order to setup this project, we would require [NodeJS](https://nodejs.org/en/download/). NodeJS comes with pre-installed package manager `npm`. We will use this manager to install JS modules. So,

* Install [NodeJS](https://nodejs.org/en/download/)
* Create a folder with a name of your choice and open it in command line console. 
* Run `npm init` command to create a `package.json` file that stores the project details and the packages used in the project

### Installing webpack

To install webpack run `npm i webpack --save-dev`. This will install the latest version of `webpack` as a dev dependency and save an entry to the `package.json` file. If you check `package.json`, there will be an an entry made for `webpack` with its installed version. It would look something like

```json
{
    "name": "js-boilerplate",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Jasmine Hirpara",
    "license": "ISC",
    "devDependencies": {
        "webpack": "^3.5.6"
    }
}
```

### Creating project files

Now lets create the `index.html` file in the root directory and `index.js` under `src` folder. So the folder structure would now look like 

![Folder structure](/assets/img/structure.png)

Lets add a function in `index.js` that renders a `div` to the html body.

`src/index.js`

```javascript
function output() {
    var el = document.createElement("div");
    el.innerHTML = "Hello boilerplate";
    return el;
}

document.body.appendChild(output());
```

### Webpack configuration file

Webpack requires a config file, in root directory, that specifies the build configuration to bundle the code in `index.js`. Lets create that file

`webpack.config.js`

```javascript
const path = require("path");

module.exports = {
    entry: [
        path.resolve(__dirname, "src/index.js")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
}
```

The config file exports a config object with the following configuration

`entry` - it specifies the input file that needs to be bundled. In our case it is `index.js`
`output.path` - the output directory where the bundled file will be created
`output.filename` - the name of the bundled file

This is the minimum configurtion that you can specify to create a bundle.

### Creating a bundle

With the `webpack.config.js` in place, run the command

    webpack --config webpack.config.js
    
from root directory and observe the output. The console should show some logs like

![Logs](/assets/img/console-logs.png)

When the `webpack` commands runs successfully, the `dist` folder will be created in root directory with `bundle.js` file. Include this file in `index.html` as 

```html
<!doctype html>
<html>
    <head>
        <title>JS Boilerplate</title>
    </head>
    <body>
        <script src="dist/bundle.js"></script>
    </body>
</html>
```

Now open the `index.html` in a browser and it should display Hello boilerplate. Hooray! we just setup `webpack` to bundle our code in `index.js`

We can use npm scripts to run the `webpack` command. So lets modify the `package.json` to add a `build` script as

```json
{
    ....
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
    },
    ....
}
```

Try running `npm run build` command. It should give the same result as `webpack` command run earlier

### Configure Webpack dev server

It is not a good practice to serve html files directly through file system. To avoid this, there is a package available that serves the html files for you. It is [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server). Let us install it as dev dependency by running the following command from command line

    npm install webpack-dev-server --save-dev

Once the install is successful, modify the `webpack.config.js` by adding `devServer` property as 

```javascript
const path = require("path");

module.exports = {
    entry: [
        path.resolve(__dirname, "src/index.js")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: '.'
    }
}
```
    
`devServer.contentBase` - the path from where the content will be served. In our case, it (index.html) will be served from current directory. So the value is '.'. One thing to note here is that when using `webpack-dev-server`, the `bundle.js` will be served from memory. So the file wont be created physically. The path that you specify in `output.publicPath` should match the path specified in `index.html` to load `bundle.js`. So we need to modify `index.html` as 

```html
<!doctype html>
<html>
    <head>
        <title>JS Boilerplate</title>
    </head>
    <body>
        <script src="bundle.js"></script>
    </body>
</html>
```

Now add a `start` script to `package.json` as 

```json
{
    ....
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --open"
    },
    ....
}
```
    
The `--open` option opens the browser with `index.html` when the `start` script runs successfully. Now running

    npm start
    
command should open the `index.html` file in browser. To watch files served by `devServer.contentBase`, we can set `devServer.watchContentBase` to true. This triggers browser page reload whenever there are any changes made to the files when saved

### Configure eslint

As described [here](https://eslint.org/docs/about/), ESlint is an open source JavaScript linting utility to detect errors in the code that does not adhere to certain style guidelines before the code is executed. To install it, run the following command from command line

    npm i eslint --save-dev
    
Once the package is installed, we need to create a config file for it which specifies what style guide is to be enforced to the code. Do that by running the command `eslint --init` in the root directory. You need to answer some questions regarding your programming style as shown below

![config](/assets/img/eslint-config.png)

Once the config is setup, `.eslintrc.json` file is created with your answers as configuration. Now let us create an npm script to enable linting for our source files by modifying `package.json` as

```json
{
    ....
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint src",
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --open"
    },
    ....
}
```

Now that `eslint` is configured, go ahead and try it out by executing `npm run lint`. If there are any errors or warnings, they will be displayed on console. If not, then command will be executed successfully with no messages on console. Now we would want to run this command every time when the source file changes and this can be tedious. To avoid this we will install [eslint-watch](https://www.npmjs.com/package/eslint-watch) package which does it for us. Execute the following command

    npm i eslint-watch --save-dev
    
and modify `package.json` as

```json
{
    ....
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint:watch": "esw src --watch",
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --open"
    },
    ....
}
```
    
Try running `npm run lint:watch` and make some changes to `index.js`. The file is linted as soon as it is saved. So no need to run the command each time the source files change.

On final step is remaining though. What we want is to run `start` and `lint:watch` in parallel so that as soon as the source files change, we lint them and reload the `index.html` in browser. For this, there are a lot of packages available that run npm scripts in paralles. What I will use is [npm-run-all](https://www.npmjs.com/package/npm-run-all). So install it by using the command

    npm i npm-run-all --save-dev
    
Now modify the `package.json` as 

```json
{
    ....
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint:watch": "esw src --watch",
    "build": "webpack --config webpack.config.js",
    "serve": "webpack-dev-server --open",
    "start": "run-p lint:watch serve"
    },
    ....
}
```
    
I renamed the earlier written `start` script to `serve` and created a new `start` script with `run-p lint:watch serve`. The `run-p` command runs the scripts `lint:watch` and `serve` in parallel.

This sets the basic boilerplate setup for a frontend JS project. So get set and 🚀