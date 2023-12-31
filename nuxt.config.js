import webpack from 'webpack';
import theme from './themeConfig';
import { getRoutes } from './routes';

const isDev = process.env.NODE_ENV !== 'production';

export default {
  css: ['@/assets/css/styles.scss'],
  components: [
    '~/components/',
    '~/components/Core/Atoms',
    '~/components/Core/Organisms',
    '~/components/core/molecules',
  ],
  head: {
    title: 'Vue Storefront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [
      {
        hid: 'tawk.to',
        src: 'https://embed.tawk.to/5ddbc740d96992700fc91c33/default',
        defer: true,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin',
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap',
        as: 'style',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap',
        media: 'print',
        onload: "this.media='all'",
      },
    ],
  },
  /* googleFonts: {
    families: {
      Montserrat: true,
      Lato: true,
      wght: [200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap'
  }, */
  router: {
    extendRoutes(routes) {
      getRoutes(`${__dirname}`).forEach((route) => routes.unshift(route));
    },
    middleware: ['checkout'],
  },
  pwa: {
    meta: {
      name: 'Copia Kenya',
      theme_color: '#fff',
      lang: 'en',
      description: 'Copia',
      theme_color: '#fff',
    },
    icon: {
      source: '/logo.png',
      fileName: 'logo.png'
    },
    manifest: {
      name: 'Copia Kenya',
      description: 'Copia',
      short_name: 'Copia',
      lang: 'en'
    },
  },
  device: {
    refreshOnResize: true,
  },
  loading: { color: '#fff' },
  plugins: [
    '~/plugins/getImage.ts',
    /*
    '@/plugins/tawk-chat.js' */
  ],
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@nuxtjs/pwa',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/web-vitals',
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        performance: {
          httpPush: true,
        },
        // @core-development-only-start
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/odoo', '@vue-storefront/core'],
          prod: ['@vue-storefront/odoo', '@vue-storefront/core'],
        },
      },
    ],
    // @core-development-only-start
    [
      '@vue-storefront/nuxt-theme',
      {
        routes: false,
      },
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/odoo/nuxt', {}],
  ],
  publicRuntimeConfig: {
    theme,
    baseURL:
      process.env.PUBLIC_PATH ||
      process.env.BASE_URL ||
      'https://odoodev.copia.odoogap.com/',
  },
  modules: [
    '@nuxtjs/pwa',
    'nuxt-precompress',
    '@nuxt/image',
    '@vue-storefront/middleware/nuxt',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    ['nuxt-gmaps',{
      key: 'AIzaSyBpYWwyxGQWQoV1LS_MZdDMiv0AzTHOb0c'
    }],
    [
      '~/helpers/cache/nuxt',
      {
        invalidation: {
          endpoint: '/cache-invalidate',
          key: '0ead60c3-d118-40be-9519-d531462ddc60',
          handlers: ['./helpers/cache/defaultHandler'],
        },
        driver: [
          './helpers/cache.js',
          {
            isDev,
            redis: {
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
              password: process.env.REDIS_PASSWORD,
              defaultTimeout: 86400,
            },
          },
        ],
      },
    ],
  ],
  nuxtPrecompress: {
    enabled: !isDev,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'DE', label: 'Germany' },
    ],
    currencies: [
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' },
      { name: 'KES', label: 'Xelim queniano' },
    ],
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en',
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'KES',
            currencyDisplay: 'symbol',
          },
        },
        de: {
          currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
          },
        },
      },
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale',
    },
  },
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {
        paths: [process.cwd()],
      }),
    ],
  },
  build: {
    extractCSS: !isDev,
    optimizeCSS: !isDev,
    parallel: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false,
      },
    },
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || '',
        }),
      }),
    ],
  },
};
