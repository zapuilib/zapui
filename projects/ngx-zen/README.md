# NgxZen

## Setup

To set up the project, follow these steps:

1. Install npm packages in the **root directory**:
   ```bash
   npm install
   ```

2. Navigate to the `projects/ngx-zen` directory and install npm packages there as well:
   ```bash
   cd projects/ngx-zen
   npm install
   ```

## Run

To run the project:

1. Navigate to `projects/ngx-zen` and build the library in watch mode:
   ```bash
   ng build --watch
   ```

2. Open a new terminal, navigate to `projects/ngx-zen-demo`, and start the demo app:
   ```bash
   cd projects/ngx-zen-demo
   npm run start
   ```

## Build Rules

- **Class Name Format:** Use the following format for class names:
  ```
  __ngx__zen__<some__name__here>
  ```
- **No Inline Styling:** Avoid using inline styles.
- **Dynamic Styling:** Use `ngStyle` to handle styles such as colors, font sizes, etc., to ensure all styling is sourced from the global configuration.

## Deploy a New Version

Before deploying a new version, complete the following checklist:

1. **Update the Version:**
   - Navigate to `projects/ngx-zen/package.json` and update the version number.

2. **Update the Changelog:**
   - Open `CHANGELOG.md` in the same directory.
   - Add details about the latest version, including changes, new features, and any relevant notes.

3. **Build the Library:**
   - Run the build command in the `projects/ngx-zen` directory:
     ```bash
     ng build
     ```

4. **Publish to NPM:**
   - Navigate to the build output directory:
     ```bash
     cd dist/ngx-zen
     ```
   - Publish the library to NPM:
     ```bash
     npm publish
     
