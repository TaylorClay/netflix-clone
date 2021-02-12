### Build Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/213d0ef8-015a-4b94-b602-0e8cd4eaa23d/deploy-status)](https://app.netlify.com/sites/taylor-clay-netflix-clone/deploys)

# Overview

Check out the app: https://taylor-clay-netflix-clone.netlify.app/

<img width="645" alt="Application Preview" src="https://user-images.githubusercontent.com/8163665/107831527-d77def80-6d53-11eb-931f-812d9d988a42.png">

# Features

## Showcase

- Rotates randomly through a list of _Upcoming Movies_
- Provides the title's name and description
    - The title's name and description are truncated with an ellipsis, if necessary
        - The name is truncated at the character level
        - The description is truncated at the word level
- Provides `button` to add to MyList
- Provides `button` to open YouTube with query for target movie's trailer

## RowManager

- Supports a MyList concept, which will be the first row rendered (if any titles are in MyList)
- Dynamically loads new `Rows` based on `IntersectionObserver` logic

### Row

- Dynamically toggles a fade effect on the left/right of the row based on `IntersectionObserver` logic

#### Card

- Displays a poster image of the title this `Card` is meant to represent
- If the poster image is unavailable or fails to low, a text-based placeholder is rendered instead
    - The title's name is truncated with an ellipsis, if necessary
        - Truncation is done at the character count level
- Supports add to / remove from MyList button 
  - Button content flexes based on whether the title is already in MyList (add / remove)

## Footer

- "Sticky" footer
- Links to my social media (LinkedIn, Twitter, GitHub) are provided via `button`s

# Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
