import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/gateways',
  name: 'demo-business',
  meta,
  redirect: { name: 'gateways-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('demo/business/index'),
      meta: {
        ...meta,
        title: 'Demo Home'
      }
    },
    {
      path: 'gateways/online',
      name: `${pre}online`,
      component: _import('demo/business/table/1'),
      meta: {
        ...meta,
        title: 'Table 1'
      }
    },
    {
      path: 'issues/142',
      name: `${pre}issues-142`,
      component: _import('demo/business/issues/142'),
      meta: {
        ...meta,
        title: 'Issue #142'
      }
    },
    {
      path: 'issues/142/edit/:id',
      name: `${pre}issues-142-edit`,
      component: _import('demo/business/issues/142/edit'),
      props: true,
      meta: {
        ...meta,
        title: 'Edit without cache'
      }
    },
    {
      path: 'issues/142/edit-cache-db/:id',
      name: `${pre}issues-142-edit-cache-db`,
      component: _import('demo/business/issues/142/edit-cache-db'),
      props: true,
      meta: {
        ...meta,
        title: 'Edit with DB cache'
      }
    }
  ])('gateways-')
}
