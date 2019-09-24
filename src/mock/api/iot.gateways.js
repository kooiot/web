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
            'owner_id': '@cname',
            'owner_type|1': ['User', 'Cloud Company Group'],
            'creation': '@datetime',
            'hdb': null,
            'longitude': '116.3252',
            'last_updated': '@datetime',
            'name': '@cparagraph(0.5)',
            'use_beta_start_time': '@datetime',
            'sn': '@string("number|upper", 16, 16)',
            'company': '冬笋',
            'modified': '@datetime',
            'use_beta|1': [0, 1],
            'device_status|1': ['ONLINE', 'OFFLINE', ''],
            'description': '@cparagraph(0.5)',
            'enabled|1': [0, 1],
            'dev_name': '@cparagraph(0.5)',
            'latitude': '40.045103',
            'device_devs_num|1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            'device_apps_num|1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            'used': '@boolean'
          })
        }
      }
    }
  },
  {
    path: '/api/api/v1/ioe_api.gateways.read.*',
    method: 'get',
    handle ({ params }) {
      console.log('Gateways Read Mock!!!')
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          'owner_id': '@cname',
          'owner_type|1': ['User', 'Cloud Company Group'],
          'creation': '@datetime',
          'hdb': null,
          'longitude': '116.3252',
          'last_updated': '@datetime',
          'name': '@cparagraph(0.5)',
          'use_beta_start_time': '@datetime',
          'sn': '@string("number|upper", 16, 16)',
          'company': '冬笋',
          'modified': '@datetime',
          'use_beta|1': [0, 1],
          'device_status|1': ['ONLINE', 'OFFLINE', ''],
          'description': '@cparagraph(0.5)',
          'enabled|1': [0, 1],
          'dev_name': '@cparagraph(0.5)',
          'latitude': '40.045103',
          'device_devs_num|1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          'device_apps_num|1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          'used': '@boolean'
        }
      }
    }
  }
]
