import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/tickets',
  name: 'tickets',
  meta,
  redirect: { name: 'tickets-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('demo/components/index'),
      meta: {
        ...meta,
        title: 'Tickets Center'
      }
    },
    {
      path: 'new',
      name: `${pre}new`,
      component: _import('tickets/new'),
      meta: {
        ...meta,
        title: 'New Tickets'
      }
    },
    {
      path: 'my/open',
      name: `${pre}my-open`,
      component: _import('tickets/my-open'),
      meta: {
        ...meta,
        title: 'Open Tickets'
      }
    },
    {
      path: 'my/closed',
      name: `${pre}my-closed`,
      component: _import('tickets/my-closed'),
      meta: {
        ...meta,
        title: 'Closed Tickets'
      }
    }
  ])('tickets-')
}
