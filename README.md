# React Router Nested Routes example

This repository contains a sample repository that shows how nested routes can be used to solve complex shared layout problems in react.

## Description

The project is a simulation of an app where there are multiple `Page` objects that are fetched and displayed as individual routes. The purpose of the example is to demonstrate how we can have a shared `PageContainer` component that is responsible for fetching this page data and for defining sub-routes within that page. This means we can encapsulate shared loading data and UI elements between different ways of interacting with the `Page` without having these elements appear and disappear from the screen.

The site has two top level routes

- Home `/` - Fetches all the pages so we can have a link to each page
- Pages `/pages/:pageId/*` - Top level `Page` route that renders the `PageContainer`

### `PageContainer`

Within the `PageContainer` component we render a `<PageHeader />` that has some shared UI including a breadcrumb, and a navigation for the page which link to sub-routes. We also load the page from our data layer and while loading we show "loading" and once loaded we render the sub routes themselves within this component. This has the effect that while we switch between pages the `<PageHeader />` elements do not disappear and re-render, instead the stay where they are and the loading spinner only takes the place of the current page subroute.

> Note: In a more realistic example you would want to disable the `<PageHeader />` nav so it cannot be clicked while waiting for the next page to load.

## Live deployment

This has been deployed to a live URL here where you can click around:

https://react-router-nested-routes-example.netlify.app/

Notice if you click on Page 1 from the home page the breadcrumb and the page content area initially say "Loading.." until the data has loaded. You can also click on the "View", "Edit" or "Parameters" button to switch between the three sub-routes. Then if you click on the "this is a link to page 2" then you will notice the PageHeader content stays with the breadcrumb and the main content showing "Loading..." once again until the data is loaded. One the data has been loaded for all three pages the change now become instant with no UI flicker or re-rendering of the layout.

![Live demo of the steps to show nested routing at work](images/CleanShot 2023-04-26 at 14.24.41.gif)
