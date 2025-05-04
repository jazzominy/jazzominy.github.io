---
author: "Jasmine Hirpara"
title: "Clip path animation"
excerpt: "clip-path - yet another masking property"
tags: [css, clip-path, css mask]
permalink: /posts/clip-path-animation
---

i am really intrigued by any way that includes masking and clipping. Since my days with Flash (now an obsolete technology), i have been fascinated by the concept of masking. i was on <a href="https://developer.mozilla.org" target="_blank">MDN</a> and i found <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path" target="_blank">clip-path</a> property. As per the definition, it defines a region which acts as a mask for the element. The area which falls within the region is visible and the rest is hidden.

Lets look at a simple example.

```css
.box {
    width: max-content;
    margin: auto;
}

.emoji {
    border: 2px solid #569092;
    display: inline-block;
    font-size: 2rem;
}
```
{: .snippet}

<style>
    .box {
        width: max-content;
        margin: 2rem auto;
    }

    .emoji {
        border: 2px solid #569092;
        display: inline-block;
        font-size: 2rem;
    }

    .clipped {
        clip-path: circle(18px at 53px 27px);
    }
</style>

<div class="box">
    <div class="emoji">😀😂😃😄😁😆😅</div>
</div>

Here i have created a div with a bunch of emojis. Now lets say you want display only the second emoji, we can use the `clip-path` property to achieve this.

```css
.clipped {
    clip-path: circle(18px at 53px 27px);
}
```
{: .snippet}

<style>
    .clipped {
        clip-path: circle(18px at 53px 27px);
    }
</style>

<div class="box">
    <div class="emoji clipped">😀😂😃😄😁😆😅</div>
</div>

As you can see, by using the `clip-path` property, only the second emoji is displayed. This property accepts any <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape" target="_blank">basic shape</a> function as a value. We can also specify the shape using the `path()` and `shape()` functions. The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape" target="_blank">shape()</a> function has limited support in browsers though.

In the above example, i have used the `circle()` function to create a circle shape of 18px radius at coordinates 53px and 27px. This circle falls over the second emoji and hence only the second emoji is displayed.

Masking is good but what i am interested is in animating the clip-path property to try and reveal other emojis too. Lets try that.

## Animating the clip-path property

Since clip-path accepts a basic shape function as a value, its animation completely depends on whether or not basic shape is animatable. In our case, the circle is animatable. To animate the clip-path property, i will use `@keyframes` at-rule. Lets create a keyframe animation for the clip-path property. Lets roll.

```css
@keyframes unmask-slide {
    from {
        clip-path: circle(18px at 18px 27px);
    }
    to {
        clip-path: circle(18px at 225px 27px);
    }
}

.unmask-slide {
    animation: unmask-slide 4s cubic-bezier(.77,0,.18,1) infinite alternate;
}
```
{: .snippet}

<style>
    @keyframes unmask-slide {
        from {
            clip-path: circle(18px at 18px 27px);
        }
        to {
            clip-path: circle(18px at 225px 27px);
        }
    }

    .unmask-slide {
        animation: unmask-slide 4s cubic-bezier(.77,0,.18,1) infinite alternate;
    }
</style>

<div class="box">
    <div class="emoji unmask-slide">😀😂😃😄😁😆😅</div>
</div>

Well, thats not bad at all. What i have done here is animated the circle to slide from the left to right using its x coordinate. Go on and see what happens when you play around with the circle's radius.

<div class="note">
    <div class="info"></div>
    <p>The clip-path property animation works only with same shapes. For example, if you animate a circle to a polygon or an ellipse, the animation will not work. When using the same shape, we need to specify the same parameters for the respective shape function. This is one thing you need to be careful about when animating clip-path property.
    </p>
</div>

## A bonus clip-path animation

Well, i felt i needed to try something else too apart from the vanilla clip-path animation. So i tried and this was the result.

<style>
    .arrow-box {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        line-height: 1;
    }

    .arrow-slide {
        --size: 34px;
        animation: arrow-slide 2s cubic-bezier(.77,0,.18,1) infinite;
    }

    @keyframes arrow-slide {
        0% {
            clip-path: inset( 0 var(--size) var(--size) 0 round 5px);
        }
        25% {
            clip-path: inset( var(--size) 0 0 var(--size) round 5px);
        }
        50% {
            clip-path: inset( 0 0 var(--size) var(--size) round 5px);
        }
        75% {
            clip-path: inset( var(--size) var(--size) 0 0 round 5px);
        }
        100% {
            clip-path: inset( 0 var(--size) var(--size) 0 round 5px);
        }
    }
</style>

<div class="box">
    <div class="arrow-box arrow-slide">
        <div>↘️</div>
        <div>↙️</div>
        <div>⬆️</div>
        <div>⬆️</div>
    </div>
</div>

The possibilites are endless. For this animation, i have used the `inset()` shape function for the clip-path property. Here is the css snippet or inspect away if you want to see how it works 🚀

```css
<style>
    .arrow-box {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        line-height: 1;
    }

    .arrow-slide {
        --size: 34px;
        animation: arrow-slide 2s cubic-bezier(.77,0,.18,1) infinite;
    }

    @keyframes arrow-slide {
        0% {
            clip-path: inset( 0 var(--size) var(--size) 0 round 5px);
        }
        25% {
            clip-path: inset( var(--size) 0 0 var(--size) round 5px);
        }
        50% {
            clip-path: inset( 0 0 var(--size) var(--size) round 5px);
        }
        75% {
            clip-path: inset( var(--size) var(--size) 0 0 round 5px);
        }
        100% {
            clip-path: inset( 0 var(--size) var(--size) 0 round 5px);
        }
    }
</style>
```
{: .snippet}

```html
<div class="box">
    <div class="arrow-box arrow-slide">
        <div>↘️</div>
        <div>↙️</div>
        <div>⬆️</div>
        <div>⬆️</div>
    </div>
</div>
```
{: .snippet}