export default {
  path: '/iot',
  title: 'Internet of Things',
  icon: 'puzzle-piece',
  children: (pre => [
    { path: `${pre}index`, title: 'Dashboard', icon: 'dashboard' },
    {
      path: `${pre}gateways`,
      title: 'Gateways',
      icon: 'sitemap',
      children: [
        { path: `${pre}gateways/private`, title: 'Private Gateways', icon: 'tasks' },
        { path: `${pre}gateways/company`, title: 'Company Gateways', icon: 'server' },
        { path: `${pre}gateways/shared`, title: 'Shared Gateways', icon: 'share-alt-square' }
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
  ])('/iot/')
}
