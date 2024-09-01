---
author: Jasmine Hirpara
excerpt: RxJS combineLatest and forkJoin - what's the difference?
tags: [rxjs, combineLatest, forkJoin]
permalink: /posts/combinelatest-vs-forkjoin
---

Over the years, i have worked with RxJS and i used to wonder what is the difference between `combineLatest` and `forkJoin` functions. Both combine different observables into a single observable and emit the values when all the inner observables have emitted a value. One fine day i decided to use `forkJoin` to combine 2 observables - one a BehaviorSubject and another an observable returned from an http call. Lets see what happens when we use `forkJoin` to combine these 2 observables. For the sake of simplicity, i am using `of` operator to mock the http call.

```javascript
import { BehaviorSubject, forkJoin, of } from 'rxjs';

const subject = new BehaviorSubject(0);
const httpCall = of('mock http call');

forkJoin([subject, httpCall]).subscribe(([subjectValue, httpCallValue]) => {
    console.log('Subject value:', subjectValue);
    console.log('Http call value:', httpCallValue);
});
```
{: .snippet}

Lets see what happens when we run this code.

<iframe src="https://stackblitz.com/edit/4rryvy?devToolsHeight=100&embed=1&file=index.ts&hideExplorer=1" width="100%" height="350px"></iframe>

Well, well, well. The `forkJoin` function did not emit any value. And just like you, i was surprised too. So i decided to use `combineLatest` instead of `forkJoin` and see what happens.

```javascript
import { BehaviorSubject, combineLatest, of } from 'rxjs';

const subject = new BehaviorSubject(0);
const httpCall = of('mock http call');

combineLatest([subject, httpCall]).subscribe(([subjectValue, httpCallValue]) => {
    console.log('Subject value:', subjectValue);
    console.log('Http call value:', httpCallValue);
});
```
{: .snippet}

And that just works! The `combineLatest` function emitted the values of both the observables. So what is the difference between `combineLatest` and `forkJoin`?

As per the official <a href="https://rxjs.dev/api/index/function/forkJoin#description" target="_blank">RxJS documentation</a>, `forkJoin` **waits** for all passed observables to **complete** and then it emits the last emitted value from each. In the above example, i used a BehaviorSubject which haven't completed. Hence `forkJoin` did not emit any value. Once i complete the BehaviorSubject, `forkJoin` should emit the value.

```javascript
subject.complete();
```

With `combineLatest`, it emits the value whenever any of the inner observables emit a value. So in the above example, when the BehaviorSubject emits a value, `combineLatest` emits the value.

Phew! i spent quite some time scratching my head over this 😅. But i was out of the woods finally.