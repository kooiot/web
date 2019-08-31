import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/iot',
  name: 'iot',
  meta,
  redirect: { name: 'iot-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('demo/business/index'),
      meta: {
        ...meta,
        title: 'Dashboard'
      }
    },
    {
      path: 'gateways/private',
      name: `${pre}gateway-private`,
      component: _import('iot/gateways'),
      meta: {
        ...meta,
        title: 'Private Gateways',
        category: 'private'
      }
    },
    {
      path: 'gateways/company',
      name: `${pre}gateway-company`,
      component: _import('iot/gateways'),
      meta: {
        ...meta,
        title: 'Company Gateways',
        category: 'company'
      }
    },
    {
      path: 'gateways/shared',
      name: `${pre}gateway-shared`,
      component: _import('iot/gateways'),
      meta: {
        ...meta,
        title: 'Shared Gateways',
        category: 'shared'
      }
    }
  ])('iot-')
}
