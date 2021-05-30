import { defineConfig } from 'dumi';
import { join } from 'path';
import { readdirSync } from 'fs';


const headPkgList = [];

const pkgList = readdirSync(join(__dirname, 'packages'))
  .filter(
    (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
  ).map((path) => [join('packages', path)])
  .reduce((acc, val) => acc.concat(val), []);

export default defineConfig({
  title: 'FE-note',
  mode: 'site',
  // logo:"",

  hash: true,
  exportStatic: {},
  dynamicImport: {},
  manifest: {},
  resolve: {
    includes: ['docs',...pkgList],
  },
  webpack5: {},
  fastRefresh: {},
  navs:{
    'zh-CN': [
      null,
      { title: 'GitHub', path: 'https://github.com/cc7gs/frontEnd_note' },
    ],
  },
  metas:[
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
  // more config: https://d.umijs.org/config
});
