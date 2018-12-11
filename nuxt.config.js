
module.exports = {
  head: {
    title: '模板客',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '{{escape description }}'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: '/common/common.css'
      } 
    ],
    // __dangerouslyDisableSanitizers: ['script']
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  plugins: [
    {src: '~plugins/ElementUI',ssr: true},
    {src: '~plugins/ueditor.js', ssr: false},
    {src: '~plugins/vueJsonp.js', ssr: true},
    {src: '~plugins/test', ssr: true}
  ],
  css: [
    { src: '~static/common/element-variables.scss', lang: 'scss' } // 指定 scss 而非 sass
  ],
  generate:{
    dir:'../MuBanKe/MuBanKe_Core.Web/wwwroot',
    subFolders:false
  },
  router:{
    middleware: 'auth',
    extendRoutes (routes, resolve) {
      routes.map(item=>{
        if(item.path == '/'){
          item.redirect = '/myMBK/employer/home.html'
        }else{
          item.path = item.path+'.html'
        }
      }) 
    } 
  },
  build: {
    /*
     ** Run ESLint on save
     */
    babel: {
      "ignore": [
        "./static/js/utf8-ueditor/ueditor.all.js"
      ],
    },
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push(...[{
          enforce: 'pre', 
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        }, {
          test: /\.(gif|png|jpe?g|svg)$/i,  
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              },
            },
          ], 
        }])
      }
    },
    vendor: ['element-ui'] //防止打包多次
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
   
  },
  proxy: [
      [ 
        '/api', 
        { 
          target: 'http://localhost:29414', 
          pathRewrite: { '^/api' : '' }
        },
        {
          target:'http://mubanke.wx.qkk.cn',
          pathRewrite: { '^/api/v2' : '' }
        }
    ]
  ]
}
