import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ZapConfig, ZapTheme, provideZapOptions } from 'zap';

import { routes } from './app.routes';

const folly: ZapTheme = {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    tertiary: '#F52F57',
    quaternary: '#9CA3AF',
    success: '#04E824',
    successText: '#000000',
    warning: '#f6ad55',
    warningText: '#000000',
    error: '#e3342f',
    errorText: '#FFFFFF',
    info: '#5438DC',
    infoText: '#FFFFFF',
  },
  fontSize: {
    '7xl': '4.5rem',
    '6xl': '3.75rem',
    '5xl': '3rem',
    '4xl': '2.25rem',
    '3xl': '1.875rem',
    '2xl': '1.5rem',
    xl: '1.25rem',
    lg: '1.125rem',
    md: '1rem',
    sm: '0.875rem',
    xs: '0.75rem',
    xxs: '0.625rem',
  },
};

const ngxConfig: ZapConfig = {
  theme: localStorage.getItem('zapdemo-theme') as 'light' | 'dark', // make sure this is always set to active theme pass/  can pass folly and used later with dynamic theme
  // themeLibrary: {
  //   folly,
  // },
  components: {
    global: {
      shape: 'curve', // this will replace root
    },
    badge: {
      styles: {
        colors: {
          // dark: {
          //   bgColor: '#1877F2',
          //   textColor: '#FFFFFF',
          //   borderColor: '#1877F2',
          // },
          // light: {
          //   bgColor: '#4CB963',
          //   textColor: '#FFFFFF',
          //   borderColor: '#4CB963',
          // }
        },
        // borderRadius: '5px',
        // paddingLeft: '20px',
        // paddingRight: '20px',
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // padding: '10px 30px',
        // width: '100%',
        // height: '50px',
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // lineHeight: '5.5',
        // letterSpacing: '1px',
        // textTransform: 'uppercase',
      }
    },
    alert: {
      // shape: 'pill', // this will replace global and root
      styles: {
        colors: {
          dark: { // this is only if you want to use defautl alert, if you want to use success, error, warning, info alert then you can pass the custom alert component
            bgColor: '#1877F2',
            textColor: '#FFFFFF',
            borderColor: '#1877F2',
            dismissColor: '#FFFFFF',
            dismissHoverColor: '#C0C0C0',
          }
        },
        borderRadius: '15px',
        // lineHeight: '5.5',
        // letterSpacing: '1px',
        textTransform: 'uppercase',
      }
    },
    button: {
      // shape: 'pill', // this will replace global and root
      size: 'compact', // this will replace root
      styles: {
        // this will replace global and root and priority is given based on the order of each style passed
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // textColor: '#FFFFFF',
            // borderColor: '#1877F2',
            // bgHoverColor: '#4CB963',
            // borderHoverColor: '#4CB963',
            // textHoverColor: '#FFFFFF',
            // bgActiveColor: '#4CB963',
            // borderActiveColor: '#4CB963',
            // textActiveColor: '#FFFFFF',
            // disabledBgColor: '#A9DEF9',
            // disabledTextColor: '#4CB963',
            // disabledBorderColor: '#A9DEF9',
          },
        },
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
