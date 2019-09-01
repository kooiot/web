import request from '@/plugin/axios'

export function fetch (params) {
  console.log('Gateways List Fetch!!!')
  return request({
    url: '/api/v1/ioe_api.gateways.list',
    method: 'get',
    params
  })
}

export function detail (name) {
  return request({
    url: '/api/v1/ioe_api.gateways.read',
    method: 'get',
    params: {
      name
    }
  })
}
