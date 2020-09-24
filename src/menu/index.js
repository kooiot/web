import { uniqueId } from 'lodash'

// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 功能
import demoPlayground from './modules/demo-playground'
// CRUD
import demoD2Crud from './modules/demo-d2-crud'
// CRUD PLUS
import demoD2CrudPlus from './modules/demo-d2-crud-plus'
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
  demoPlayground,
  demoD2Crud,
  demoD2CrudPlus
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
  demoPlayground,
  demoComponents,
  demoPlugins,
  {
    title: '社区插件',
    icon: 'puzzle-piece',
    children: [
      demoD2Crud,
      demoD2CrudPlus
    ]
  }
])
