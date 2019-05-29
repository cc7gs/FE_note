const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;

/**
 * @description 分析引入模块文件
 * @param {string} filename 
 */
const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  //将代码分析生成抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module',
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      const newFile = path.join(dirname, node.source.value);
      dependencies[node.source.value] = newFile;
    }
  });
  babel.transformFromAst(ast,null,{
    presets:[]
  });
  return {
    filename,
    dependencies
  }
  console.log(dependencies);
  // console.log(ast.program.body);
}
moduleAnalyser('./src/index.js'); 