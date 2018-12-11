export const  menus=[
    {
        id:'1',
        title:'管理员',
        path:'/admin/admin/serverAudit/list.html',
        moduleName:'admin',
        children:[
            {
                id: '1-1',
                title: '管理员管理',
                children: [{
                    id: '1-1-1',
                    title: '服务审核',
                    path: '/admin/admin/serverAudit/list.html',
                    moduleName: 'myMBKadmin'
                },
                {
                    id: '1-1-2',
                    title: '实名认证',
                    path: '/admin/admin/realnameAuth/list.html',
                    moduleName: 'myMBKadmin'
                },
                {
                    id: '1-1-3',
                    title: '提现审核',
                    path: '/admin/admin/cash/list.html',
                    moduleName: 'myMBKadmin'
                },
                {
                    id: '1-1-4',
                    title: '会员管理',
                    path: '/admin/admin/member/list.html',
                    moduleName: 'myMBKadmin'
                },
                {
                    id: '1-1-5',
                    title: '操作记录',
                    path: '/admin/admin/record/list.html',
                    moduleName: 'myMBKadmin'
                }
                ]
            }
        ]
    },
    {
        id:'2',
        title:'订单管理',
        path:'/admin/order/uppay.html',
        moduleName:'adminOrder',
        children:[
            {
                id:'2-1',
                title:'订单',
                children:[
                    {
                        id:'2-1-1',
                        title:'未支付',
                        path:'/admin/order/uppay.html',
                        moduleName:'admin'
                    },
                    {
                        id:'2-1-3',
                        title:'已支付', 
                        path:'/admin/order/paid.html', 
                        moduleName:'admin'
                    },
                ] 
            }
        ]
    },
    {
        id:'2',
        title:'站点管理',
        path:'/myMBK/employer/releaseTask.html',
        moduleName:'myMBK',
        children:[
            {
                id:'2-1',
                title:'我是雇主',
                children:[
     
                ] 
            }
        ]
    },
    {
        id:'2',
        title:'用户管理',
        path:'/myMBK/employer/releaseTask.html',
        moduleName:'myMBK',
        children:[
            {
                id:'2-1',
                title:'我是雇主',
                children:[
     
                ] 
            }
        ]
    },
]