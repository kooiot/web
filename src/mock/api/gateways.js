export default [
  {
    path: '/api/v1/ioe_api.gateways.list',
    method: 'get',
    handle ({ params, Repeat }) {
      let { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          page: {
            total: 1000
          },
          list: Repeat(pageSize, {
            'key': '@guid',
            'value|1': [10, 100, 200, 500],
            'type': '@boolean',
            'admin': '@cname',
            'adminNote': '@cparagraph(0.5)',
            'dateTimeCreat': '@datetime',
            'used': '@boolean',
            'dateTimeUse': '@datetime'
          })
        }
      }
    }
  }
]
