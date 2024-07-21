---
author: Jasmine Hirpara
excerpt: In this self-help write-up, we will see some commonly used webpack loaders and plugins
tags: [javascript, webpack, webpack-plugin]
---

## Setting up some common webpack loaders and plugins

In this self-help write-up, we will see some commonly used webpack loaders and plugins. Please note that this write-up builds up on the code from [js-boilerplate](https://github.com/jazzominy/js-boilerplate). If you haven't already checked it out, please do so.

We will look at loaders and plugins a bit later. First let us take a look at modules.

### Modules

Modules are reusable entities that can be used by including in the files that need them. Webpack by default supports ES2015 module syntax. To use the syntax, lets start by defining a module. Following are the contents of `index.js`
	
```javascript
function output() {
    var el = document.createElement("div");
    el.innerHTML = "Hello boilerplate";
    el.classList.add("hello");
    return el;
}

document.body.appendChild(output());
```
{: .snippet}

Now let us create a new file `output.js` in the same folder as `index.js` and move the `output()` function to new file as

```javascript
export default function output() {
    var el = document.createElement("div");
    el.innerHTML = "Hello boilerplate";
    el.classList.add("hello");
    return el;
}
```
{: .snippet}

In `index.js` let us import the `output()` function as 

```javascript
import output from "./output";

document.body.appendChild(output());
```
{: .snippet}
	
Now run the command `npm start` from command line and the `index.html` should load in browser without any error. Now when we run `npm build`, the `bundle.js` that is created will include code from `index.js` and `output.js` files.

Webpack [supports](https://webpack.js.org/api/module-methods/) other module syntaxes as well. You can use the syntax you are comfortable with. Now let us look at the loaders that load css file in `index.html`

### Loaders

These are nothing but the utilities that load a file with specified extension and process it to convert it in to a specific format as required for the build. Let us understand this by loading a css file. Let us create a css file `style.css` in a new `styles` folder. Define a class as 

```css
.bold {
    font-weight: bold;
}
```
{: .snippet}

Now let us import this file in `output.js` as 

```javascript
import "./styles/style.css";
```
{: .snippet}
	
If you run the command `npm start`, the console should throw an error that looks like

![css-error](/assets/img/css-error.png)

The error indicates that we need a loader to load the particular file type. Lets install [css-loader](https://webpack.js.org/loaders/css-loader/) by running the command

```bash
npm i css-loader --save-dev
```
{: .snippet}
	
After the installation is complete, we need to modify the `webpack.config.js` as 

```javascript
....
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                "css-loader"
            ]
        }
    ]
}
```
{: .snippet}

The `module` property specifies the `rules` that webpack needs to run when dealing with different file types (in this case css). Now when you rerun the `npm start` command, the error goes away. Lets use the `.bold` class in the `output.js` file as 

```javascript
import "./styles/style.css";

export default function render() {
    var el = document.createElement("div");
    el.innerHTML = "Hello boilerplate";
    el.classList.add("bold");
    return el;
}
```
{: .snippet}
	
Note that though that there is no error in command line console, the browser does not reflect the newly added style class. This happens because the `css-loader` that we added recently just loads the imported css file interprets any `@import` and `url()` in it and resolves them. To actually load the style in `index.html` file, we need one more loader called [style-loader](https://webpack.js.org/loaders/style-loader/). Let us install that by running the command

```bash
npm i style-loader --save-dev
```
{: .snippet}
	
On successful installation, modify the `webpack.config.js` as 

```javascript
....
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                "css-loader",
                "style-loader"
            ]
        }
    ]
}
```
{: .snippet}
	
This configuration now injects the style tag in `index.html` when you run the command `npm start`. You can verify that by viewing the source of `index.html` from browser. So `css-loader` and `style-loader` are used together to load and inject styles in html files respectively. This is great because you do not have to worry about adding styles to `index.html` as loaders take care of it. But as your project grows, you will have more style classes and no one wants their html files bloated with them. Next up we will look at how to extract the style tag in to a separate css file by using a webpack plugin.

### Plugins

Webpack has rich ecosystem of plugins. A plugin is a utility that helps in executing a custom functionality when the source is bundled. For example if you want to uglify the code, you can specify a plugin for that. For our usecase, what we want is to extract the css styles from `index.html` in to a separate file. So there is a plugin called [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) which does that. Install it by running the command

```bash
npm i extract-text-webpack-plugin --save-dev
```
{: .snippet}
	
Once it is installed, modify the `webpack.config.js` as

```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');

.....
module: {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }
    ]
},

plugins: [
    new ExtractTextPlugin({
        filename: "all.css"
    });
]
....
```
{: .snippet}
	
Add the `plugins` property to the webpack config object. The `ExtractTextPlugin` takes a config object when creating its new instance. You can specify the file name for the css file that it creates. Also modify `rules` array to use `ExtractTextPlugin` and specify the loader, in config object, to use to load css file. Now when you run the command

`npm run build`

the output `dist` folder should have two files - `bundle.js` and `all.css`. Let us quickly add one more plugin [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) which generates `index.html` in `dist` folder from the template that you specify. Let us see how that is done. Install the plugin by running

```bash
npm i html-webpack-plugin --save-dev
```
{: .snippet}

Now modify the `webpack.config.js` to use the plugin as

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

....
plugins: [
    new ExtractTextPlugin({
        filename: "abc.css"
    }),
    new HtmlWebpackPlugin({
        template: "index.html"
    })
]
```
{: .snippet}

Here we have specified `index.html` as our template. So the plugin will take the contents of the template and use them to generate another `index.html` file in output folder.
Now try running the command `npm run build`. After the command has executed successfully, check the `dist` folder. It will have three files - `bundle.js`, `all.css` and `index.html`. If you open `index.html` file you'll notice that `bundle.js` has been included twice. This is because in template `index.html` we already had a `script` tag for `bundle.js` and one more tag is injected by the `HtmlWebpackPlugin`. Also a `link` tag is added to load the newly created `all.css` file. How 😎 is that. So let us modify the template `index.html` in root folder as

```html
<!doctype html>
<html>
    <head>
        <title>JS Boilerplate</title>
    </head>
    <body>
    </body>
</html>
```
{: .snippet}

to avoid loading `bundle.js` twice.

I'll leave you with an exercise. Try using [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin).

Hope this write-up helps someone 👍