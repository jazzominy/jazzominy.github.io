---
author: "Jasmine Hirpara"
title: "CSS motion path - Part 2"
excerpt: "Building a clock using CSS motion path and some Javascript"
tags: [css, css motion path]
permalink: /posts/css-motion-path-part-2
---

In my previous related [post](/posts/css-motion-path-part-1), i sent an emoji to a round trip using CSS motion path. In this post, i will build a clock using the motion path css properties and some Javascript.

## Initial setup

To build a clock, we need a circle and 12 numbers as a clock face. Lets start with the circle.

```css
.clock {
    width: 400px;
    height: 400px;
    border: 2px solid #569092;
    border-radius: 50%;
    margin: auto;
}
```
{: .snippet}

Here is how it looks.

<style>
    .clock {
        width: 400px;
        height: 400px;
        border: 2px solid #569092;
        border-radius: 50%;
        margin: auto;
    }
</style>

<div class="clock"></div>

The clock face is a circle with a radius of 50%. Lets add the nubmers now. We'll start with 12 and place it where it should be.

```css
.digit {
    width: 50px;
    height: 50px;
    background-color: black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: white;
}
```
{: .snippet}

Here is how it looks.

<style>
    /* style for all the numbers */
    .digit {
        width: 50px;
        height: 50px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: #fd7f7fbd;
        border-radius: 50%;
        font-size: 2rem;
        color: white;
    }
</style>

<div class="clock">
    <div class="digit">12</div>
</div>

Using the offset properties (learned in [part 1](/posts/css-motion-path-part-1)), we can position the numbers along the circle. Lets do it step by step. Lets add a new style per number:

```css
.twelve {
    offset-path: ray(0deg);
}
```

<style>
    .twelve {
        offset-path: ray(0deg);
    }
</style>

<div class="clock">
    <div class="digit twelve">12</div>
</div>

Here i have used the `ray()` function to define the offset path. As per the <a href="https://www.w3.org/TR/motion-1/#ray-function" target="_blank">motion path speces</a>, the ray function is used to position an element along an angle and a distance. The ray function takes two parameters, the first is the angle and the second is the size of the ray. Here we will use the just the first parameter to position the element along the angle. When we use the ray function, the anchor of the element shifts to the center of the parent element. So to place the number on the circumference, we need to use `offset-distance: 85%`. Also since the rotation of the number is off, we need to set the `offset-rotate` property to `0deg`.

```css
.digit {
    ....
    offset-path: ray(0deg);
    offset-distance: 85%;
}
```

<style>
    .place-on-dial {
        offset-distance: 85%;
        offset-rotate: 0deg;
    }
</style>

<div class="clock">
    <div class="digit twelve place-on-dial">12</div>
</div>

Now we can position the numbers on the circumference by setting the respective angles for the `ray()` function. Lets add the following styles:

```css
.one {
    offset-path: ray(30deg);
}

.two {
    offset-path: ray(60deg);
}

.three {
    offset-path: ray(90deg);
}

....

.eleven {
    offset-path: ray(330deg);
}
```

<style>
    .one {
        offset-path: ray(30deg);
    }

    .two {
        offset-path: ray(60deg);
    }

    .three {
        offset-path: ray(90deg);
    }

    .four {
        offset-path: ray(120deg);
    }

    .five {
        offset-path: ray(150deg);
    }

    .six {
        offset-path: ray(180deg);
    }

    .seven {
        offset-path: ray(210deg);
    }

    .eight {
        offset-path: ray(240deg);
    }

    .nine {
        offset-path: ray(270deg);
    }

    .ten {
        offset-path: ray(300deg);
    }

    .eleven {
        offset-path: ray(330deg);
    }
</style>

<div class="clock">
    <div class="digit twelve place-on-dial">12</div>
    <div class="digit one place-on-dial">1</div>
    <div class="digit two place-on-dial">2</div>
    <div class="digit three place-on-dial">3</div>
    <div class="digit four place-on-dial">4</div>
    <div class="digit five place-on-dial">5</div>
    <div class="digit six place-on-dial">6</div>
    <div class="digit seven place-on-dial">7</div>
    <div class="digit eight place-on-dial">8</div>
    <div class="digit nine place-on-dial">9</div>
    <div class="digit ten place-on-dial">10</div>
    <div class="digit eleven place-on-dial">11</div>
</div>

## Setting up the hands

Now that we have positioned the numbers on the circumference, we can position the hands. Lets add 3 divs for the hands and add the following styles:

```css
.hand {
    width: 4px;
    height: 40%;
    border-radius: 4px;
    background-color: black;
    offset-path: ray(0deg);
    offset-anchor: bottom;
}

.seconds {
    offset-rotate: 0deg;
}

.minutes {
    offset-rotate: 30deg;
}

.hours {
    offset-rotate: 60deg;
    height: 25%;
}
```

<style>
    .no-border {
        border: none;
    }

    .hand {
        width: 4px;
        height: 35%;
        border-radius: 4px;
        background-color: black;
        offset-path: ray(0deg);
        offset-anchor: bottom;
    }

    .seconds {
        offset-rotate: 0deg;
        background-color: #5d85c1;
    }

    .minutes {
        offset-rotate: 30deg;
        background-color: #bbb947cf;
    }

    .hours {
        offset-rotate: 60deg;
        height: 25%;
        background-color: #57b577;
    }
</style>

<div class="clock no-border">
    <div class="digit twelve place-on-dial">12</div>
    <div class="digit one place-on-dial">1</div>
    <div class="digit two place-on-dial">2</div>
    <div class="digit three place-on-dial">3</div>
    <div class="digit four place-on-dial">4</div>
    <div class="digit five place-on-dial">5</div>
    <div class="digit six place-on-dial">6</div>
    <div class="digit seven place-on-dial">7</div>
    <div class="digit eight place-on-dial">8</div>
    <div class="digit nine place-on-dial">9</div>
    <div class="digit ten place-on-dial">10</div>
    <div class="digit eleven place-on-dial">11</div>
    <div class="hand hours" style="offset-rotate: 60deg;"></div>
    <div class="hand minutes" style="offset-rotate: 30deg;"></div>
    <div class="hand seconds"></div>
</div>

We have our clock ready. Now lets add the following styles and javascript to get it ticking. We will use the css variables to update the angle of the hands.

```css
:root {
    --seconds: 0deg;
    --minutes: 0deg;
    --hours: 0deg;
}

.seconds {
    ....
    offset-rotate: var(--seconds);
}

.minutes {
    ....
    offset-rotate: var(--minutes);
}

.hours {
    ....
    offset-rotate: var(--hours);
}
```

```javascript
<script>
    const secondsHand = document.querySelector('.seconds');
    const minutesHand = document.querySelector('.minutes');
    const hoursHand = document.querySelector('.hours');

    setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        // minutesDelta is the exact number of degrees to rotate the minute hand
        const minutesDelta = (minutes * 6) + (seconds * 0.1);
        // hoursDelta is the exact number of degrees to rotate the hour hand
        const hoursDelta = (hours * 30) + (minutes * 0.5);
        
        hoursHand.style.setProperty('--hours', `${hoursDelta}deg`);
        minutesHand.style.setProperty('--minutes', `${minutesDelta}deg`);
        secondsHand.style.setProperty('--seconds', `${seconds * 6}deg`);
    }, 1000);
</script>
```
{: .snippet}

And we have a ticking clock!!!

<style>
    :root {
        --seconds: 0deg;
        --minutes: 0deg;
        --hours: 0deg;
    }

    .seconds {
        offset-rotate: var(--seconds);
    }

    .minutes {
        offset-rotate: var(--minutes);
    }

    .hours {
        offset-rotate: var(--hours);
    }
</style>

<div class="clock no-border">
    <div class="digit twelve place-on-dial">12</div>
    <div class="digit one place-on-dial">1</div>
    <div class="digit two place-on-dial">2</div>
    <div class="digit three place-on-dial">3</div>
    <div class="digit four place-on-dial">4</div>
    <div class="digit five place-on-dial">5</div>
    <div class="digit six place-on-dial">6</div>
    <div class="digit seven place-on-dial">7</div>
    <div class="digit eight place-on-dial">8</div>
    <div class="digit nine place-on-dial">9</div>
    <div class="digit ten place-on-dial">10</div>
    <div class="digit eleven place-on-dial">11</div>
    <div id="hours" class="hand hours"></div>
    <div id="minutes" class="hand minutes"></div>
    <div id="seconds" class="hand seconds"></div>
</div>

<script>
    const secondsHand = document.querySelector('#seconds');
    const minutesHand = document.querySelector('#minutes');
    const hoursHand = document.querySelector('#hours');

    setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        // minutesDelta is the exact number of degrees to rotate the minute hand
        const minutesDelta = (minutes * 6) + (seconds * 0.1);
        // hoursDelta is the exact number of degrees to rotate the hour hand
        const hoursDelta = (hours * 30) + (minutes * 0.5);
        
        hoursHand.style.setProperty('--hours', `${hoursDelta}deg`);
        minutesHand.style.setProperty('--minutes', `${minutesDelta}deg`);
        secondsHand.style.setProperty('--seconds', `${seconds * 6}deg`);
    }, 1000);
</script>

Hurray!!! Let your imagination go wild and build some cool things with CSS motion path.
