# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

### Running the Application

1. Open a terminal and change to the frontend directory:
   ```sh
   cd noteease-3502-4e6cec93/notes_app_frontend
   ```

2. Install dependencies (if you have not already):
   ```sh
   npm install
   ```

3. Start the application:
   ```sh
   npm start
   ```

   This will run the app in development mode.
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Troubleshooting

- **npm cannot find `package.json` or gives `ENOENT`:**
  - Make sure you are in the correct directory. The commands must be run inside:
    ```
    noteease-3502-4e6cec93/notes_app_frontend
    ```
  - You should see a `package.json` file in the above directory (`ls package.json` should show the file).
  - If running automated scripts, verify their `cd`/working directory points to the correct folder.

- **Directory not found errors:**
  - Ensure the folder structure is not renamed or moved. The default expected structure is:
    ```
    noteease-3502-4e6cec93/
        notes_app_frontend/
            package.json
            src/
            ...
    ```
  - If you are in the workspace root, use `cd notes_app_frontend`.

- **Other issues:**
  - If dependencies are missing, run `npm install` before starting.
  - Still having issues? Check your Node version and permissions.

---

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

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
