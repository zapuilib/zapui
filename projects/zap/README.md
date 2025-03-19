## Getting started

Zap/UI is a comprehensive library designed to streamline the development of Angular applications with a consistent and customizable design system. It leverages the power of Tailwind CSS to provide a set of pre-designed components and utilities that can be easily integrated into your projects. Whether you're building a small project or a large-scale application, Zap UI helps you maintain a cohesive look and feel throughout your application.

- [Documentation](https://zapui.togethercreative.co.uk)

- [Discord](https://discord.com/invite/86yn9TgM)

### Getting started

1. Before you start, we strongly recommend you to setup tailwindcss in your project first. Now, install the library by using `npm i @zaplib/zapui`. Please make sure the your application is running angular `16.0.1` or higher.

2. Now, provide root configuration to the core module inside `app.config.ts`.

   ```typescript
   import { ApplicationConfig } from '@angular/core';

   import { provideZapOptions } from '@zaplib/zapui';

   export const appConfig: ApplicationConfig = {
     providers: [
       provideZapOptions(),
       // Others...
     ],
   };
   ```

3. Ready to use!
