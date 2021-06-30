/*!

 =========================================================
 * Nuxt Black Dashboard - v1.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/nuxt-black-dashboard
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
export default {
  /*
   ** Headers of the page
   */
  head: {
    title: "Bonzo Dashboard",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: process.env.npm_package_description || "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css" },
    ],
    bodyAttrs: {
      class: "white-content", // Add `white-content` class here to enable "white" mode.
    },
  },
  router: {
    linkExactActiveClass: "active",
    middleware: ["auth"],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["assets/css/demo.css", "assets/css/nucleo-icons.css", "assets/sass/black-dashboard.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [`~/plugins/dashboard-plugin.js`],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "nuxt-i18n", "@nuxtjs/axios", "@nuxtjs/auth-next"],
  axios: {
    baseURL: "http://localhost:3000/api",
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "ar",
        file: "ar.js",
      },
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "en",
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },
  serverMiddleware: ["~/api/index.js"],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/authenticate-user", method: "post", propertyName: "token" },
          logout: true, //{ url: "/logout", method: "delete" },
          user: { url: "/user-info", method: "get", propertyName: "data.attributes" },
        },
        // tokenRequired: true,
        tokenType: "",
      },
    },
    redirect: {
      login: "/login", // User will be redirected to this path if login is required
      logout: "/", // User will be redirected to this path if after logout, current route is protected
      home: "/", // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },
};
