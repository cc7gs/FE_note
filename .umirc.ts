import { defineConfig } from 'dumi';
import { join } from 'path';
import { readdirSync } from 'fs';

const headPkgList = [];

const pkgList = readdirSync(join(__dirname, 'packages'))
  .filter((pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg))
  .map((path) => [join('packages', path)])
  .reduce((acc, val) => acc.concat(val), []);

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'FE-note',
  mode: 'site',
  // logo:"",

  hash: true,
  base: isProduction ? 'frontEnd_note' : '/',
  publicPath: isProduction ? 'frontEnd_note/' : '/',
  outputPath: 'docs-dist',
  exportStatic: {},
  dynamicImport: {},
  manifest: {},
  resolve: {
    includes: ['docs', ...pkgList],
  },
  webpack5: {},
  fastRefresh: {},
  ssr: isProduction ? {} : undefined,
  navs: [
    {
      title: '基础篇',
      path: '/basic',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: '前端基础篇', path: '/basic' },
        { title: 'node基础篇', path: '/node-basic' },
      ],
    },
    {
      title: '高级篇',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: 'node源码分析', path: '/node-source' },
        { title: 'RxJS', path: '/rx-js' },
        { title: 'Typescript', path: '/typescript' },
      ],
    },
    {
      title: '工程化',
      path: '/ngineering',
    },
    {
      title: '面试篇',
      path: '/interview',
    },
    {
      title: '算法刷题',
      path: '/lettcode',
    },
    { title: 'GitHub', path: 'https://github.com/cc7gs/frontEnd_note' },
  ],
  metas: [
    {
      name: 'keywords',
      content: 'js,node,算法，数据结构，前端面试,前端工具',
    },
    {
      name: 'description',
      content: '在这里记录前端进阶提升过程点滴',
    },
  ],
  locales: [['zh-CN', '中文']],
  ignoreMomentLocale: true,
  // more config: https://d.umijs.org/config
});
