const menu = [
  {
    name: 'dApp',
    sublinks: [
      {
        name: 'Swap',
        link: 'https://eliteswap.io/#/swap',
        description: 'Swap tokens'
      },
      {
        name: 'Pool',
        link: 'https://eliteswap.io/#/pool',
        description: 'Supply liquidity'
      },
      {
        name: 'Analytics',
        link: 'https://eliteswap.io/info/',
        description: 'Elite Swap analytics'
      },
      { name: 'Voting Portal', link: 'https://eliteswap.io/#/vote' },
      { name: 'GitHub', link: 'https://github.com/EthereumEliteswap' }
    ]
  },
  {
    name: 'Community',
    sublinks: [
      { name: 'Discord', link: 'https://discord.gg/yFsjhuQ7Kj' },
      { name: 'Telegram', link: 'https://telegram.org/@EliteSwap' },
      { name: 'Twitter', link: 'https://telegram.org/@EliteSwap' }
    ]
  },
  {
    name: 'About',
    sublinks: [
      { name: 'Blog', link: '/blog' },
      { name: 'ELT Token', link: '/blog/elt' },
      { name: 'FAQ', link: '/blog/faq' }
    ]
  }
]

module.exports = menu
