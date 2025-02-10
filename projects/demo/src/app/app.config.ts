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
      },
    },
    alert: {
      // shape: 'pill', // this will replace global and root
      styles: {
        // colors: {
        //   dark: { // this is only if you want to use defautl alert, if you want to use success, error, warning, info alert then you can pass the custom alert component
        //     bgColor: '#1877F2',
        //     textColor: '#FFFFFF',
        //     borderColor: '#1877F2',
        //     dismissColor: '#FFFFFF',
        //     dismissHoverColor: '#C0C0C0',
        //   }
        // },
        // borderRadius: '15px',
        // lineHeight: '5.5',
        // letterSpacing: '1px',
        // textTransform: 'uppercase',
      },
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
    chip: {
      shape: 'pill', // this will replace global and root
      // size: 'compact', // this will replace root
      styles: {
        // this will replace global and root and priority is given based on the order of each style passed
        // colors: {
        //   dark: {
        //     bgColor: '#1877F2',
        //     textColor: '#FFFFFF',
        //     borderColor: '#1877F2',
        //     bgHoverColor: '#4CB963',
        //     borderHoverColor: '#4CB963',
        //     textHoverColor: '#FFFFFF',
        //     dismissColor: '#FFFFFF',
        //     dismissHoverColor: '#C0C0C0',
        //   },
        // },
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
    dialog: {
      shape: 'curve', // this will replace global and root
      styles: {
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // textColor: '#FFFFFF',
            // borderColor: '#1877F2',
            // titleColor: '#FFFFFF',
            // dismissColor: '#FFFFFF',
            // dismissHoverColor: '#C0C0C0',
            // primaryBtnBgColor: '#4CB963',
            // primaryBtnTextColor: '#FFFFFF',
            // secondaryBtnBgColor: '#FFFFFF',
            // secondaryBtnTextColor: '#4CB963',
            // secondaryBtnBgHoverColor: '#4CB963',
            // secondaryBtnTextHoverColor: '#FFFFFF',
          },
        },
        borderRadius: '15px',
        // titleFontSize: '1.5rem',
        // titleFontWeight: 'bold',
        // titleLineHeight: '2',
        // titleLetterSpacing: '1px',
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // lineHeight: '2',
        // letterSpacing: '1px',
        // dismissFontSize: '1.5rem',
        // dismissFontWeight: 'bold',
        // dismissLineHeight: '2',
        // dismissLetterSpacing: '1px',
        // primaryBtnFontSize: '1.5rem',
        // primaryBtnFontWeight: 'bold',
        // primaryBtnLineHeight: '2',
        // primaryBtnLetterSpacing: '1px',
        // secondaryBtnFontSize: '1.5rem',
        // secondaryBtnFontWeight: 'bold',
        // secondaryBtnLineHeight: '2',
        // secondaryBtnLetterSpacing: '1px',
        // primaryBtnBorderRadius: '15px', // by default border raidus is set by global or btn style,
        // secondaryBtnBorderRadius: '15px', // by default border raidus is set by global or btn style
      },
    },
    modal: {
      // shape: 'pill', // this will replace global and root
      styles: {
        // this will replace global and root and priority is given based on the order of each style passed
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // borderColor: '#1877F2',
            // titleColor: '#FFFFFF',
            // dismissColor: '#FFFFFF',
            // dismissHoverColor: '#C0C0C0',
          },
        },
        // borderRadius: '15px',
        // paddingLeft: '30px',
        // paddingRight: '30px',
        // paddingTop: '30px',
        // paddingBottom: '30px',
        // padding: '40px 40px',
        // width: '100%',
        // height: '50px',
      },
    },
    input: {
      // shape: 'pill', // this will replace global and root
      // size: 'compact', // this will replace root
      styles: {
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // textColor: '#FFFFFF',
            // borderColor: '#181818',
            // labelColor: '#FFFFFF',
            // placeholderColor: '#404040',
            // borderFocusColor: '#FFFFFF',
            // bgFocusColor: '#FFFFFF',
            // textFocusColor: '#FFFFFF',
          },
        },
        // borderRadius: '15px',
        // paddingLeft: '20px',
        // paddingRight: '20px',
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // padding: '10px 30px',
        // labelFontSize: '1.5rem',
        // labelFontWeight: 'bold',
        // labelLineHeight: '2',
        // labelLetterSpacing: '1px',
        // fontSize: '1.5rem',
        // fontWeight: 'bold',
        // lineHeight: '2',
        // letterSpacing: '1px',
        // placeholderFontSize: '1.8rem',
        // width: '100%',
        // height: '50px',
      },
    },
    checkbox: {
      // shape: 'flat', // this will replace global and root
      styles: {
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // textColor: '#1877F2',
            // borderColor: '#1877F2',
            // bgCheckedColor: '#4CB963',
            // textCheckedColor: '#4CB963',
            // labelColor: '#4CB963',
            // labelHoverColor: '#1877F2',
          },
        },
        // borderRadius: '15px',
        // paddingLeft: '20px',
        // paddingRight: '20px',
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // height: '200px',
        // width: '20px',
        // fontSize: '1.5rem',
      },
    },
    radio: {
      styles: {
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // borderColor: '#1877F2',
            // bgCheckedColor: '#4CB963',
            // textCheckedColor: '#4CB963',
            // labelColor: '#4CB963',
            // labelHoverColor: '#1877F2',
          },
        },
        // borderRadius: '15px',
        // paddingLeft: '20px',
        // paddingRight: '20px',
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // height: '200px',
        // width: '20px',
        // fontSize: '1.5rem',
      },
    },
    textarea: {
      // shape: 'flat', // this will replace global and root
      styles: {
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // textColor: '#FFFFFF',
            // borderColor: '#4CB963',
            // bgFocusColor: '#4CB963',
            // borderFocusColor: '#4CB963',
            // ringFocusColor: '#FFFFFF',
            // textFocusColor: '#FFFFFF',
            // labelColor: '#4CB963',
          },
        },
      },
    },
    toggle: {
      styles: {
        colors: {
          dark: {
            // bgColor: '#1877F2',
            // rollerColor: '#1877F2',
            // rollerOnColor: '#4CB963',
          },
        },
        // height: '10px',
        // width: '40px',
        // rollerHeight: '20px',
        // rollerWidth: '20px',
      },
    },
    accordion: {
      styles: {
        colors: {
          dark: {
            // headerBgColor: '#1877F2',
            // headerTextColor: '#4CB963',
            // itemBorderColor: '#1877F2',
            // contentTextColor: '#1877F2',
            // contentBgColor: '#4CB963',
          },
        },
        // headerPaddingTop: '2.75rem',
      },
    },
    select: {
      // shape: 'flat', // this will replace global and root
      // size: 'compact', // this will replace root
    }
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideZapOptions(ngxConfig),
  ],
};
