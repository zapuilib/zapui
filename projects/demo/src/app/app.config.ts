import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ZapConfig, provideZapOptions } from 'zap';

import { routes } from './app.routes';

const ngxConfig: ZapConfig = {
  components: {
    global: {
      shape: 'curve', // this will replace root
    },
    button: {
      shape: 'pill', // this will replace global and root 
      size: 'base', // this will replace root
      styles: { // this will replace global and root and priority is given based on the order of each style passed
        // bgColor: '#A9DEF9',
        // textColor: '#4CB963',
        // borderColor: '#A9DEF9',
        // bgHoverColor: '#4CB963',
        // bgActiveColor: '#4CB963',
        // borderActiveColor: '#4CB963',
        // textActiveColor: '#4CB963',
        // borderRadius: '15px',
        // paddingLeft: '20px',
        // paddingRight: '20px',
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // padding: '10px 30px',
        // width: '100%',
        // height: '50px',
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // lineHeight: '2',
        // letterSpacing: '1px',
        // textTransform: 'uppercase',
        // disabledBgColor: '#A9DEF9',
        // disabledTextColor: '#4CB963',
        // disabledBorderColor: '#A9DEF9',
      },
    },
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideZapOptions(ngxConfig),
  ],
};
