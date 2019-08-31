import request from '@/plugin/axios'

export function fetch () {
  return request({
    url: '/api/ioe_api.gateways.list',
    method: 'get'
  })
}

export function detail (name) {
  return request({
    url: '/api/ioe_api.gateways.read',
    method: 'get',
    params: {
      name
    }
  })
}
