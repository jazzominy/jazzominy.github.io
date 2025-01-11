---
author: "Jasmine Hirpara"
title: "Intersection Observer as an Angular Directive"
excerpt: "How to use Intersection Observer as an Angular Directive"
tags: [angular, intersection observer, angular directive]
permalink: /posts/intersection-observer-as-angular-directive
---

Some time back, i came across a usecase at work where, on a page i had to render multiple grids. Now rendering all the grids at once is not performant. And...Intersection Observer popped in to my head. Let's see how we can use it as an Angular Directive.

## What is Intersection Observer?

As per <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver" target="_blank">MDN Docs</a>, Intersection Observer API is a way to observe interaction changes between the target element and the viewport or specified parent element of the target element.

Lets looks at how it works. i will be using a `div` as the parent container and some `img` elements as the target elements.

```html
<div class="container">
  <img alt="   Random Image" data-index="0" />
  <img alt="   Random Image" data-index="1" />
  <img alt="   Random Image" data-index="2" />
</div>
```
{: .snippet}

Here is the css that i will use to style the div and the img elements.

```css
.container {
  max-height: 200px;
  overflow-x: auto;

  & img {
    display: block;
    width: 600px;
    height: 300px;
    border-radius: 2rem;
    margin-bottom: 1rem;
  }
}
```
{: .snippet}

Now, we need to create an Intersection Observer for each of the target element which is `img` in this case.

```javascript
const container = document.querySelector('.container');

const imageUrls = [
    'https://picsum.photos/id/10/600/300',
    'https://picsum.photos/id/20/600/300',
    'https://picsum.photos/id/30/600/300'
];
const targetElements = container.querySelectorAll('img');
targetElements.forEach((element) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                element.src = imageUrls[element.dataset.index];
            }
        });
    });

    observer.observe(element);
});
```
{: .snippet}

Here is the result.

<style>
.container {
  max-height: 200px;
  overflow-x: auto;

  & img {
    display: block;
    width: 600px;
    height: 300px;
    border-radius: 2rem;
    margin-bottom: 1rem;
  }
}
</style>

<div class="container">
  <img alt="   Random Image" data-index="0" />
  <img alt="   Random Image" data-index="1" />
  <img alt="   Random Image" data-index="2" />
</div>

<script>
    const container = document.querySelector('.container');

    const imageUrls = [
        'https://picsum.photos/id/10/600/300',
        'https://picsum.photos/id/20/600/300',
        'https://picsum.photos/id/30/600/300'
    ];
    const targetElements = container.querySelectorAll('img');
    targetElements.forEach((element) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    element.src = imageUrls[element.dataset.index];
                }
            });
        });

        observer.observe(element);
    });
</script>

As you can see, the first image is loaded as soon as the page loads. As you gradually scroll down, for rest of the images you may see the alt text for some time and then the image loads. Go ahead and inspect 🔍 the elements too in dev tools. It wasnt that hard to lazy load images using `IntersectionObserver` was it? 😀

## Angular Directive 🤝 Intersection Observer

For the sake of simplicity, i will use images as elements to lazy load instead of using actual grids. Lets see how the directive looks like.

```javascript
import { 
  AfterViewInit,
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
	selector: '[appDeferElement]',
	standalone: true,
})
export class DeferElementDirective implements AfterViewInit{

	private observer: IntersectionObserver;

	constructor (
		private el: ElementRef,
		private view: ViewContainerRef,
		private template: TemplateRef<any>
	) {
		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.view.createEmbeddedView(this.template);
					this.observer.disconnect();
				}
			});
		});
	}

	ngAfterViewInit() {
    // we use ngAfterViewInit to ensure that the parent element is available
		this.observer.observe(this.el.nativeElement.parentElement);
	}
}
```
{: .snippet}

As you can see, the IntersectionObserver is created in the constructor and the parent element is observed in `ngAfterViewInit`. This ensures that the parent element is available when the directive is initialized. Once the parent element is in view, the view is created meaning the image element is added to the DOM. This directive can be used as follows.

```javascript
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { DeferElementDirective } from './directive/defer-element.directive';

@Component({
  selector: 'app-root',
  imports: [
    DeferElementDirective
  ],
  template: `
    <div class="container">
    @for (item of imageUrls; track $index) {
      <div class="img-placeholder">
        <img *deferElement [src]="item"/>
      </div>
    }
    </div>
  `,
})
export class App {
  imageUrls = [
    // photo credit https://unsplash.com/@pic_nolte
    'https://images.unsplash.com/photo-1736444387876-cd5949fc7347?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // photo credit https://unsplash.com/@brave4_heart
    'https://images.unsplash.com/photo-1735641241204-44519d33651b?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // photo credit https://unsplash.com/@joshuaearle
    'https://images.unsplash.com/photo-1736347837458-7cc3697ba57a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];
}

bootstrapApplication(App);
```
{: .snippet}

Here is the directive in action on <a href="https://stackblitz.com/edit/stackblitz-starters-zhqgh53j?file=src%2Fmain.ts" target="_blank">Stackblitz</a>.

<iframe src="https://stackblitz.com/edit/stackblitz-starters-zhqgh53j?file=src%2Fmain.ts" width="100%" height="450px" frameborder="0" title="Angular Intersection Observer Directive"></iframe>

Just like an image, you can use this directive to lazy load any element. For me this helped to avoid rendering multiple grids at once and avoid unnecessary network calls.

Hope this helps someone.
