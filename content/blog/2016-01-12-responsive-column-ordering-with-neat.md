+++
title =  "Responsive Column Ordering with Neat"
slug = "responsive-column-ordering-with-neat"
tags = [ "Development", "Neat"]
date =  "2016-01-12"
shortsummary = "Using floats to hack Bourbon Neat. Can't we all use Flexbox yet?"
+++

[Neat](http://neat.bourbon.io/) by Bourbon is a nice little grid framework that bolts on to the wider Bourbon library. Neat allows you to structure your project's layout around a fluid column based grid and then use clear semantic grid definitions in your Sass. Once you've defined some global variables - such as your container width, number of columns, gutter width etc. - Neat gives you a range of versatile Sass mixins that dictate an element's layout behaviour.

For example, if we wanted to set up a basic 12 column sidebar page layout, we might define our `aside` element to be 3 columns wide, and our `article` to be 9 columns wide as such:

~~~scss
section {
  @include outer-container; // set this element as the 12 column container

  aside {
    @include span-columns(3); // our sidebar
  }

  article {
    @include span-columns(9); // the main body of the layout
  }
}
~~~

We can then use these Neat mixins within media queries to dictate how our layout folds and wraps at different resolutions. For example, we might want both our `aside` and `article` elements to fill the complete width of their parent container at a globally defined breakpoint, `$tablet`. We can do this using Neat's `fill-parent` mixin.

~~~scss
@include media($tablet) {
  aside, article {
    @include fill-parent;
  }
}
~~~

What Neat *doesn't* do is let you decide what *order* your DOM elements wrap. Flexbox gives us a couple of ways to achieve this, not least:

~~~scss
.container {
  flex-wrap: wrap-reverse;
}
~~~

... But Neat will always wrap from left-to-right; meaning that in our two column article/aside example, the aside will always have to wrap underneath the article.

![Bourbon Neat Column Ordering](/img/neat-columns.png)

I stumbled across this issue recently in a project I was working on, and soon found Github user toobulkeh's [issue post](https://github.com/thoughtbot/neat/issues/304) on the Neat repository.

It seems that this is a limitation of Neat, but there is a bit of a hacky solution that we can implement to re-order our elements in the order we want. The trick is to order the elements in your HTML in the order you would like them to appear *after* the breakpoint.

~~~html
<div class="container">
  <div class="aside four-cols">
    I want this div to be on the right normally, but then sit on top when the columns go full width after breakpoint
  </div>
  <div class="article eight-cols">
    This div is the main column and needs to sit on the left normally, but fold underneath after break
  </div>
</div>
~~~

Then, I use `float` to force the order I want the elements to appear in *before* the breakpoint. You have to include Neat's [`omega` mixin](http://thoughtbot.github.io/neat-docs/latest/#omega) here to sort out the gutters as you're using floats to botch up the column ordering that Neat expects.

~~~scss
.aside {
  @include span-columns(4);
  float: right;
  @include omega;
}
.article {
  @include span-columns(8);
  float: left;
}
~~~

Then my media query will make both `.aside` and `.article` fill the `.container` at my breakpoint. When this happens, the floats are basically irrelevant because they are now both set to `width: 100%`.

~~~scss
.container div {
  @include media(max-width 400px) {
    @include fill-parent();
  }
}
~~~

This is very much a hack. We're using CSS floats to override the expected behaviour of Neat's column ordering. Needless to say that float shouldn't really be used, ever. But in this scenario it does exactly what we need. If you need any help with this issue, give me a shout on [Twitter](http://www.twitter.com/jonnykates) or leave a comment in that [Git issue](https://github.com/thoughtbot/neat/issues/304) and I'll try and chime in.