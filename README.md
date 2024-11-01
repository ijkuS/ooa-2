# OOA Website - Work In Progress (WIP)

OOA is a new e-commerce platform specializing in outdoor wear, launched by Joy Works, which also operates HOKA Korea.

This web development project focuses on seamlessly merging offline and online shopping experiences. It curates a diverse range of outdoor styles and lifestyle content, tackling challenges like booking limited editions, browsing personalized content, and streamlining payments. The aim is to improve the shopping experience for users, employees, and stores, positioning OOA as a leader in the outdoor lifestyle market.

![](./public/assets/ux/ooa_UX-5.jpeg)

## Table of contents

-    [Overview](#overview)

     -    [Screenshot](#screenshot)
     -    [Goal](#goal)
     -    [Links](#links)

-    [My process](#my-process)

     -    [Planning](#planning)
          -    [App UX/UI planning](#app-uxui-planning)
          -    [Basic interaction planning](#basic-interaction-planning)
          -    [Technical planning](#technical-planning)

-    [Challenges and Lessons](#challenges-and-lessons)

     -    [1. React environment with NextJS]
     -    [2. File structure setting](#2-file-structure-setting)
     -    [3. Skeleton of application (Navbar + Outlet)](#3-skeleton-of-application-navbar--outlet)
     -    [4. Authentication with Firebase](#4-authentication-with-firebase)
     -    [5. Login & logout functions with UI (Navbar button)](#5-login--logout-functions-with-ui-navbar-button)

     -    [The difference of Argument, Parameter, Constructor, Property](#the-difference-of-argument-parameter-constructor-property)
     -    [git Tips: Delete a file from a Git repository](#git-tips-delete-a-file-from-a-git-repository)
     -    [SVG icon transformation](#svg-icon-transformation)

-    [Future Improvements](#future-improvements)
-    [Useful resources](#useful-resources)
-    [Author](#author)
-    [Acknowledgments](#acknowledgments)

## Overview

-    This project began as a client request, and I am now recreating it as a new version to practice React.
-    This project serves as an exercise to deepen familiarity with React and object-oriented programming (OOP).
-    The project is designed as a web application.

### Goal

User types: (A) Admins / (M) Memebers(Logged-in user) / (N) Non-members (users not logged in)

Users should be able to:

**Must have**

General

-    [ ] See all products on the main homepage (A, M, N)
-    [ ] See all product details (A, M, N)
     -    [ ] Add to bag button (A, M)
-    [ ] LocalStorage

SignUp & Bag(cart)

-    [ ] Login/Logout/SignUp (A, M, N)
-    [ ] Bag (A, M)
     -    [ ] Add products in a cart

Add & Edit(A)

-    [ ] Add new product data
-    [ ] Edit existing product data

**Good to have**

-    [ ] Search for a keyword
-    [ ] Toggle the color scheme between light and dark mode

### Links

-    gitHub URL: [Noej Ijkus](https://github.com/ijkuS)
-    Live Site URL:

## My process

### Planning

#### App UX/UI Planning

UX/UI Strategy
![](./public/assets/ux/ooa_UX-1.jpeg)
![](./public/assets/ux/ooa_UX-2.jpeg)
![](./public/assets/ux/ooa_UX-3.jpeg)
![](./public/assets/ux/ooa_UX-4.jpeg)

**Large screen UI**

-    Landing page

```
-    header (navbar)
     -   Logo -> onclick: homepage

     -   New Arrivals
     -   Products
     -   Brands
     -   Sales

     -   Edit -> onclick: /products/addNew -- (A only)
     -   Bag -> onclick: /cart -- (A, L)
     -   User info (profile icon + name) -- (A, L)
     -   SignUp(Login/Logout)

-    main (Outlet part)
     -   banners or movieclips
     -   product card grid layout

-    footer
     -    brand and website information
```

-    Detail page

for logged-in users and visitors

```
-    Outlet part
     -   left: product images
     -   right:
         -  product name
         -  category
         -  price
         -  description
         -  option buttons
         -  decalaimer
         -  button: Add to bag

-    footer
     -    brand and website information
```

-    Add new product / Edit existing product

for admins

```
-    Outlet part
     -   left: multiple image preview of chosen file
     -   right:
         -  input: choose files (multiple files)
         -  input: product name
         -  input: price
         -  input: Category
         -  input: Description
         -  input: Options(separted by commas) / or set a dropdown menu
         -  button: Click to Upload
```

**Mobile UI**

```
* mobile UI

-    header / navbar
     -   Logo
     -   Quick Menu
         -     Search
         -     Bag
         -     Hamburger icon
               -     New Arrivals
               -     Brands
               -     Categories
               -     Features
               -     News
               -     About
               -     Sales

               -     Customer service
               -     My Account

-    main
     -    list of products
-    footer
     -    brand and website information
```

#### Basic interaction planning

-    Site URL structure

```
   - /   -> <home>
   - /products   -> <AllProducts>
   - /products/addnew -> <AddProducts> for admins
   - /products/[productId] -> <ProductDetail>
   - /carts -> <Cart>
```

-    Navbar + Outlet structure
     [Next.js: Route groups](https://nextjs.org/blog/layouts-rfc#multiple-data-fetching-methods-in-a-route:~:text=update%20the%20RFC.-,Route%20Groups,-The%20hierarchy%20of)

```
-    Click products button

-    Click Login button
      → popup input window (dialog)

```

#### Technical planning

-    Semantic HTML5 markup
-    CSS custom properties
-    Mobile-first workflow
-    [React](https://react.dev/)
-    [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

-    [Tanstack Router](https://tanstack.com/router/latest)
-    [React Router DOM](https://www.npmjs.com/package/react-router-dom)
-    [React Router](https://reactrouter.com/en/main)
-    [Firebase](https://firebase.google.com/)
     -    authentification
     -    database

## Challenges and Lessons

### 1. React environment with NextJS

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

run the development server:

```bash
npm run dev
```

### 2. File structure setting

Details: [Basic interaction planning](#basic-interaction-planning)

### 3. Skeleton of application (Navbar + Outlet)

-    **Create Outlet layout Without React router dom**

Issue: since react-router-dom is not working Next.js,

**Solution**: I used the existing features,[Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts), in Next.js.

Without `_app.js`, the Navbar+Outlet layout does not work. Layouts are nested by default.

Reference:
[Nested layouts and routes in Next.js](https://www.youtube.com/watch?v=69-mnojSa0M)
[Next.js: Nesting layout. ](https://nextjs.org/blog/layouts-rfc#:~:text=inside%20dashboard.-,Nesting%20Layouts,-Layouts%20are%20nested)
[Next.js: Route groups](https://nextjs.org/blog/layouts-rfc#multiple-data-fetching-methods-in-a-route:~:text=update%20the%20RFC.-,Route%20Groups,-The%20hierarchy%20of)
[Next.js: Data fetching](https://nextjs.org/blog/layouts-rfc#multiple-data-fetching-methods-in-a-route:~:text=the%20children%20prop.-,Data%20fetching,-It%20will%20be)
Q. Will it work for login logout authentication to handle all site, not just layout?

-    Initial page structure and file tree

```
src
 ┣ app
 ┃ ┣ components
 ┃ ┃ ┗ Navbar.jsx
 ┃ ┣ dashboard
 ┃ ┃ ┗ layout.js
 ┃ ┣ fonts
 ┃ ┃ ┣ GeistMonoVF.woff
 ┃ ┃ ┗ GeistVF.woff
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.js
 ┃ ┣ page copy.js
 ┃ ┗ page.js
 ┗ pages
 ┃ ┣ _app.js
 ┃ ┣ add-new-page.jsx
 ┃ ┣ all-products.jsx
 ┃ ┣ cart.jsx
 ┃ ┣ notfound.jsx
 ┃ ┗ product-detail.jsx

```

### 4. Authentication with Firebase

-    Install [Firebase](https://firebase.google.com/) -> Create `fbase.js`(src/app/api/fbase.js)

     -    **Important**: Refrain from using the name "firebase.js." to avoid potential conflicts with other files

-    Build firebase authentication following the [guide](https://firebase.google.com/docs/build?authuser=0&%3Bhl=ko&hl=ko&_gl=1*1idhrwr*_up*MQ..*_ga*NTQwNTQwNTgzLjE3Mjk4OTg5NDE.*_ga_CW55HF8NVT*MTcyOTkwMTYxMS4yLjEuMTcyOTkwMjgwOS4xNC4wLjA.)

-    `fbase.js`: Protect important keys putting in `.env` (apiKey, authDomain, databaseURL, projectId, appId)

     -    function login / logout
     -    [Manage Users in Firebase](https://firebase.google.com/docs/auth/web/manage-users?hl=en&authuser=0&_gl=1*1t9v0u8*_up*MQ..*_ga*MTkwMjg3OTI4NS4xNzMwMzQ4NDA3*_ga_CW55HF8NVT*MTczMDM0ODQwNy4xLjAuMTczMDM0ODQwNy4wLjAuMA..#get_the_currently_signed-in_user)
     -    funtion for [Authentication state](https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0&_gl=1*11jfqco*_up*MQ..*_ga*NTQwNTQwNTgzLjE3Mjk4OTg5NDE.*_ga_CW55HF8NVT*MTcyOTkwMTYxMS4yLjEuMTcyOTkwMjk0Mi4wLjAuMA..)

-    [firebase google login build document](https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0&_gl=1*1bzde14*_up*MQ..*_ga*NTQwNTQwNTgzLjE3Mjk4OTg5NDE.*_ga_CW55HF8NVT*MTcyOTkwMTYxMS4yLjEuMTcyOTkwMjk0Mi4wLjAuMA..)

-    Issue: Due the type checking of TypeScript, I had to change the firebase API into TS, need to handle better between login and logout user state.

-    **Solution**: Build authentication with email option and make interface of user data and state to handle efficiently

[Ref: Implementing Firebase auth in React js, Typescript, Vite js](https://medium.com/@sajadshafi/implementing-firebase-auth-in-react-js-typescript-vite-js-88465ac84170)
[Ref: Firebase Local Emulator Suite, createUserWithEmailAndPassword](https://firebase.google.com/docs/auth/web/start?hl=ko#web-modular-api_1)

### 5. Login & logout functions with UI (Navbar button)

### 6. Authentication - Admins (firebase realtime database)

-    User types: (A) Admins / (M) Memebers(Logged-in user) / (N) Non-members (users not logged in)
-    Create different screen layouts for three types of users.

-    Build Firebase realtime database

     -    Distinguish admins from logged-in users by storing their UID in the Firebase Realtime Database.

          -    Non-members: Only show "All Products" and "SIGN IN" buttons.

               -    Restrict access to other menu routes even if entered directly in the address bar, redirecting them to Home.
               -    Prevent access to routes after logging out by using the back button, redirecting them to Home.

          -    Members: Show "All Products," "Carts," and "SIGN OUT" buttons.

               -    Restrict access to other menu routes even if entered directly in the address bar, redirecting them to Home.
               -    Prevent access to routes after logging out by using the back button, redirecting them to Home.

          -    **Admin users**: Show all four buttons — "All Products," "Carts," "SIGN OUT," and "Add New."

-    function adminUser(user)
     To check if the logged-in user is admin

### The difference of Argument, Parameter, Constructor, Property

인자(Argument), 파라미터(Parameter, 매개변수), 생성자(Constructor), 프로퍼티(Property)

### git Tips: Delete a file from a Git repository

[Reference](https://sentry.io/answers/delete-a-file-from-a-git-repository/)

case: Remove a file or folder on the remote only

```shell
   git rm --cached unwanted-file.txt
   git commit -m "remove unnecessary files"
   git push origin main

```

case: Remove a file or folder from the local

```shell
   git rm unwanted-file.txt
   git commit -m "remove unnecessary files"
   git push origin main

```

### SVG icon transformation

-    Select the desired icon from the React-Icons site, then open developer tools to save the SVG portion.
-    Search "SVG to ICO" or "PNG to ICO" on Google.
-    Use one of the sites to convert the file to ICO format and save it.
-    If it's an SVG file, you can modify the code to set or change the color as needed.

## Future Improvements

-    Q. For API, is it okay to use JavaScript file, or need to change into TypeScript file?

Due the type checking of TypeScript, I had to change the firebase API into TS, need to handle better between login and logout user state.

[Ref: Implementing Firebase auth in React js, Typescript, Vite js](https://medium.com/@sajadshafi/implementing-firebase-auth-in-react-js-typescript-vite-js-88465ac84170)
[Ref: Implementing Firebase auth with Typescript](https://ph-biginner.tistory.com/180)

## Useful resources

**Design References**

-    [Google material3 color palette](https://m3.material.io/styles/color/static/baseline)
-    [Google material component git](https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md)
-    [Google design guidelines for developers](https://developers.google.com/assistant/interactivecanvas/design)
-    [Google Material 3](https://m3.material.io/)
-    [CSS Box shadow examples](https://getcssscan.com/css-box-shadow-examples)
-    [Google color palette](https://partnermarketinghub.withgoogle.com/brands/google-news/visual-identity/color-palette/) -[Google Design for Driving](https://developers.google.com/cars/design/automotive-os/design-system/color)
-    [TailwindCSS color palette](https://tailwindcss.com/docs/customizing-colors)
-    [material ui](https://materialui.co/colors)

**VSC Tips**

-    [Multi selections](https://code.visualstudio.com/docs/editor/codebasics)
-    VSC, Global code snippets: command palette -> snippet -> Global code snippets

command palette -> snippet -> Global code snippets
snippets.code-snippets

```json
{
	"reactFunction": {
		"prefix": "rfc",
		"body": "import React from 'react';\n\nexport default function ${1:${TM_FILENAME_BASE}}() {\n\treturn (\n\t\t<div>\n\t\t\t\n\t\t</div>\n\t);\n}\n\n",
		"description": "Creates a React Function component"
	},
	"reactStatelessImplicitReturn": {
		"prefix": "rsi",
		"body": "import React from 'react';\n\nexport const ${1:${TM_FILENAME_BASE}} = (props) => (\n\t\t\t$0\n\t);",
		"description": "Creates a React Function component"
	},
	"Import Module CSS": {
		"prefix": "si",
		"body": ["import styles from './$TM_FILENAME_BASE.module.css'"],
		"description": "Import PostCSS"
	},
	"ClassName": {
		"prefix": "cn",
		"body": ["className="],
		"description": "Adding className"
	}
	// "ClassName": {
	//     "prefix": "cn",
	//     "body": ["className={styles.$1}"],
	//     "description": "Adding className"
	// }
}
```

**Git Tips**

-    [Terminal markdown](https://github.com/Evoniuk/terminal-markdown)

## Author

-    [Noej Ijkus](https://github.com/ijkuS)
-    [email](ijkus.noej@gmail.com)

## Acknowledgments
