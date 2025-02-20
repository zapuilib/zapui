# Zap Library Workspace

To setup the application locally, run `npm install` on the root directory and go to `projects/zap` and do the same.

After that, on the `projects/zap` run `ng build zap --watch` to build the library in watch mode.

Once you're done building it, switch your directory to `projects/zap-demo/` and run `ng serve` to serve your demo application to browser.

Adding a new component

- Be consistent with the naming
- Be consistent with the format

Creating components flow
#NGX-zap

1. Create your new component in zap src/lib/components
2. Remember to export the new component in index.ts & public-api.ts

#zap-demo

1. Import the component in index.ts
2. Add the component to routing
3. Add component to sidemenu


NOTE: this will no longer be maintained (check zapuilib/zapui)
