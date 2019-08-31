export default {
  path: '/iot',
  title: 'Internet of Things',
  icon: 'puzzle-piece',
  children: (pre => [
    { path: `${pre}dashboard`, title: 'Dashboard', icon: 'dashboard' },
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
      path: `${pre}events`,
      title: 'Events',
      icon: 'bell',
      children: [
        { path: `${pre}events/device`, title: 'Device Events', icon: 'comment' },
        { path: `${pre}events/platform`, title: 'Platform Activities', icon: 'rss-square' }
      ]
    }
  ])('/iot/')
}
