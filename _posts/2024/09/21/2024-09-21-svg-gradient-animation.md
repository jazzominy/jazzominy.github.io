---
author: "Jasmine Hirpara"
excerpt: "Animating SVG gradients and masking with text"
tags: [svg gradients, animation]
permalink: /posts/svg-gradient-animation
---

i always wondered how could i aninamate gradients. This curiosity led me to explore the SVG gradients and the result is what i used as the backrgound for my name on the left. Lets get started with how i achieved this.

## SVG Gradients

Just as we have linear and radial gradients in CSS, we have gradients in SVG as well. i tried to animate css gradients but i could find a way to do it. So i started looking up for SVG <a href="https://www.w3.org/TR/SVG/pservers.html#LinearGradients" target="_blank">linear gradients</a> and found that they can be animated using the <a href="https://svgwg.org/specs/animations/#AnimateElement" target="_blank">animate</a> element.

Lets start with a simple svg with a `rect` element

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100%" height="100%" fill="#fdf1cb">
	</rect>
</svg>
```
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100%" height="100%" fill="#fdf1cb">
	</rect>
</svg>

Now lets add a linear gradient to the `rect` element. For this we need to add a `defs` element to the svg and define the gradient in it. Using the id attribute of the gradient, we can refer to it in the `fill` attribute of the `rect` element.

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="r-gradient">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#r-gradient)">
	</rect>
</svg>
```
{: .snippet}

When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-1">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-1)">
	</rect>
</svg>

The `stop` element helps to define the color stops of the gradient. The interpolation or the transition is based on how the `offset` attribute is defined. Its value ranges from 0 to 1 or from 0% to 100%. In the example above, the gradient starts with the color `#fdf1cb` at 0% and ends with the color `#ed73a8` at 100%. This will create a linear gradient from left to right.

Lets see what happens when we keep the offset of the second stop at 0.5

```html
...
<stop offset="0" stop-color="#fdf1cb"></stop>
<stop offset="0.5" stop-color="#ed73a8"></stop>
...
```
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-2">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset=".5" stop-color="#ed73a8"></stop>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-2)">
    </rect>
</svg>

As you can see the difference, the interpolation or transition from the first color to the second color completes at 50% and the second color remains solid till the end.

Now when we have the same values for the offset of the stops,

```html
...
<stop offset=".5" stop-color="#fdf1cb"></stop>
<stop offset=".5" stop-color="#ed73a8"></stop>
...
```

the gradient will be nothing but 2 solid colors placed side by side like this:

<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-3">
            <stop offset=".5" stop-color="#fdf1cb"></stop>
            <stop offset=".5" stop-color="#ed73a8"></stop>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-3)">
    </rect>
</svg>

## x1, y1, x2, y2 attributes

The `x1`, `y1`, `x2`, and `y2` attributes on `linearGradient` element are used to define the direction of the gradient. They can have values ranging from 0 to 1 or from 0% to 100%. The default values are `x1="0%"`, `y1="0%"`, `x2="100%"`, and `y2="0%"`. The `x1` and `x2` attributes define the direction of the gradient along the x-axis (left to right) and the `y1` and `y2` attributes define the direction of the gradient along the y-axis (top to bottom). Lets see how we can use these attributes to create a gradient from top to bottom.

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-4)">
    </rect>
</svg>
```
{: .snippet}
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-4)">
    </rect>
</svg>

Go on and try different values for the `x1`, `y1`, `x2`, and `y2` to create different gradients. One more thing to add is, we can add multiple stops to `linearGradient` element to create more complex gradients.

## Let's animate

We now know bare bones of how to create gradients in SVG. i went through the <a href="https://svgwg.org/specs/animations/#AnimateElement" target="_blank">animate</a> element and found that it can be used to animate the gradients. As per the `linearGradient` <a href="https://www.w3.org/TR/SVG/pservers.html#LinearGradients" target="_blank">specification</a>, it can accept an `animate` element as its child. It also lists the attributes that can be animated. Lets see how we can animate the `y1` attribute of the `linearGradient` element to create a transition from top to bottom.

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="0" stop-color="#ed73a8"></stop>
            <animate attributeName="y1" from="0" to="1" dur="3s" repeatCount="indefinite"></animate>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-5)">
    </rect>
</svg>
```
{: .snippet}
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="0" stop-color="#ed73a8"></stop>
            <animate attributeName="y1" from="0" to="1" dur="3s" repeatCount="indefinite"></animate>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-5)">
    </rect>
</svg>

The `animate` element animates the `y1` attribute of the `linearGradient` element from 0 to 1 in 3 seconds. The `repeatCount` attribute allows us to set the number of times the animation should repeat. The value `indefinite` makes the animation run indefinitely. Similarly, we can animate the `x1` and `x2` attributes to create a transition from left to right which will look like this:

<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-6" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="0" stop-color="#ed73a8"></stop>
            <animate attributeName="x1" from="0" to="1" dur="3s" repeatCount="indefinite"></animate>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-6)">
    </rect>
</svg>

So with different combinations of animating the `x1`, `y1`, `x2`, and `y2` attributes, we can create different transitions. i was able to create the background for my name using different combinations of these attributes. Here is what i came up with:

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-7" x1="0" x2=".5" y1=".01" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="0" stop-color="#eca9bb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
            <animate attributeName="x1"
                from="0" to="1" repeatCount="indefinite" dur="5s"/>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-7)">
    </rect>
</svg>
```
{: .snippet}
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-7" x1="0" x2=".5" y1=".01" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="0" stop-color="#eca9bb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
            <animate attributeName="x1"
                from="0" to="1" repeatCount="indefinite" dur="5s"/>
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-7)">
    </rect>
</svg>

## Enter the mask

The `mask` element in SVG is used to clip parts of an element. Lets see how we can use the `mask` element to clip the gradient. We can define a `mask` element in the `defs` element and use the `mask` attribute on the `rect` element to apply the mask. The element declared in mask can be any shape or path. The fill color of the mask element works as opacity for what is visible in the `rect` element.

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-8" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
        <mask id="mask-1">
            <rect x="0" y="0" width="50%" height="100%" fill="#fff">
            </rect>
        </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-8)" mask="url(#mask-1)">
    </rect>
</svg>
```
{: .snippet}
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-8" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
        <mask id="mask-1">
            <rect x="0" y="0" width="50%" height="100%" fill="#fff">
            </rect>
        </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-8)" mask="url(#mask-1)">
    </rect>
</svg>

Here the mask is a `rect` element that is 50% wide. Since the fill color of the mask is white, the gradient is visible only on the left side of the masked `rect` element. We can use different shapes or paths in the mask to create different effects.

This got me thinking what if we could use text as a mask. i straight away headed to the <a href="https://www.w3.org/TR/SVG/render.html#ClippingAndMasking" target="_blank">specification</a> and found that it is possible. Lets see how we can use text as a mask.

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-9" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
        <mask id="mask-2">
            <text x="0" y="45" font-size="3.5rem" font-weight="bold" font-family="Arial"  
                fill="#fff">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
        </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-9)" mask="url(#mask-2)">
    </rect>
</svg>
```
{: .snippet}
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-9" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
        </linearGradient>
        <mask id="mask-2">
            <text x="0" y="45" font-size="3.5rem" font-weight="bold" font-family="Arial"  
                fill="#fff">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
        </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-9)" mask="url(#mask-2)">
    </rect>
</svg>

The text is used as a mask here. The fill color of the text is white, so the gradient is visible only where the text is present.

## It all comes together

Now we have a gradient, that is animated. We have a mask that is using text. Now is the time to get this all together.

```html
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-10" x1="0" x2=".5" y1=".01" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="0" stop-color="#eca9bb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
            <animate attributeName="x1"
                from="0" to="1" repeatCount="indefinite" dur="5s"/>
        </linearGradient>
        <mask id="mask-3">
            <text x="0" y="45" font-size="3.5rem" font-weight="bold" font-family="Arial"  
                fill="#fff">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
        </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-10)" mask="url(#mask-3)">
    </rect>
</svg>
```
{: .snippet}
When rendered, it looks like this:
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gradient-10" x1="0" x2=".5" y1=".01" y2="0">
            <stop offset="0" stop-color="#fdf1cb"></stop>
            <stop offset="0" stop-color="#eca9bb"></stop>
            <stop offset="1" stop-color="#ed73a8"></stop>
            <animate attributeName="x1"
                from="0" to="1" repeatCount="indefinite" dur="5s"/>
        </linearGradient>
        <mask id="mask-3">
            <text x="0" y="45" font-size="3.5rem" font-weight="bold" font-family="Arial"  
                fill="#fff">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
        </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-10)" mask="url(#mask-3)">
    </rect>
</svg>

Well, well, well. It sure did take some time and effort to get this right. But i am glad i did it. i hope someone finds this useful. Credits where due, i found this really old <a href="https://vanseodesign.com/web-design/svg-linear-gradients" target="_blank">article</a> that helped me understand the basics of SVG gradients and of course the <a href="https://svgwg.org" target="_blank">SVG Working Group</a> for the detailed specifications.
