# NgxZen Library Workspace

To setup the application locally, run `npm install` on the root directory and go to `projects/ngx-zen` and do the same.

After that, on the `projects/ngx-zen` run `ng build ngx-zen --watch` to build the library in watch mode.

Once you're done building it, switch your directory to `projects/ngx-zen-demo/` and run `ng serve` to serve your demo application to browser.

Adding a new component

- Be consistent with the naming
- Be consistent with the format

Creating components flow
#NGX-zen

1. Create your new component in ngx-zen src/lib/components
2. Remember to export the new component in index.ts & public-api.ts

#ngx-zen-demo

1. Import the component in index.ts
2. Add the component to routing
3. Add component to sidemenu
