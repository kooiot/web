import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/store',
  name: 'store',
  meta,
  redirect: { name: 'store-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('demo/business/index'),
      meta: {
        ...meta,
        title: 'App Store'
      }
    },
    {
      path: 'favorites/applications',
      name: `${pre}favorites-applications`,
      component: _import('store/favorites/applications'),
      meta: {
        ...meta,
        title: 'Favorite Applications'
      }
    },
    {
      path: 'favorites/configurations',
      name: `${pre}favorites-configurations`,
      component: _import('store/favorites/configurations'),
      meta: {
        ...meta,
        title: 'Favorite Configurations'
      }
    },
    {
      path: 'favorites/extensions',
      name: `${pre}favorites-extensions`,
      component: _import('store/favorites/extensions'),
      meta: {
        ...meta,
        title: 'Favorite Extensions'
      }
    },
    {
      path: 'developer/applications',
      name: `${pre}developer-applications`,
      component: _import('store/developer/applications'),
      meta: {
        ...meta,
        title: 'My Applications'
      }
    },
    {
      path: 'developer/configurations',
      name: `${pre}developer-configurations`,
      component: _import('store/developer/configurations'),
      meta: {
        ...meta,
        title: 'My Configurations'
      }
    },
    {
      path: 'developer/extensions',
      name: `${pre}developer-extensions`,
      component: _import('store/developer/extensions'),
      meta: {
        ...meta,
        title: 'My Extensions'
      }
    }
  ])('store-')
}
