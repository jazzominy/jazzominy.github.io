---
author: "Jasmine Hirpara"
title: "Gradients as a CSS mask"
excerpt: "How to use gradients as a mask in CSS to create a reveal effect."
tags: [css, css gradient, css mask]
permalink: /posts/gradients-as-a-css-mask
---

<style>
    img {
        display: block;
        margin: 0 auto;
        border-radius: 1rem;
    }
</style>
[CSS masking](https://www.w3.org/TR/css-masking-1/) has been around for a while now. You can use it via the `mask` property in CSS. You can define an SVG element or an image as a mask. Since we can use an image as a mask, i thought why not try a gradient as a mask and see where i land. In one of my [previous posts](/posts/gradient-loader), i have briefed about how to create a gradient using CSS.

## How masking works 🤔

To be frank, masking is a game of black and white. In layman terms, mask is a layer that is applied on top of the element. The part of the element that falls under the white (or brighter) pixels of the mask layer, is revealed or visible. We can use an image or css gradient as a mask. In case of the image mask, the luminance of the pixel decides how much the element is revealed. Lets see how we can use a gradient as a mask.

i have used a sample image that i will mask using a gradient.

## Using a gradient as a mask

Lets start with a simple gradient with 2 colors. For simplicity, i will use black and white colors.

```css
.gradient-mask {
    mask-image: linear-gradient(to right, black, white);
}
```
<style>
    .gradient-mask {
        mask-image: linear-gradient(to right, black, white);
    }
</style>
<img class="gradient-mask" src="https://i.imgur.com/41RPpSc.jpeg" alt="sample image" width="300">

Woops!! What  happened here? Nothing!! Thats because we need to specify the mask mode. Since we are using black and white colors, we need to use `luminance` mode.

```css
.gradient-mask {
    mask-image: linear-gradient(to right, black, white);
    mask-mode: luminance;
}
```
<style>
    .gradient-mask-mode {
        mask-image: linear-gradient(to right, black, white);
        mask-mode: luminance;
    }
</style>
<img class="gradient-mask-mode" src="https://i.imgur.com/41RPpSc.jpeg" alt="sample image" width="300">

As you can see, the image is visible gradually from left to right. In other words, when the gradient is transitioning to white (towards right), the image is revealed. Lets see what happens when i use one more color in the gradient.

```css
.gradient-mask {
    mask-image: linear-gradient(to right, black, white, black);
    mask-mode: luminance;
}
```
<style>
    .mask {
        width: 18.75rem;
        height: 23.5rem;
        float: left;
        margin: 0.625rem;
        margin-right: 1.25rem;
        text-align: center;
        color: black;
        padding: 4.125rem;
        background-image: linear-gradient(to right, black, white, black);
    }

    .gradient-mask-mode-2 {
        mask-image: linear-gradient(to right, black, white, black);
        mask-mode: luminance;
    }
</style>

<div class="mask">
    This is the mask. On the right, you can see the effect of the gradient.
</div>
<img class="gradient-mask-mode-2" src="https://i.imgur.com/41RPpSc.jpeg" alt="sample image" width="300">

One thing to note here is that the gray area in the gradient reveals the image partially. So we can use a gradient as a mask. Now time for some fun.

## The reveal transition (but a manual one)

Well the transition that i am going to create is a reveal transition but a manual one using a range slider and a css variable to hold the reveal percentage based on the range slider value. This variable we will use to set the gradient position. Lets see how we can do that. Here is the mask that will be used

```css
.gradient-mask {
    mask-image: linear-gradient(to right, white 25%, transparent 25%),
            linear-gradient(to left, white 25%, transparent 25%);
    mask-mode: luminance;
}
```
The mask looks like this:
<style>
    .mask-effect {
        width: 18.75rem;
        height: 6.25rem;
        background-image: linear-gradient(to right, white 25%, transparent 25%),
            linear-gradient(to left, white 25%, transparent 25%);
    }
</style>

<div class="mask-effect"></div>

Here i have used the `transparent` color instead of `black` to achieve the desired effect. If we use `black`, then the white color from the other gradient is overlapped by the black color and we wont see the image.

Now lets create the range slider and the css variable that will hold the reveal percentage.

```css
:root {
    --unveil: 0%;
}
```
{: .snippet}
```html
<div class="slider">
    <input type="range" min="0" max="50" value="0" step="1" oninput="
        document.documentElement.style.setProperty('--unveil', this.value + '%');
    ">
</div>
```
{: .snippet}

Now lets bind the css variable to the gradient.

```css
.gradient-mask {
    mask-image: 
        linear-gradient(to right, white var(--unveil), transparent var(--unveil)),
        linear-gradient(to left, white var(--unveil), transparent var(--unveil));
    mask-mode: luminance;
}
```
{: .snippet}

And action!! Go on and slide away 😀

<style>
    :root {
        --unveil: 0%;
    }

    .gradient-mask-final {
        mask-image: 
            linear-gradient(to right, white var(--unveil), transparent var(--unveil)),
            linear-gradient(to left, white var(--unveil), transparent var(--unveil));
        mask-mode: luminance;
    }

    input[type=range] {
        display: block;
        height: 0.625rem;
        margin: 0 auto;
    }
</style>

<input type="range" min="0" max="51" value="0" step="1" oninput="
        document.documentElement.style.setProperty('--unveil', this.value + '%');
">

<img class="gradient-mask-final" src="https://i.imgur.com/41RPpSc.jpeg" alt="sample image" width="300">

You can try different combinations for yourself and see if you are surprised by the results.