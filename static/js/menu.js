    export const menus = [
      {
        id: '2',
        title: '我的模板客',
        path: '/myMBK/employer/task/list.html',
        moduleName: 'myMBK',
        children: [{
            id: '2-1',
            title: '我是雇主',
            children: [{
                id: '2-1-1',
                title: '我的任务',
                path: '/myMBK/employer/task/list.html',
                moduleName: 'myMBKemployer'
              },
              {
                id: '2-1-3',
                title: '我的站点',
                path: '/myMBK/employer/station/list.html',
                moduleName: 'myMBKserver'
              },
              {
                id: '2-1-5',
                title: '我的订单',
                path: '/myMBK/employer/order/list.html',
                moduleName: 'myMBKorder'
              },
              {
                id: '2-1-6',
                title: '发票管理',
                path: '/',
                moduleName: 'myMBKserver'
              },
            ]
          },
          {
            id: '2-2',
            title: '我是服务商',
            children: [{
                id: '2-2-1',
                title: '我竞标的任务',
                path: '/myMBK/facilitator/accept/list.html',
                moduleName: 'myMBKattention'
              },
              {
                id: '2-2-2',
                title: '我的站内信',
                path: '/myMBK/facilitator/follow/list.html',
                moduleName: 'myMBKattention'
              },
            ]
          },
          {
            id: '2-3',
            title: '我的关注',
            children: [{
                id: '2-3-1',
                title: '关注的店铺',
                path: '/',
                moduleName: 'myMBKattention'
              },
              {
                id: '2-3-2',
                title: '关注的服务',
                path: '/',
                moduleName: 'myMBKattention'
              }
            ]
          },
        ]
      },
      {
        id: '3',
        title: '店铺管理',
        path: '/shop/shopBase/onsaleServer.html',
        moduleName: 'shop',
        children: [{
          id: '3-1',
          title: '店铺基本设置',
          children: [{
              id: '3-1-1',
              title: '商铺设置',
              path: '/shop/shopBase/shopSetting.html',
              moduleName: 'shopShopBase',
            },
            {
              id: '3-1-2',
              title: '出售服务管理',
              path: '/shop/shopBase/onsaleServer.html',
              moduleName: 'shopShopBase',
            },
            {
              id: '3-1-3',
              title: '案例管理',
              path: '/shop/shopBase/newServer.html',
              moduleName: 'shopShopBase',
            },
            {
              id: '3-1-4',
              title: '公司新闻',
              path: '/shop/shopBase/companyNews.html',
              moduleName: 'shopShopBase',
            },
            {
              id: '3-1-5',
              title: '行业资讯',
              path: '/shop/shopBase/industryInfor.html',
              moduleName: 'shopShopBase',
            },
            {
              id: '3-1-6',
              title: '我参与的任务',
              path: '/shop/shopBase/myJoin.html',
              moduleName: 'shopShopBase',
            }
          ]
        }, ]
      },

      {
        id: '4',
        title: '交易管理',
        path: '/',
        children: [{
          id: '1-1',
          title: '我是雇主',
          children: [{
            id: '1-1-1',
            title: '我发布的任务',
            path: '/'
          }]
        }]
      },
      {
        id: '5',
        title: '我的服务商',
        path: '/',
        children: [{
          id: '1-1',
          title: '我是雇主',
          children: [{
            id: '1-1-1',
            title: '我发布的任务',
            path: '/'
          }]
        }]
      },
      {
        id: '6',
        title: '费用中心',
        path: '/',
        children: [{
          id: '1-1',
          title: '我是雇主',
          children: [{
            id: '1-1-1',
            title: '我发布的任务',
            path: '/'
          }]
        }]
      },
      {
        id: '7',
        title: '账户中心',
        path: '/account/base/baseInfo.html',
        moduleName: 'account',
        children: [{
            id: '7-1',
            title: '基本资料',
            children: [{
                id: '7-1-1',
                title: '基本信息',
                path: '/account/base/baseInfo.html',
                moduleName: 'accountBase',
              },
              {
                id: '7-1-2',
                title: '历史证书',
                path: '/account/base/certificate.html',
                moduleName: 'accountBase',
              }
            ]
          },
          {
            id: '7-2',
            title: '账号认证',
            children: [{
                id: '7-2-1',
                title: '邮箱认证',
                path: '/account/authentication/email/mailAuth.html',
                moduleName: 'accountAuthentication',
              },
              {
                id: '7-2-2',
                title: '手机认证',
                path: '/account/authentication/mobileAuth.html',
                moduleName: 'accountAuthentication',
              },
              {
                id: '7-2-3',
                title: '实名认证',
                path: '/account/authentication/realnameAuth.html',
                moduleName: 'accountAuthentication',
              },
              {
                id: '7-2-4',
                title: '银行卡认证',
                path: '/account/authentication/bankAuth.html',
                moduleName: 'accountAuthentication',
              }
            ]
          },
          {
            id: '7-3',
            title: '密码修改',
            children: [{
                id: '7-3-1',
                title: '登录密码修改',
                path: '/',
                moduleName: 'accountBase',
              },
              {
                id: '7-3-2',
                title: '支付密码修改',
                path: '/',
                moduleName: 'accountBase',
              },
              {
                id: '7-3-3',
                title: '签署密码修改',
                path: '/',
                moduleName: 'accountBase',
              },
            ]
          },
          {
            id: '7-4',
            title: '安全设置',
            children: [{
                id: '7-4-1',
                title: '手机、邮箱绑定',
                path: '/',
                moduleName: 'accountBase',
              },
              {
                id: '7-4-2',
                title: '第三方账号绑定',
                path: '/',
                moduleName: 'accountBase',
              }
            ]
          },
          {
            id: '7-5',
            title: '等级评定',
            children: [{
              id: '7-5-1',
              title: '我的等级',
              path: '/',
              moduleName: 'accountBase',
            }]
          },
          {
            id: '7-6',
            title: '会员权益',
            children: [{
              id: '7-6-1',
              title: '会员权益信息',
              path: '/',
              moduleName: 'accountBase',
            }]
          }
        ]
      },
      {
        id: '8',
        title: '客户服务',
        path: '/',
        children: [{
          id: '1-1',
          title: '我是雇主',
          children: [{
            id: '1-1-1',
            title: '我发布的任务',
            path: '/'
          }]
        }]
      },
      // {
      //   id: '9',
      //   title: '工作台',
      //   path: '/workplatform/mySite/site/list.html',
      //   moduleName: 'workplatform',
      //   children: [{
      //       id: '9-1',
      //       title: '我的站点',
      //       icon: '/img/mbk/icon_zhan.png',
      //       children: [{
      //         id: '9-1-1',
      //         title: '开通的站点',
      //         path: '/workplatform/mySite/site/list.html',
      //         moduleName: 'workplatformMySite'
      //       }]
      //     },
      //     {
      //       id: '9-2',
      //       title: '授权站点',
      //       icon: '/img/mbk/icon_shou.png',
      //       children: [{
      //         id: '9-2-1',
      //         title: '被授权站点',
      //         path: '/workplatform/authSite',
      //         moduleName: 'workplatformAuthSite'
      //       }]
      //     },
      //     {
      //       id: '9-3',
      //       title: '代维站点',
      //       icon: '/img/mbk/icon_wei.png',
      //       children: [{
      //         id: '9-3-1',
      //         title: '承接站点',
      //         path: '/workplatform/undertakeSite',
      //         moduleName: 'workplatformUndertakeSite'
      //       }]
      //     },
      //   ]
      // },
      {
        id: '10',
        title: '消息管理',
        path: '/message/message/stationNews/list.html',
        moduleName: 'message',
        children: [{
          id: '10-1',
          title: '消息管理',
          children: [{
            id: '10-1-1',
            title: '站内信',
            path: '/message/message/stationNews/list.html'
          }]
        }]
      },
    ]
