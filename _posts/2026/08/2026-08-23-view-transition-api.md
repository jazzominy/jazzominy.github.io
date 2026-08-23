---
author: "Jasmine Hirpara"
title: "Grid layout to list layout transition"
excerpt: "Using view transition for grid layout to list layout transition"
tags: [css, animation]
permalink: /posts/view-transition-api
---

Well well. Hello there. i know i am late to the party but view transitions api!! Thats some thing. i am hooked with it. Read up about it on <a href="https://drafts.csswg.org/css-view-transitions-2" target="_blank">CssWG</a> spec for view transitions. Credits where due - Jake Archibald's <a href="https://drafts.csswg.org/css-view-transitions-2" target="_blank">[article](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)</a> helped me understand how view transitions api works.

<div class="note" style="display:none;">
  <div class="info"></div>
    <p><b>Element level view transition is not supported yet in this browser.</b> To view the sample, please use a browser that supports element level view transition. More details <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/startViewTransition" target="_blank">here</a>.</p>
</div>

<script>
  const note = document.querySelector('.note');
  // if element level view transition is not supported
  if(!note.startViewTransition) {
    note.style.display = 'flex';
  }
  else {
    note.style.display = 'none';
  }
</script>

The sample that i tried uses same document view transition. Lets walk through it. It is a simple transition from the grid view to list view

<style>
  .sample-parent {
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > span {
      font-size: 2rem;
    }
  }

  .container {
    flex-basis: 40%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .list-view {
    grid-template-columns: 1fr;
    overflow-y: auto;
    height: 316px;
    padding: 0;
  }

  .card {
    padding: 1.5rem;
    background: #a2a2a2;
    border-radius: 8px;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--bg);
    text-shadow: none;
  }
</style>

<div class="sample-parent">
  <div class="container">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
  </div>
  <span> ➡️ </span>
  <div class="container list-view">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
  </div>
</div>

## Enabling view transition

View transitions are not enabled by default. We need to opt in using a bit of javascript like

```javascript
// api check whether or not view transition is supported by browser
if(!document.startViewTransition) {
    return;
}

// it can very well be any element apart from document.
// Note that at the time of writing this blog, element level view transition is not yet supported in all the browsers.
// Check the link for more details - https://developer.mozilla.org/en-US/docs/Web/API/Element/startViewTransition
document.startViewTransition(() => {
    // Call back with layout changes applied
});
```

Lets get started.

i'll start with a simple 2 x 3 grid using grid layout

```css
.container {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  padding: 1.5rem;
  background: #a2a2a2;
  border-radius: 8px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--bg);
  text-shadow: none;
}
```
{: .snippet}

It looks like this

<div class="container" style="width:50%;margin:auto;">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>

Let us see what our target view would be. We want to toggle the view to list view. So let me add style for that

```css
.list-view {
  grid-template-columns: 1fr;
  overflow-y: auto;
  height: 316px;
  padding: 0;
}
```
{: .snippet}

It looks like

<div class="container list-view" style="width:50%;margin:2rem auto;">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>

To toggle the view from grid to list, let me add a button and add a listener to it which enables the view transition

```javascript
const toggleButton = document.getElementById('toggle-btn');
const container = document.getElementById('item-container');

toggleButton.addEventListener('click', () => {
    if(!container.startViewTransition) {
      container.classList.toggle('list-view');
      return;
    }

    container.startViewTransition(() => {
        container.classList.toggle('list-view');
    });
});
```
{: .snippet}


<div style="width:50%;margin:auto;">
  <button id="toggle-btn" style="display:block;margin:2rem auto;">
    Toggle View
  </button>
  <div class="container" id="item-container">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
  </div>
</div>

<script>
  const toggleButton = document.getElementById('toggle-btn');
  const container = document.getElementById('item-container');

  toggleButton.addEventListener('click', () => {
      if(!container.startViewTransition) {
        container.classList.toggle('list-view');
        return;
      }

      container.startViewTransition(() => {
          container.classList.toggle('list-view');
      });
  });
</script>

As you can see, the default view transition has a fade out and fade in effect for the `container` element. The old snapshot - the grid view, fades out and the new snapshot - the list view fades in. What if we wanted to change the default animation? Good news!! We can do that. 

When the view transition is active, the browser adds a pseudo element tree specific to the view transition. Here is a sample pseudo element tree

<img src="/assets/img/vt-tree.png" style="width:50%;display:block;margin:auto;" alt="View transition pseudo element tree" />

The default styles are applied to the root or document element unless we specify a `view-transition-name`. 

To begin with, lets customize the animation time and function and add the following style

```css
.container {
  ...
  view-transition-name: container;
}

::view-transition-group(container) {
  animation-duration: 2s;
  animation-timing-function: ease;
}
```
{: .snippet}

<style>
  ::view-transition-group(container) {
    animation-duration: 2s;
    animation-timing-function: ease;
  }
</style>

Lets see it in action

<div style="width:50%;margin:auto;">
  <button id="toggle-btn-2" style="display:block;margin:2rem auto;">
    Toggle View
  </button>
  <div class="container" style="view-transition-name: container;" id="item-container-2">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
  </div>
</div>

<script>
  const toggleButton2 = document.getElementById('toggle-btn-2');
  const container2 = document.getElementById('item-container-2');

  toggleButton2.addEventListener('click', () => {
    if(!container2.startViewTransition) {
      container2.classList.toggle('list-view');
      return;
    }

    container2.startViewTransition(() => {
      container2.classList.toggle('list-view');
    });
  });
</script>

As you can see, the custom animation is applied as expected. To apply custom animation, i used the `view-transition-name` property to name view transition group. Accordingly browser added a `::view-transition-group(container)` pseudo element which is used to apply the custom animation. The new tree looks like this

<img src="/assets/img/vt-tree-2.png" style="width:50%;display:block;margin:auto;" alt="View transition pseudo element tree" />

While this works great, lets see how we can apply custom animation to individual elements. Using a different `view-transition-name` for each element can help us achieve this but that can be tedious. Worry not, there is a better way to let the browser give an auto-generated name to each groupelement using the `match-element` value like this

```css
.card {
  ...
  view-transition-name: match-element;
}
```
{: .snippet}

Lets see it in action

<style>
  #item-container-3 {
    view-transition-name: containerx;
    height: unset;
  }

  #item-container-3 .card {
    view-transition-name: match-element;
    min-height: 75px;
  }
</style>

<div style="width:50%;margin:auto;">
  <button id="toggle-btn-3" style="display:block;margin:2rem auto;">
    Toggle View
  </button>
  <div class="container" style="view-transition-name: containerx;" id="item-container-3">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
  </div>
</div>

<script>
  const toggleButton3 = document.getElementById('toggle-btn-3');
  const container3 = document.getElementById('item-container-3');

  toggleButton3.addEventListener('click', () => {
    if(!container3.startViewTransition) {
      container3.classList.toggle('list-view');
      return;
    }

    container3.startViewTransition(() => {
      container3.classList.toggle('list-view');
    });
  });
</script>

As you can see, the custom animation is applied to each element as expected. And overall effect is not that bad either. Here is the new tree which has grown a bit in size 😀

<img src="/assets/img/vt-tree-3.png" style="width:50%;display:block;margin:auto;" alt="View transition pseudo element tree" />

Now that you have a tree, try and apply custom animation to each element. Oh wait, how will you do it for all items with a randomly generated name? There is a way! Here's how

```css
::view-transition-group(*) {
  animation-duration: 2s;
  animation-timing-function: ease;
}
```
{: .snippet}

This will apply the custom animation to all the elements in all the view transition groups. This last bit you will have to do it for yourself and find out how that works out.

Hope you learned something new!
