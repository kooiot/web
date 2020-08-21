import { uniqueId } from 'lodash'

// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 组件
import demoCharts from './modules/demo-charts'
// 试验台
import demoPlayground from './modules/demo-playground'
// 示例
import demoBusiness from './modules/demo-business'
// CRUD
import demoD2Crud from './modules/demo-d2-crud'
// 第三方网页
import demoFrame from './modules/demo-frame'
// 物联网
import iot from './modules/iot'
// 应用中心
import store from './modules/store'
// 工单
import tickets from './modules/tickets'
// 帮助中心
import help from './modules/help'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

// 菜单 侧边栏
export const menuAside = supplementPath([
  iot,
  store,
  tickets,
  help,
  demoComponents,
  demoPlugins,
  demoCharts,
  demoPlayground,
  demoBusiness,
  demoD2Crud,
  demoFrame
])

// 菜单 顶栏
export const menuHeader = supplementPath([
  {
    path: '/index',
    title: 'Home',
    icon: 'home'
  },
  iot,
  store,
  tickets,
  help,
  {
    title: 'Features',
    icon: 'puzzle-piece',
    children: [
      demoD2Crud,
      demoComponents,
      demoCharts,
      demoPlugins,
      demoFrame,
      {
        title: 'Open with new window',
        icon: 'link',
        children: [
          { path: 'https://github.com/d2-projects/d2-admin', title: 'D2Admin Github', icon: 'github' },
          { path: 'https://juejin.im/user/57a48b632e958a006691b946/posts', title: '掘金', icon: 'globe' },
          { path: 'https://my.oschina.net/u/3871516', title: '开源中国', icon: 'globe' },
          { path: 'https://www.zhihu.com/people/fairy-ever/activities', title: '知乎', icon: 'globe' },
          { path: 'https://segmentfault.com/blog/liyang-note-book', title: 'segmentfault 专栏', icon: 'globe' },
          { path: 'http://www.fairyever.com/', title: 'www.fairyever.com', icon: 'globe' }
        ]
      }
    ]
  },
  demoPlayground,
  demoBusiness
])
