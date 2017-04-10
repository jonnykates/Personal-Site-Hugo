+++
title =  "Getting started with SMACSS"
slug = "getting-started-with-SMACSS"
tags = [ "Development", "SMACSS"]
date =  "2015-09-12"
shortsummary = "Organised stylesheets makes me very happy"
+++

One of the key areas of my workflow that I have been focusing on improving in the past year or so is the organisation of my SCSS files. Frustrated with lengthy stylesheets and confusing - often repetitive - code, I decided to buy Jonathan Snook's book '[Scalable and Modular Architecture for CSS](http://shop.smacss.com/)'; or 'SMACSS' for short.

## Introducing SMACSS

[SMACSS](https://smacss.com/) (pronounced "smacks") can't really be described as a framework; there's no library to download and its recommendations are intended as guidelines rather than rules. SMACSS is simply an approach to organising your stylesheets within a project. It tries to make managing large projects easy and logical for front end developers. SMACSS leverages SCSS's ability to easily compile numerous partial files into a single CSS file for use in production. Snook suggests that developers shouldn't be shy about splitting their styles into any number of `_partial.scss` files in favour of keeping your code highly organised and modular in structure.

Bolting on every new style onto the bottom of a single file makes finding things difficult - even with Sublime Text's 'Search in project' functionality. It leads to confusion and more often than not duplication when working in collaborative teams.

Essentially, SMACSS is simply a way of categorising your SCSS files to avoid these pitfalls. By defining certain rules for how styles are applied in a project, everyone in your team knows the rules from the very beginning of a project. Of course, your team might already have existing rules and patterns in place; but if you don't then SMACSS is a wonderful starting point.

## Categorisation

There are five file categories in the SMACSS approach. Here I am going to go through each category and explain what sorts of styles should be included in each.

### 1. Base

Base styles set defaults. To quote Snook directly:

> "[e]ssentially, a base style says that wherever this element is on the page, it should look like *this*".

In my Base folder, I tend to have a reset file, a file dedicated to typography, a file dedicated to default form styles as well as a file to store my SCSS variables. I will then also have a rather generic catch-all base file simply called `_base.scss` that has other default styles that don't deserve a dedicated modular sheet. For example, the `_base.scss` partial for a project I'm currently working on has styles such as:

~~~scss
img {
  max-width: 100%;
}
~~~

### 2. Layout

The layout folder contains all styles that control the various grids, containers and wrappers on any page. I'm currently using [Bourbon](http://bourbon.io/)'s [Neat](http://neat.bourbon.io/) grid framework in my projects, so I tend to install these libraries in the layout folder and then define some classes that I can extend when it comes to building the specific modules in my project. For example, I tend to always define the following classes that use Neat's `span-columns` mixin:

~~~scss
.one-col { @include span-columns(1); }
.two-cols { @include span-columns(2); }
.three-cols { @include span-columns(3); }
.four-cols { @include span-columns(4); }
// etc.
.full-width { @include fill-parent };
~~~

### 3. Modules

This is where the guts of your styles are built. SMACSS encourages a modular approach to front end development; a theme that is growing in popularity (see [this article](http://alistapart.com/article/language-of-modular-design) from Alla Kholmatova). I create new partials in this folder for every different modular item that will be in use anywhere on the site. This could range from things as broad as `_header.scss` through to a very specific block.

The modules folder is probably going to contain the most number of files in your SMACSS directory. When I first started using this approach, I was always very anxious about having too many modules files. However, it's important to realise that every module needs to have its own partial: those are the rules and you should stick to them. Because one file relates to one module, then you are able to name these partials highly specifically. For example, if I have a module with the class `.callout`, then I can create a partial called `_callout.scss` and immediately know that this is where the styles for this class live.

Jonathan Snook goes into some more detail on naming rules at the bottom of [this page](https://smacss.com/book/categorizing) on the SMACSS website.

### 4. State

State rules contain styles that are specific to a particular *state* of a module. For example, you could have a `.inactive` state, and then define within the `_inactive.scss` partial how your various modules should differ if this class is also applied to the element.

Personally, I prefer to keep my states within a module's partial, rather than split these out into a separate folder and files - however I can easily see how this would become unmanageable with certain types of projects that have a high level of user interaction with the interface.

### 5. Theme

Finally, the theme folder is similar to the state folder and would contain various different theme styles that could be used. Again, personally I've never found a need for using themes, but I could see how you might want to create a few more SCSS variables files here to define different themes for your UI (for example, light or dark, high contrast etc.).

## Scratching the surface

This introduction is just scratching the surface of the SMACSS approach and I would highly, *highly* recommend you [read the book](http://shop.smacss.com/) and encourage your team to also read the book if you're likely to employ this approach in your workflow. Snook goes into far more detail about the organisation structure that SMACSS suggests, but also talks far more generally about the benefits of modular design as well as the importance of file organisation and the benefits that a high level of organisation can bring to a project.