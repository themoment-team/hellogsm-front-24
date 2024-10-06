const baseConfig = require('tailwind-config/tailwind.config');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    screens: {
      xs: '450px',

      sm: '600px',

      smxm: '750px',

      smx: '850px',

      md: '1024px',

      lg: '1440px',

      xl: '1728px',

      fhd: '1920px',

      uhd: '2160px',
    },
  },
};
