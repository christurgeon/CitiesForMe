# CitiesForMe Frontend
## Requirements
To build & deploy the frontend, you must have the following installed globally 
and available on your PATH:
- [node](https://nodejs.org/en/) (recommended v15+)
- [yarn](https://www.npmjs.com/package/yarn) (recommended v.1.22+)
- [netlify-cli](https://www.npmjs.com/package/netlify-cli) (latest)

## Developing
Install dependencies: Navigate to CitiesForMe/frontend and run `yarn` to install
the package dependencies in `package.json`.

To start the local dev server, run `yarn run start`. Shortly, a local web server
will be started an daccessible on localhost port 3000.

It is recommended that you run `yarn run lint-fix` before committing any code. 
Please address any issues brought up by the linter that were not automatically
correctable.

## Bulding & Deploying for Production
To deploy the site online, you must first sign into the Netlify CLI application.
Ask Chris Maria for an access token to use the deploy tool.

Once signed in, you should make sure that `yarn run lint-fix` has been ran and 
any changes are committed and resolved.

Then run `yarn run deploy` which will create a production-optimized build of the
page and push a staging version to netlify. You can view the build at the link 
provided.

If you are satisfied with staging version, you may run `yarn run deploy-prod` to
 deploy to citiesfor.me.

## Project Structure
```
├── README.md
├── config                         # Configurations for Webpack module bundler
│   ├── webpack.common.js
│   ...
├── package.json                   # Node package specification
├── postcss.config.js              # CSS plugin loader
├── public
│   └── index.html                 # Root HTML
├── src
│   ├── App.jsx                    # App entrypoint
│   ├── CityRating.jsx             # City-rating survey page
│   ├── Homepage.jsx               # Home page
│   ├── Quiz.jsx                   # City-matching quiz page
│   ├── assets                     # Static page assets & images
│   ├── components                 # React page components
│   │   ├── AppIcon.jsx
│   │   ├── BannerImage.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ...
│   ├── contexts                   # React Context API producers
│   ├── index.jsx                  # React root entrypoint
│   ├── index.scss                 # Entrypoint for Tailwind CSS
│   ├── providers                  # JSX wrappers for the React Context API & default context values
│   └── questions                  # JSON representations of questions & question loader
│       ├── cityrating             # Questions for the city-rating survey
│       └── quiz                   # Questions for the city-matching quiz
├── tailwind.config.js             # Tailwind CSS style definitions
└── yarn.lock
```
## Development Guidelines
This app is developed in the latest React 17 style:
- Use [functional components](https://reactjs.org/docs/components-and-props.html) rather than class components
- Use the [React Context API](https://reactjs.org/docs/context.html) with the context & provider paradigm for shared states between *highly nested or numerous components*.
- Use [React Hooks](https://reactjs.org/docs/hooks-intro.html) for state within a single component
- Use [Props](https://reactjs.org/docs/components-and-props.html) and [Composition](https://reactjs.org/docs/composition-vs-inheritance.html) for passing data between *adjacent or singly nested* components.
- Use [Tailwindcss](https://tailwindcss.com/) for inline styling, avoid raw css or scss whenever possible
  - Customize tailwind in `tailwind.config.js`
- Use SVGs over static images wherever possible
- When static images are used, ensure they are JPEG compressed and optimized for web:
  - For full-screen or large banner images, compress to 1MB or less
  - For smaller images, compress to 300KB or less
  - Place the large original images in `src/assets/raw`