export default {
  path: '/demo/business',
  title: 'Demo',
  icon: 'flask',
  children: (pre => [
    { path: `${pre}index`, title: 'Demo', icon: 'home' },
    {
      path: `${pre}table`,
      title: 'Table',
      icon: 'table',
      children: [
        { path: `${pre}table/1`, title: 'Table 1' }
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
  ])('/demo/business/')
}
