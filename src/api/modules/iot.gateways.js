import { map, random } from 'lodash'

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 列表
   */
  IOT_GATEWAYS_LIST () {
    // 模拟数据
    mock
      .onAny('/api/v1/ioe_api.gateways.list')
      .reply(config => tools.responseSuccess({
        page: {
          total: 1000
        },
        list: map(Array(config.params.pageSize), () => ({
          owner_id: faker.internal.email(),
          owner_type: ['User', 'Cloud Company Group'][random(0, 1)],
          creation: faker.date.past(),
          hdb: null,
          longitude: '116.3252',
          last_updated: faker.date.past(),
          name: faker.internal.userName(),
          use_beta_start_time: faker.date.past(),
          sn: faker.random.uuid(),
          company: '冬笋',
          modified: faker.date.past(),
          use_beta: [0, 1][random(0, 1)],
          device_status: ['ONLINE', 'OFFLINE', ''][random(0, 1)],
          description: faker.random.words(),
          enabled: [0, 1][random(0, 1)],
          dev_name: faker.internal.userName(),
          latitude: '40.045103',
          device_devs_num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][random(0, 10)],
          device_apps_num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][random(0, 10)],
          used: faker.random.boolean()
        }))
      }))
    // 接口请求
    return requestForMock({
      url: '/api/v1/ioe_api.gateways.list',
      method: 'get'
    })
  },
  /**
   * @description https://d2.pub/d2-admin/preview/#/demo/business/issues/142
   * @description 详情
   * @param {String} id 项目 ID
   */
  IOT_GATEWAYS_DETAIL (id) {
    // 模拟数据
    mock
      .onAny('/api/v1/ioe_api.gateways.read')
      .reply(config => tools.responseSuccess({
        owner_id: faker.internal.email(),
        owner_type: ['User', 'Cloud Company Group'][random(0, 1)],
        creation: faker.date.past(),
        hdb: null,
        longitude: '116.3252',
        last_updated: faker.date.past(),
        name: faker.internal.userName(),
        use_beta_start_time: faker.date.past(),
        sn: faker.random.uuid(),
        company: '冬笋',
        modified: faker.date.past(),
        use_beta: [0, 1][random(0, 1)],
        device_status: ['ONLINE', 'OFFLINE', ''][random(0, 1)],
        description: faker.random.words(),
        enabled: [0, 1][random(0, 1)],
        dev_name: faker.internal.userName(),
        latitude: '40.045103',
        device_devs_num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][random(0, 10)],
        device_apps_num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][random(0, 10)],
        used: faker.random.boolean()
      }))
    // 接口请求
    return requestForMock({
      url: '/api/v1/ioe_api.gateways.read',
      method: 'get',
      params: {
        id
      }
    })
  }
})
