---
author: "Jasmine Hirpara"
title: "Scroll driven animation - the baby steps"
excerpt: "Hands on with animation-timeline css property"
tags: [css, scroll driven animation]
permalink: /posts/scroll-driven-animation
---

Now that the scroll driven animations are newly baseline since the release of <a href="https://mastodon.social/@firefoxwebdevs/117519095804808423" target="_blank">Firefox 159</a>, i decided to give it a try. Lol i know i am late to the party as it has been around for a while now but its never too late to learn something new 😀. As soon as i got to know that scroll-driven animation is baseline now, i straight away headed to the <a href="https://drafts.csswg.org/scroll-animations/" target="_blank">spec</a> and started with it.

## The `animation-timeline`

As we know, the css animations are carried out based on key frames and the interpolation of the property values happen based on the `animation-duration` which is specified. i had a TIL moment when i found out about the `animation-timeline` css property. i havent used it yet. Its default value is `animation-timeline: auto` if you dont specify it. What the default value means is the animations are carried out based on the "document timeline". Lets look at a simple animation.

```css
.emoji {
    font-size: 2rem;
    line-height: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    animation: 5s linear alternate infinite slide-rotate;
    /*
    * animation-duration: 5s;
    * animation-timing-function: linear;
    * animation-direction: alternate;
    * animation-iteration-count: infinite;
    * animation-name: slide-rotate;
    * animation-timeline: auto;
    */
}

@keyframes slide-rotate {
    to { transform: rotate(2turn); left: 96%;}
}
```
{: .snippet}

Here, the emoji slides and rotates alternating between left and right side infinitely.

<style>
    .container {
        position: relative;
        width: 50vw;
        height: 40px;
        margin: auto;
    }

    .emoji {
        font-size: 2rem;
        line-height: 2rem;
        position: absolute;
        top: 0;
        left: 0;
        animation: 5s linear alternate infinite slide-rotate;
    }

    @keyframes slide-rotate {
        to { transform: rotate(2turn); left: 96%;}
    }
</style>
<div class="container">
    <span class="emoji">😎</span>
</div>

If you noticed, i have used `animation` shorthand property. So by default, the value of `animation-timeline` property is `auto` indicating that the document timeline is used. This means the values of `transform` and `left` properties are interpolated based on 5 seconds time.

## Enter the `scroll()` css function

Here's an interesting thought. What if there was a way to change the default timeline for css animations? So, instead of interpolation based on time, it is based on something else. Well, with scroll driven animations, there is!! - the `scroll()` css function or the <a href="https://drafts.csswg.org/scroll-animations/#scroll-timelines-anonymous" target="_blank">scroll progress timeline</a>. In this case, the interpolation of the animated properties happens based on the scroll position.

### Understanding `scroll()` function

The `scroll()` function accepts 2 arguments - `<scroller>` and `<axis>`

`<scroller>` accepts any of `root`, `nearest`, `self` value. The default is `nearest`. What this means is you can specify which element's scroll position needs to be considered for scroll driven animation. The scroll driven animation will only take effect only when the element specified has an overflow and has scroll bars.

`<axis>` accepts any of `block`, `inline`, `x`, `y` value. The default is `block`. What this means is, you can specify which scroll position value to use while interpolating the property value for animation.

Lets look at couple of examples with different values

```css
/*
The default is scroll(nearest block)
nearest - Nearest ancestor element up the dom tree that has scroll bars
block - Use the block axis (vertical axis in horizontal writing mode) scrollbar
*/
animation-timeline: scroll(); // same as scroll(nearest block) or scroll(block nearest)

/*
Use the block-axis scrollbar of root/document element
*/
animation-timeline: scroll(root);

/*
Use the horizontal scrollbar position of root element as the base
*/
animation-timeline: scroll(root x);
```

More example combinations of `<scroller>` and `<axis>` can be found on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline/scroll" target="_blank">MDN</a>

## Lets hands on

Enough talk, now lets try to use `scroll()` to do the same animation that we did at the start of this post using the scroll timeline.

```css
.scroll-container-wrapper {
    width: 50vw;
    height: 200px;
    margin: auto;
    overflow: auto;
    border: 1px solid #cccccc;
}

.scroll-container {
    position: relative;
    width: 100%;
    height: 100vh;
}

.scroll-emoji {
    font-size: 2rem;
    line-height: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    animation-name: rotate-icon;
    animation-timing-function: linear;
    animation-timeline: scroll();
}

@keyframes rotate-icon {
    to { transform: rotate(2turn); top: 97%; left: 95%;}
}
```
{: .snippet}

Here i have created a parent wrapper that has a scroll container with ample height for the scroll bar to appear. As for the animation, i am rotating the emoji twice and having  its position adjusted so that it is always visible when you scroll. So when you gradually scroll, the emoji rotates from top left corner to bottom right corner. Go ahead, give it a try.


<style>
    .scroll-container-wrapper {
        width: 50vw;
        height: 200px;
        margin: auto;
        overflow: auto;
        border: 1px solid #cccccc;
    }

    .scroll-container {
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .scroll-emoji {
        font-size: 2rem;
        line-height: 2rem;
        position: absolute;
        top: 0;
        left: 0;
        animation-name: rotate-icon;
        animation-timing-function: linear;
        animation-timeline: scroll();
    }

    @keyframes rotate-icon {
        to { transform: rotate(2turn); top: 97%; left: 95%;}
        /* See what happens when you use top: calc(97% - 160px)*/
    }
</style>

<div class="scroll-container-wrapper">
    <div class="scroll-container">
        <span class="scroll-emoji">😎</span>
    </div>
</div>

Now here is a question. How can you update the animation so that the emoji rotates to top right instead of bottom right 🤔? Go on scratch that head and see if you can get to it. Hint: you need to update the `top` value in keyframes to account for the emoji height and the wrapper height. Hope you learned something. At least i did 😀
