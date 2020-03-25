# Hey there! This is Popoeshnick!


## File structure:
```
  build/ - deploy ready data. Creating by running script npm run build
  configs/ - project configuration files
  public/ - website public files
  scripts/ - scripts for building, running and testing project
  src/ - source code
    components/ - react silly components
    constants/
    routes/ - routes
    utils/
  stub/ - local mock server
```

## For local development you need:
- NodeJs version >= 8 (use actual LTS version btw)
- npm version >= 6 or yarn version ~1.22.x

## For install dependencies run 

`npm install`

or

`yarn install`

## There are two ways to start app:
- use __npm run dev__ for standalone work with stubs express server
- use __npm start__ for launch webpack dev-server only. Be sure your backend server is running and listening 5000 port

Open localhost:3000 in you browser. All requests will be proxying to localhost:5000.

You can find all credentials of local user in stubs/constants.js. To discard current user session you can clear cookies or use "logout" method when it will be implemented.

## Other commands are below (this piece of text is served from a react-create-app boilerplate)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run dev`

Starts app with mock backend server Express served at localhost:4000.

### `npm run analyze`

Analyze source-maps of the bundle.
To try it change in the `.env` file parameter `GENERATE_SOURCEMAP` to `true` and run `npm run build` then `npm run analyze`

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
