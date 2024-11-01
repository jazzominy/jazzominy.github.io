---
author: "Jasmine Hirpara"
title: "Gradient progress bar - Part 2"
excerpt: "How to use css variable to create a dynamic gradient progress bar to indicate scroll progress."
tags: [css, progress bar, css gradient]
permalink: /posts/gradient-loader-part-2
---

In the [previous post](/posts/gradient-loader), i created a simple static gradient progress bar. In this post, i will show you how to make it dynamic to indicate scroll progress.

## Element scroll event

Whenever the content of an element overflows, the element gets a scrollbar either horizontally or vertically or both. We can use the `scroll` event to detect when the user scrolls the content of an element. 

```js
const element = document.querySelector('.gradient-progress');
element.addEventListener('scroll', (event) => {
  // code to update the progress bar
});
```

## Tracking the scroll progress

To track the scroll progress, we need to use the following properties of the element: 
- [scrollTop](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)
- [scrollHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)
- [clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight)

Here is how we can calculate the scroll progress:

```js
element.addEventListener('scroll', () => {
	const progress = Math.round((element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100);
});
```
{: .snippet}

Here `element.scrollTop` is the number of pixels that the content of the element is scrolled vertically, `element.scrollHeight` is the total height of the content including the overflowed content and `element.clientHeight` is the height of the element including the padding.

## Updating the scroll progress

Now that we have the scroll progress, how can i link it to the progress bar? There may be different ways to do this. i will show you one way to do it. i will use a css variable to update the progress bar.

```js
element.addEventListener('scroll', () => {
  const progress = Math.round((element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100);
  element.style.setProperty('--g-progress', `${progress}%`);
});
```
{: .snippet}

Here i am setting the `--g-progress` css variable on the element. This variable will be used to update the gradient of the progress bar.

## Styling a pseudo element to show the grdient progress bar

To create a gradient progress bar, i will use a pseudo element `::before` and apply a gradient to it. i will use the `--g-progress` variable to update the gradient.

```css
.gradient-progress {
  position: relative;
  overflow-y: auto;
  max-height: 30vh;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  padding-top: 0;
}

.gradient-progress::before {
  content: '';
  display: block;
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #dc6c6c var(--g-progress, 0%), transparent var(--g-progress, 0%));
}
```
{: .snippet}

```html
<div class="gradient-progress">
  <!-- content goes here -->
</div>
```

Here in css, i have set the height of the pseudo element to `5px` and applied a gradient to it. The gradient color-stops are set using the `--g-progress` variable. The `var(--g-progress, 0%)` means that if the `--g-progress` variable is not set, then the default value will be `0%`. Now whenever we scroll the content, the value of the `--g-progress` variable will be updated using the scroll event listener. This will update the gradient color-stops of the pseudo element and show the progress accordingly.

i have created an inline demo below. Scroll the content to see the progress bar in action.

<style>
.gradient-progress {
  position: relative;
  overflow-y: auto;
  max-height: 30vh;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  padding-top: 0;
}

.gradient-progress::before {
  content: '';
  display: block;
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #dc6c6c var(--g-progress, 0%), transparent var(--g-progress, 0%));
}
</style>

<div class="gradient-progress">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
</div>

<script>
  const element = document.querySelector('.gradient-progress');
  element.addEventListener('scroll', () => {
    const progress = Math.round((element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100);
    element.style.setProperty('--g-progress', `${progress}%`);
  });
</script>

i have used the same concept for the blue progress bar that you see at the top of the page which indicates the scroll progress of the page. Now that you are here, it should indicate 100% 😀. Hope you learned something.