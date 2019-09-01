export default [
  {
    path: '/api/api/v1/ioe_api.gateways.list.*',
    method: 'get',
    handle ({ params, Repeat }) {
      console.log('Gateways List Mock!!!')
      let { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          page: {
            total: 1000
          },
          list: Repeat(pageSize, {
            'sn': '@string("number|upper", 16, 20)',
            'desc': '@cparagraph(0.5)',
            'value|1': [10, 100, 200, 500],
            'status|1': ['ONLINE', 'OFFLINE', ''],
            'admin': '@cname',
            'dateTimeCreat': '@datetime',
            'used': '@boolean',
            'tag|1': ['家', '公司']
          })
        }
      }
    }
  }
]
