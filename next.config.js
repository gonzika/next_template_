const path = require('path')
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.module.rules[2].oneOf.forEach((one) => {
      if (!`${one.issuer?.and}`.includes('_app')) return;
      one.issuer.and = [path.resolve(__dirname)];
    });

    return config;
  },
  i18n: {
    locales: ['en', 'ua'],
    defaultLocale: 'en',
    localeDetection: false,  // Disabling Automatic Locale Detection
  },

  rewrites() {
    return {
      beforeFiles: [
        // if the host is `app.acme.com`,
        // this rewrite will be applied
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'memory.npw.app',
            },
          ],
          destination: '/memory/:path*',
        },
      ]
    }
  }
});

// module.exports = {
//   webpack: (config) => {
//     config.experiments = {
//       topLevelAwait: true
//     };
//     return config;
//   },
// };

// module.exports = {
//   compiler: {
//     // Enables the styled-components SWC transform
//     styledComponents: true
//   }
// }