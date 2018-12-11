//竞标状态
export const BiddingStatus = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '竞标中'
    },{
        value: 1,
        label: '流标'
    },{
        value: 2,
        label: '中标'
    }
]
//合同状态
export const ContractStatus = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '雇主确认中'
    },{
        value: 1,
        label: '服务商确认中'
    },{
        value: 2,
        label: '雇主已拒绝'
    },{
        value: 3,
        label: '服务商已拒绝'
    },{
        value: 4,
        label: '合同已完成'
    }
]
//关系类型
export const CooperationType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '潜在'
    },{
        value: 1,
        label: '咨询'
    },{
        value: 2,
        label: '成交'
    }
]
//费用类型
export const CostCostType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '收入'
    },{
        value: 1,
        label: '支出'
    }
]
//交易状态
export const CostTradeState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '交易中'
    },{
        value: 1,
        label: '交易完成'
    }
]
//实付方式
export const CostRealPayType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '微信'
    },{
        value: 1,
        label: '支付宝'
    }
]
//交易类型
export const CostProjectType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '服务'
    },{
        value: 1,
        label: '站点'
    },{
        value: 2,
        label: '插件'
    },{
        value: 3,
        label: '佣金'
    },{
        value: 4,
        label: '充值'
    },{
        value: 5,
        label: '提现'
    },{
        value: 6,
        label: '退款'
    },{
        value: 7,
        label: '退积分'
    }
]
//状态
export const DeveloperCaseState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '有效'
    },{
        value: 0,
        label: '无效'
    }
]
//关注类型
export const FollowFollowType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '用户'
    },{
        value: 1,
        label: '任务'
    },{
        value: 2,
        label: '站点'
    }
]
//发票类型
export const InvoiceInvoiceType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '纸质发票'
    },{
        value: 1,
        label: '电子'
    }
]
//是否邮寄
export const InvoiceIsPost = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '邮寄'
    },{
        value: 0,
        label: '自取'
    }
]
//开票类型
export const InvoiceBillingType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '增值税专用发票'
    },{
        value: 2,
        label: '增值税普通发票'
    }
]
//发票状态
export const InvoiceInvoiceState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未开'
    },{
        value: 1,
        label: '已开'
    }
]
//是否已读
export const MessageIsRead = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '是'
    },{
        value: 0,
        label: '否'
    }
]
//状态
export const MessageState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '有效'
    },{
        value: 0,
        label: '无效'
    }
]
//短信是否发送
export const MessageIsTelSender = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未发送'
    },{
        value: 1,
        label: '已发送'
    }
]
//微信是否发送
export const MessageIsWeChatSender = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未发送'
    },{
        value: 1,
        label: '已发送'
    }
]
//邮箱是否发送
export const MessageIsEmailSender = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未发送'
    },{
        value: 1,
        label: '已发送'
    }
]
//类型
export const MessageMsgType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '站内信'
    },{
        value: 1,
        label: '开站'
    },{
        value: 2,
        label: '续费'
    },{
        value: 3,
        label: '站点到期'
    },{
        value: 4,
        label: '任务到期'
    }
]
//状态
export const MySkillState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '有效'
    },{
        value: 0,
        label: '无效'
    }
]
//交易类型
export const OrderOrderType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '服务'
    },{
        value: 1,
        label: '站点'
    },{
        value: 2,
        label: '保证金'
    },{
        value: 3,
        label: '充值'
    },{
        value: 4,
        label: '插件'
    },{
        value: 5,
        label: '其他'
    }
]
//是否有积分支付
export const OrderIsIntegralPay = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '没有'
    },{
        value: 1,
        label: '有'
    }
]
//退款状态
export const OrderIsRefund = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未申请退款'
    },{
        value: 1,
        label: '审核中'
    },{
        value: 2,
        label: '退款中'
    },{
        value: 3,
        label: '已退款'
    }
]
//实付方式
export const OrderRealPayType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '微信'
    },{
        value: 1,
        label: '支付宝'
    }
]
//订单状态
export const OrderStatus = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '待付款'
    },{
        value: 1,
        label: '已取消'
    },{
        value: 2,
        label: '未完全支付'
    },{
        value: 3,
        label: '已支付'
    }
]
//维权状态
export const SafeguardingRightsStatus = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未确认'
    },{
        value: 1,
        label: '处理中'
    },{
        value: 2,
        label: '已确认'
    }
]
//维权类型
export const SafeguardingRightsType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '责任人确认'
    },{
        value: 1,
        label: '平台协调'
    }
]
//出售状态
export const ServiceManagementSellState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未上架'
    },{
        value: 1,
        label: '已推荐'
    },{
        value: 2,
        label: '已删除'
    }
]
//状态
export const ServiceManagementState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '有效'
    },{
        value: 0,
        label: '无效'
    }
]
//状态
export const SkillsState = [
    {
        value: -1,
        label: '全部'
    },{
        value: 1,
        label: '有效'
    },{
        value: 0,
        label: '无效'
    }
]
//站点类型
export const StationType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '购买站点'
    },{
        value: 1,
        label: '授权站点'
    },{
        value: 2,
        label: '代维站点'
    }
]
//站点状态
export const StationStatus = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未开通'
    },{
        value: 1,
        label: '待补全信息'
    },{
        value: 2,
        label: '处理中'
    },{
        value: 3,
        label: '运行中'
    },{
        value: 4,
        label: '已暂停'
    },{
        value: 5,
        label: '已到期'
    },{
        value: 6,
        label: '已关闭'
    }
]
//判断系统用户或平台用户
export const SystemLogLoginType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '系统用户'
    },{
        value: 1,
        label: '平台用户'
    }
]
//用户操作类型{[登录]userlogin:0,[修改密码]updatePwd:1,[修改信息]UpdateInfo:2,[发布任务]pubtask:3,[接受任务]accepttask:4,[实名认证]realnameauth:5,[注册]register:6,[审核实名认证]isrealname:7,[邮箱认证]mailauth:8,[审核邮箱认证]exammailauth:9,[缴纳押金]paydeposit:10,[充值]recharge:11,[提现]putforward:12,[提现审核]authputforward:13,[新建站点]newsite:14,[开站]openweb:15,[订单支付]payorder:16,[任务审核]orderauth:17,[竞标]bidding:18,[新增站内信]addsitemail:19,[撤销任务]revoketask:20,[追加子订单]appendorder:21,[取消订单]cancelOrder:22}
export const SystemLogOperatorType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '登录'
    },{
        value: 1,
        label: '修改密码'
    },{
        value: 2,
        label: '修改信息'
    },{
        value: 3,
        label: '发布任务'
    },{
        value: 4,
        label: '接受任务'
    },{
        value: 5,
        label: '实名认证'
    },{
        value: 6,
        label: '注册'
    },{
        value: 7,
        label: '审核实名认证'
    },{
        value: 8,
        label: '邮箱认证'
    },{
        value: 9,
        label: '审核邮箱认证'
    },{
        value: 10,
        label: '缴纳押金'
    },{
        value: 11,
        label: '充值'
    },{
        value: 12,
        label: '提现'
    },{
        value: 13,
        label: '提现审核'
    },{
        value: 14,
        label: '新建站点'
    },{
        value: 15,
        label: '开站'
    },{
        value: 16,
        label: '订单支付'
    },{
        value: 17,
        label: '任务审核'
    },{
        value: 18,
        label: '竞标'
    },{
        value: 19,
        label: '新增站内信'
    },{
        value: 20,
        label: '撤销任务'
    },{
        value: 21,
        label: '追加子订单'
    },{
        value: 22,
        label: '取消订单'
    }
]
//任务状态
export const TaskStatus = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '待付款'
    },{
        value: 1,
        label: '待审核'
    },{
        value: 2,
        label: '待竞标'
    },{
        value: 3,
        label: '待雇主确认合同'
    },{
        value: 4,
        label: '待服务商确认合同'
    },{
        value: 5,
        label: '制作中'
    },{
        value: 6,
        label: '交付任务待审核'
    },{
        value: 7,
        label: '待雇主确认'
    },{
        value: 8,
        label: '已完成'
    },{
        value: 9,
        label: '已关闭'
    }
]
//是否打款
export const TaskIsPayMoney = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未打款'
    },{
        value: 1,
        label: '已打款'
    }
]
//性别
export const UserGender = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '男'
    },{
        value: 1,
        label: '女'
    },{
        value: 2,
        label: '保密'
    }
]
//实名认证
export const UserIsNameAuthentication = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未认证'
    },{
        value: 1,
        label: '已认证'
    }
]
//邮箱认证
export const UserIsEmailAuthentication = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未认证'
    },{
        value: 1,
        label: '已认证'
    }
]
//手机认证
export const UserIsMobileAuthentication = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未认证'
    },{
        value: 1,
        label: '已认证'
    }
]
//是否有竞标资格
export const UserIsBidd = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '不具有'
    },{
        value: 1,
        label: '具有'
    }
]
//所属账户类型
export const UserType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '开发者'
    },{
        value: 1,
        label: '普通用户'
    }
]
//是否是服务商
export const UserIsService = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '否'
    },{
        value: 1,
        label: '是'
    }
]
//客户状态
export const UserStatus = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '身份无效'
    },{
        value: 1,
        label: '身份有效'
    }
]
//区域选择
export const UserAuthenInfoRegion = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '中国大陆'
    },{
        value: 1,
        label: '港澳地区'
    },{
        value: 2,
        label: '台湾地区'
    },{
        value: 3,
        label: '海外地区'
    }
]
//身份选择
export const UserAuthenInfoIdentitySelect = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '个人'
    },{
        value: 1,
        label: '公司'
    }
]
//身份证期限类型
export const UserAuthenInfoLimitType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '有期限'
    },{
        value: 1,
        label: '无期限'
    }
]
//实名审核状态
export const UserAuthenInfoNameAuthenticationType = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '审核中'
    },{
        value: 1,
        label: '审核通过'
    },{
        value: 2,
        label: '审核失败'
    }
]
//手机认证
export const UserAuthenInfoIsAuthenticationMobile = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未通过'
    },{
        value: 1,
        label: '通过'
    }
]
//邮箱认证
export const UserAuthenInfoIsAuthenticationEmail = [
    {
        value: -1,
        label: '全部'
    },{
        value: 0,
        label: '未通过'
    },{
        value: 1,
        label: '通过'
    }
]
