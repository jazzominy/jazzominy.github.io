---
author: "Jasmine Hirpara"
excerpt: "Your own custom for loop structural directive in Angular"
tags: [angular, structural directive, forEach]
permalink: /posts/custom-structural-directive
---

i have been working with Angular for quite some time now and i developed this curiosity to understand how the structural directives like `*ngFor`, `*ngIf` worked behind the scenes. So i referred to the Angular source code and tried to understand the implementation of `*ngFor` and tried my hand at creating my own custom structural directive similar to `*ngFor`. i named it `*forEach` (wow, so original 😅). Let's see how i implemented it.

## The star in structural directives

So any idea how angular interprets the `*` in any structural directive like `*ngFor`? Lets see an example of `*forEach` directive. When i use `*forEach` on an element, what angular internally does is it wraps the element in a `<ng-template>` . So if i use it on a `div` element like `<div *forEach></div>`, angular converts it to: 

```html
<ng-template [forEach]></ng-template>
```

## Adding the context placeholder property

Now that i know how angular wraps the element in a `<ng-template>`, i need to add context to the template. The context is the data that is passed to the directive so that it can be used in the template. Now lets see how i can add context to the `*forEach` directive. i need to add a `let` keyword followed by a variable name to the directive. Something like this:

```html
<div *forEach="let message">
    { { message }}
</div>
```

Angular converts this to:

```html
<ng-template forEach let-message>
    <div>{ {message}}</div>
</ng-template>
```

## Passing the context to the template

Well...what we now have is a template with as placeholder variable `message`. Now i will show you how i can pass value to the template variable. Lets look at a snapshot of how to do it:

```javascript
ngAfterViewInit() {
    this.view.createEmbeddedView(this.template, {
        $implicit: 'This is the context'
    });
}
```

We will later see how to create the `view` and `template` in the directive. But for now, we just need to know thate Angular uses `createEmbeddedView` to create a view with the template and the context. The `$implicit` is a special keyword/property that angular uses to pass the context to the template.

Lets see the interim code for the `*forEach` directive that just renders the element with the context:

```javascript
import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[forEach]'
})
export class ForEachDirective {
    constructor(
        // Since we use a * in the directive (*forEach),
        // we get the template as an injected dependency
        private template: TemplateRef<any>, 
        // The view container is used to create
        // the view that renders the template
        private view: ViewContainerRef
    ) {}

    ngAfterViewInit() {
        this.view.createEmbeddedView(this.template, {
            $implicit: 'This is the context'
        });
    }
}
```
{: .snippet}

Here is a <a href="https://stackblitz.com/edit/directive-3z6jnx?ctl=1&file=src%2Fmain.ts&hideExplorer=1&hideNavigation=1" target="_blank">Stackblitz</a> sample to see the above code in action.

## Now comes the fun part - iterating over an array 😀

Now that we have the context in place, it should be easy to iterate over an array and render the elements dynamically. So how do i do that? First there is a small concept that we need to look at; on how the array is passed to the directive. So the directive will look something like this:

```html
<div *forEach="let message from messages">
    { { message }}
</div>
```

Here i have used `from` word to iterate over `messages` array. Now, angular will transform this to a template that looks like:

```html
<ng-template forEach let-message [forEachFrom]="messages">
    <div>{ {message}}</div>
</ng-template>
```

If you observed, it creates a new input property `forEachFrom`. The input property name is formed as directive selector + key word used in expression passed in to *forEach. So in our example we have `*forEach="let message from messages"`. Here `from` is a keyword. So the input property name formed is `forEachFrom`. This means that i need to add an input property to the directive to accept the array. Lets see how i can do that:

```javascript
import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[forEach]'
})

export class ForEachDirective<T> {

    constructor(
        private template: TemplateRef<any>,
        private view: ViewContainerRef
    ) {}

    @Input()
    set forEachFrom (value: T[]) {
        console.info(value);
    }
}
```
{: .snippet}

Here as you can see, i have added an input setter `forEachFrom` to accept the array. This means whenever the array is passed to the directive, the setter will be called with the array value. Now lets render the elements dynamically using the array.

```javascript
@Input()
set forEachFrom (value: T[]) {
    this.view.clear();

    if (Array.isArray(value)) {
        value.forEach(item => {
            this.view.createEmbeddedView(this.template, {
                $implicit: item
            });
        })
    }
}
```
{: .snippet}

Here i have iterated over the array and created a view for each item in the array. The `$implicit` property is used to pass the item to the template. Lets see the complete code for the `*forEach` directive:

```javascript
import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[forEach]'
})

export class ForEachDirective<T> {

    constructor(
        private template: TemplateRef<any>,
        private view: ViewContainerRef
    ) {}

    @Input()
    set forEachFrom (value: T[]) {
        this.view.clear();

        if (Array.isArray(value)) {
            value.forEach(item => {
                this.view.createEmbeddedView(this.template, {
                    $implicit: item
                });
            })
        }
    }
}
```
{: .snippet}

And that is it! That is how a custom structural directive similar to `*ngFor` can be implemented. Hope you learned something new today 🤓