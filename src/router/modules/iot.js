import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/iot',
  name: 'iot',
  meta,
  redirect: { name: 'iot-dashboard' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'dashboard',
      name: `${pre}dashboard`,
      component: _import('iot/gateways'),
      meta: {
        ...meta,
        title: 'Dashboard',
        category: 'all'
      }
    },
    {
      path: 'gateways/private',
      name: `${pre}gateways-private`,
      component: _import('iot/gateways'),
      props: true,
      meta: {
        ...meta,
        title: 'Private Gateways',
        category: 'private'
      }
    },
    {
      path: 'gateways/company',
      name: `${pre}gateways-company`,
      component: _import('iot/gateways'),
      props: true,
      meta: {
        ...meta,
        title: 'Company Gateways',
        category: 'company'
      }
    },
    {
      path: 'gateways/shared',
      name: `${pre}gateways-shared`,
      component: _import('iot/gateways'),
      props: true,
      meta: {
        ...meta,
        title: 'Shared Gateways',
        category: 'shared'
      }
    },
    {
      path: 'gateways/settings/:id',
      name: `${pre}gateways-settings`,
      component: _import('iot/gateways/settings'),
      props: true,
      meta: {
        ...meta,
        title: 'Gateway Settings'
      }
    },
    {
      path: 'events/device',
      name: `${pre}events-device`,
      component: _import('iot/events/device'),
      meta: {
        ...meta,
        title: 'Device Events'
      }
    },
    {
      path: 'events/platform',
      name: `${pre}events-platform`,
      component: _import('iot/events/platform'),
      meta: {
        ...meta,
        title: 'Platform Activities'
      }
    }
  ])('iot-')
}
