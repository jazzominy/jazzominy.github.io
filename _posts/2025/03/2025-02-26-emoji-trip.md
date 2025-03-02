---
author: "Jasmine Hirpara"
title: "CSS motion path - Part 1"
excerpt: "Here's how i sent an emoji to a round trip using CSS motion path"
tags: [css, css motion path]
permalink: /posts/css-motion-path-part-1
---

In my spare time, i lurk on <a href="https://www.w3.org" target="_blank">W3C</a> and <a href="https://www.w3.org/Style/CSS/current-work" target="_blank">CSSWG current work</a> to discover new things and recently i discovered <a href="https://www.w3.org/TR/motion-1" target="_blank">motion path</a> specs. i read through the specs and i thought lets build a clock using css properties offset-* and a bit of Javascript.

Lets get started!!

## The offset-* properties

According to the motion path spec, we can position an element along any path by using the offset-* properties. The path can be a circle, a line, or a custom path. The bounding box of the parent element can also be used to define the path.

Lets look at a simple example. i have a box with border radius of 50%. Lets call it a parent. i want to position a emoji inside this parent element.

```css
.box {
    width: 270px;
    height: 270px;
    border: 2px solid aquamarine;
    border-radius: 50%;
}

.emoji {
    width: 50px;
    height: 50px;
    border: 2px solid #ff7f7f;
    border-radius: 50%;
    offset-path: border-box;
    offset-anchor: top;
}
```
{: .snippet}

The `offset-path` property on inner element with a `border-box` value defines the path. It means the path of action for the inner element will be the border box of the parent element.The `offset-anchor` property defines the anchor point of the inner element. Here i have used `top` which means the top of the inner element will be aligned with the border of the parent element. Here is how it looks.

<style>
    .box {
        width: 270px;
        height: 270px;
        border: 2px solid #569092;
        border-radius: 50%;
        margin: auto;
    }

    .emoji {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        width: 50px;
        height: 50px;
        offset-path: border-box;
        offset-anchor: top;
    }
</style>

<div class="box">
    <div class="emoji">😀</div>
</div>

Unless we set the `offset-path` property, there will be no effect on the positon of the inner element. Alright, lets send the emoji to a round trip. To do that, we need to use the `offset-distance` property. It defines how far the emoji is from the anchor point. Its value can be a length or a percentage unit. Here i have used `50%` which means the emoji will be half the distance from the anchor point along the path that is border box in this case.

```css
.emoji {
    width: 50px;
    height: 50px;
    border: 2px solid #ff7f7f;
    border-radius: 50%;
    offset-path: border-box;
    offset-anchor: top;
    offset-distance: 50%;
}
```
{: .snippet}

Here is how it looks.

<style>
    .distance {
        offset-distance: 50%;
    }
</style>

<div class="box">
    <div class="emoji distance">😀</div>
</div>

Woah!! thats cool. Half a trip and upside down. Behind the scenes, there is one more propery at play here - `offset-rotate`. It defines the rotation of the emoji as it moves along the path. By default its value is `auto` and it means the rotation will be calculated based on the path. Since it is an angle, the unit supported us `deg` or `rad`. This explains why the emoji is upside down. Open the developer tools in your borwser and try setting `offset-rotate` to `0deg` and see what happens.

## Animating the offset-distance property

Now comes the fun part - animation. Lets animate the emoji along the path. For this i will use the `offset-distance` property and animate it using the `animation` property from `0%` to `100%`. Here is the animation bit.

```css
@keyframes move {
    from {
        offset-distance: 0%;
    }
    to {
        offset-distance: 100%;
    }
}

.travel {
    animation: move 2s cubic-bezier(.79,.14,.15,.86) infinite;
}
```
{: .snippet}

And here is how it looks.

<style>
    @keyframes move {
        from {
            offset-distance: 0%;
        }
        to {
            offset-distance: 100%;
        }
    }
    .travel {
        animation: move 2s cubic-bezier(.79,.14,.15,.86) infinite;
    }
</style>

<div class="box">
    <div class="emoji travel">😀</div>
</div>

Happy journey emoji!!

Now that the i have a clear understanding of how the offset-* properties work, i build up on them to create a clock in [part 2](/posts/its-about-time)