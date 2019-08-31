export default {
  path: '/tickets',
  title: 'Tickets',
  icon: 'ticket',
  children: (pre => [
    { path: `${pre}index`, title: 'Tickets Center', icon: 'ticket' },
    { path: `${pre}new`, title: 'New Ticket', icon: 'file' },
    {
      path: `${pre}my`,
      title: 'My Tickets',
      icon: 'ticket',
      children: [
        { path: `${pre}my/open`, title: 'Open Tickets', icon: 'ticket' },
        { path: `${pre}my/closed`, title: 'Closed Tickets', icon: 'ticket' }
      ]
    }
  ])('/tickets/')
}
