import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/help',
  name: 'help',
  meta,
  redirect: { name: 'help-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('demo/components/index'),
      meta: {
        ...meta,
        title: 'Help Center'
      }
    },
    {
      path: 'cloud/quick-guide',
      name: `${pre}cloud-quick-guide`,
      component: _import('help/cloud/quick-guide'),
      meta: {
        ...meta,
        title: 'Quick Guide'
      }
    },
    {
      path: 'cloud/api-reference',
      name: `${pre}cloud-api-reference`,
      component: _import('help/cloud/api-reference'),
      meta: {
        ...meta,
        title: 'API Reference'
      }
    },
    {
      path: 'freeioe/app-quick-guide',
      name: `${pre}freeioe-app-quick-guide`,
      component: _import('help/freeioe/app-quick-guide'),
      meta: {
        ...meta,
        title: 'Quick Guide'
      }
    },
    {
      path: 'freeioe/api-dev-book',
      name: `${pre}freeioe-api-dev-book`,
      component: _import('help/freeioe/api-dev-book'),
      meta: {
        ...meta,
        title: 'Development Book'
      }
    },
    {
      path: 'freeioe/github',
      name: `${pre}freeioe-github`,
      component: _import('help/freeioe/github'),
      meta: {
        ...meta,
        title: 'Github'
      }
    }
  ])('help-')
}
