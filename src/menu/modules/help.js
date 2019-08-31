export default {
  path: '/help',
  title: 'Help',
  icon: 'question-circle',
  children: (pre => [
    { path: `${pre}index`, title: 'Help Center', icon: 'question-circle' },
    {
      path: `${pre}cloud`,
      title: 'Cloud Help',
      icon: 'cloud',
      children: [
        { path: `${pre}cloud/quick-guide`, title: 'Quick Guide', icon: 'question-circle' },
        { path: `${pre}cloud/api-reference`, title: 'API Reference', icon: 'question-circle' }
      ]
    },
    {
      path: `${pre}freeioe`,
      title: 'FreeIOE Help',
      icon: 'support',
      children: [
        { path: `${pre}freeioe/app-quick-guide`, title: 'Quick Guide', icon: 'question-circle' },
        { path: `${pre}freeioe/api-dev-book`, title: 'Development Book', icon: 'question-circle' },
        { path: `${pre}freeioe/github`, title: 'Github', icon: 'question-circle' }
      ]
    }
  ])('/help/')
}
