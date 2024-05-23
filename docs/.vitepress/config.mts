import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "yll's blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: '2024',
        items: [
          { text: 'antd适配低版本浏览器', link: '/2024/antd' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yll1997dddd' }
    ]
  }
})
