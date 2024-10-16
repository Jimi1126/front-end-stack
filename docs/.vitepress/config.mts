import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'FrontEndStack',
  description: '前端技术栈',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '知识体系', link: '/system/index' },
      { text: '面试题', link: '/interview/html' },
    ],

    sidebar: [
      {
        text: '知识体系',
        items: [
          { text: '知识图谱', link: '/system/index' },
          {
            text: 'html',
            items: [
              { text: '什么是 HTML', link: '/system/html/iswhat' },
              { text: 'HTML5', link: '/system/html/html5' },
            ],
          },
          {
            text: 'css',
            items: [
              { text: '什么是 CSS', link: '/system/css/iswhat' },
              { text: 'CSS3', link: '/system/css/css3' },
              { text: '层叠规则', link: '/system/css/cascading' },
              { text: '视觉格式化模型', link: '/system/css/model' },
              { text: 'CSS 组织方式', link: '/system/css/builder' },
              { text: '移动端适配', link: '/system/css/adapter' },
            ],
          },
          {
            text: 'js',
            items: [
              { text: '什么是 JS', link: '/system/js/iswhat' },
              { text: 'ES6+', link: '/system/js/es6' },
              { text: '并发模型', link: '/system/js/async' },
              { text: '浏览器的事件循环', link: '/system/js/eventLoop' },
              { text: 'V8的工作原理', link: '/system/js/v8' },
              { text: '浏览器渲染原理', link: '/system/js/renderer' },
            ],
          },
          {
            text: '前端工程化',
            items: [
              { text: '什么是前端工程化？', link: '/system/engineered/iswhat' },
              { text: '页面优化策略', link: '/system/engineered/页面优化策略' },
            ],
          },
          {
            text: 'Vuejs',
            items: [{ text: '什么是Vuejs？', link: '/system/vue/iswhat' }],
          },
          {
            text: 'Reactjs',
            items: [{ text: '什么是Reactjs？', link: '/system/react/iswhat' }],
          },
          {
            text: '设计模式',
            items: [{ text: '什么是设计模式？', link: '/system/design/pattern/iswhat' }],
          },
          {
            text: '编程范式',
            items: [{ text: '什么是编程范式？', link: '/system/design/program-mode/iswhat' }],
          },
          {
            text: '程序设计思想',
            items: [{ text: '架构设计', link: '/system/design/framework/架构设计' }],
          },
        ],
      },
      {
        text: '面试题',
        items: [
          { text: 'html', link: '/interview/html' },
          { text: 'css', link: '/interview/css' },
          { text: 'js', link: '/interview/js' },
          { text: 'vue', link: '/interview/vue' },
          { text: '工具链', link: '/interview/toolchain' },
          ,
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Jimi1126/front-end-stack' }],
  },
});
