# flight-search-assignment

A flight search application where users can search for a flight based on the given airport.

It is built as a [React](https://reactjs.org/) single-page application. It uses [Vite](https://vitejs.dev/) for serving a development environment and bundling the assets for production. Any browser requests that will be made to `/flights.json` will be serving a static JSON file, but as if it would be a API enpdoint.

## Getting Started

To run the application locally, you can checkout the repository locally and run the following in the root.

```bash
npm install
npm start
```

This will install any required dependencies and start up the development server. When everything is successfully started, you will prompted with a message that the application is ready at `http://127.0.0.1:5173/`.

### Building

To build the assets for production, you can run the following.

```bash
npm run build
```

### Testing

The application can be tested using [Cypress](https://www.cypress.io/). It will test all features in a browser as if a user would act with the application.

```
npm run test
```

### Linting

The application uses [Typescript](https://www.typescriptlang.org/). To check for any errors, you can run the following.

```bash
npm run lint
```
