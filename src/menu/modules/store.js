export default {
  path: '/store',
  title: 'App Store',
  icon: 'flask',
  children: (pre => [
    { path: `${pre}index`, title: 'App Store', icon: 'flask' },
    {
      path: `${pre}favorites`,
      title: 'Favorites',
      icon: 'star',
      children: [
        { path: `${pre}favorites/applications`, title: 'Favorite Applications', icon: 'cubes' },
        { path: `${pre}favorites/configurations`, title: 'Favorite Configurations', icon: 'file' },
        { path: `${pre}favorites/extensions`, title: 'Favorite Extensions', icon: 'th-large' }
      ]
    },
    {
      path: `${pre}developer`,
      title: 'Developer',
      icon: 'wrench',
      children: [
        { path: `${pre}developer/applications`, title: 'My Applications', icon: 'cubes' },
        { path: `${pre}developer/configurations`, title: 'My Configurations', icon: 'file' },
        { path: `${pre}developer/extensions`, title: 'My Extensions', icon: 'th-large' }
      ]
    }
  ])('/store/')
}
