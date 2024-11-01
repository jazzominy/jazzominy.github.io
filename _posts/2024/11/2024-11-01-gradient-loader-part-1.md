---
author: "Jasmine Hirpara"
title: "Gradient progress bar - Part 1"
excerpt: "How to create a progress bar with single color gradient using CSS and use it to indicate scroll progress."
tags: [css, progress bar, css gradient]
permalink: /posts/gradient-loader
---

We all think of 2 or more colors when we hear the word gradient. Well...at least I do. That made me wonder what happens when we use a single color for a css gradient. So, to scratch that itch, i decided to check it out.

## CSS gradient

Lets start with a simple gradient. As per the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient), a gradient is a smooth transition between two or more colors. The gradient can be linear or radial.

i will create a simple linear gradient with 2 colors.

```css
.gradient {
  background: linear-gradient(to right, #dc6c6c, #4d4d9c);
}
```

which looks like this:
<style>
.gradient {
  background: linear-gradient(to right, #dc6c6c, #4d4d9c);
  height: 4rem;
}
</style>
<div class="gradient"></div>

i wont discuss about how to create a gradient here as there are many resources available online. Now there is a way to specify which color will occupy how much space in the gradient. This can be done using the `color-stop` value. It can be a percentage or a length value.

```css
.gradient-space {
  background: linear-gradient(to right, #dc6c6c 30%, #4d4d9c 70%);
}
```

which looks like this:
<style>
.gradient-space {
  background: linear-gradient(to right, #dc6c6c 30%, #4d4d9c 70%);
  height: 4rem;
}
</style>
<div class="gradient-space"></div>

As you can see, the first color remains solid for the first 30% of the container's width and then from 30% to 70% the first color transitions to the second color. Then the second color remains solid for the rest of the container's width. What happens if the color-stop value is same? Lets find out.

```css
.gradient-same {
  background: linear-gradient(to right, #dc6c6c 50%, #4d4d9c 50%);
}
```

which looks like this:
<style>
.gradient-same {
  background: linear-gradient(to right, #dc6c6c 50%, #4d4d9c 50%);
  height: 4rem;
}
</style>
<div class="gradient-same"></div>

As you can see, with the same value of color-stop for both colors, we didnt offer any space for the first color to transition to the second color. So there is a hard stop at 50% of the container's width and the transition switches to the second color with no color blending or interpolation. i have covered the same behavior in my [svg gradient animation](posts/svg-gradient-animation) post but for svg gradients.

## Single color gradient or is it?

Now let me try and see what happens when we use a single color for a gradient.

```css
.gradient-single {
  background: linear-gradient(to right, #dc6c6c);
}
```

which looks like this:
<style>
.gradient-single {
  background: linear-gradient(to right, #dc6c6c);
  height: 4rem;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 3.5rem;
}
</style>
<div class="gradient-single">
    oops! no gradient here
</div>

Well...the css complains and it does not render the gradient. So how do we create a gradient with a single color? Lets see what happens when we use the same color for both the colors in the gradient.

```css
.gradient-single-color {
  background: linear-gradient(to right, #dc6c6c, #dc6c6c);
}
```

which looks like this:
<style>
.gradient-single-color {
  background: linear-gradient(to right, #dc6c6c, #dc6c6c);
  height: 4rem;
}
</style>
<div class="gradient-single-color"></div>

Phew!! we have something. Not much but a solid color background. Let me add a twist to this. What if the second color is transparent?

```css
.gradient-single-transparent {
  background: linear-gradient(to right, #dc6c6c, transparent);
}
```

which looks like this:
<style>
.gradient-single-transparent {
  background: linear-gradient(to right, #dc6c6c, transparent);
  height: 4rem;
}
</style>
<div class="gradient-single-transparent"></div>

Well...we have a gradient now. The color gradually transitions to transparency. If we do not specify the color-stop value, it is assumed to be 0% for the first color and 100% for the second color. Now lets see what happens when we specify the color-stop value for the second color which is transparent.

```css
.gradient-single-transparent-space {
  background: linear-gradient(to right, #dc6c6c, transparent 50%);
}
```

which looks like this:
<style>
.gradient-single-transparent-space {
  background: linear-gradient(to right, #dc6c6c, transparent 50%);
  height: 4rem;
}
</style>
<div class="gradient-single-transparent-space"></div>

The color transitions to transparency at 50% of the container's width. If you understood this, then you would have guessed what happens when we specify the same color-stop value for both colors.

```css 
.gradient-single-transparent-same {
  background: linear-gradient(to right, #dc6c6c 50%, transparent 50%);
}
```

which looks like this:
<style>
.gradient-single-transparent-same {
  background: linear-gradient(to right, #dc6c6c 50%, transparent 50%);
  height: 4rem;
}
</style>
<div class="gradient-single-transparent-same"></div>

Oh my!! we have a progress bar here with 50% of the container's width filled with the color and the rest with transparency 😎

So far so good. We now have a static gradient progress bar. Making it dynamic is discussed in the [next part](/posts/gradient-loader-part-2) of this post.