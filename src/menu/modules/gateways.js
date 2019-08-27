export default {
  path: '/gateways',
  title: 'Gateway',
  icon: 'flask',
  children: (pre => [
    { path: `${pre}index`, title: 'Gateway', icon: 'home' },
    {
      path: `${pre}category`,
      title: 'Category',
      icon: 'table',
      children: [
        { path: `${pre}category/online`, title: 'Online Gateways' }
      ]
    },
    {
      path: `${pre}issues`,
      title: 'ISSUES',
      icon: 'github',
      children: [
        { path: `${pre}issues/142`, title: '#142' }
      ]
    }
  ])('/gateways/')
}
