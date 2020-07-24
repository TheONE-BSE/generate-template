#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const com = require('./components.js')
let dirPath = process.argv[2];

function getDirName(dir) {
	return dir.substring(dir.lastIndexOf('/') + 1)
}

if (!dirPath) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run tep test');
    process.exit(0);
}

const lessTep = '';

function render(type) {
  return com[type]
}

function renderCom(searchFields) {
  let s = searchFields.split('\n')
  let dom = ''
  s.map(item => {
    if(!item) return
    let field = item.split(',')
    const fn = render(field[0])
    dom += 
      `<el-form-item label="${field[1]}">
        ${fn(field[2])}
      </el-form-item>
      `
  })
  return dom
}

function renderLifeCycle(module) {
  const hasMethods = module.includes('methods')
	let methods = hasMethods ? `methods: {

	},` : ''

	const hasComponents = module.includes('components')
	let components = hasComponents ? `components: {
    vTable, searchField
	},` : ''

	const hasComputed = module.includes('computed')
	let computed = hasComputed ? `computed: {

	},` : ''

	const hasMounted= module.includes('mounted')
	let mounted = hasMounted ? `mounted() {

  },` : ''
  
  return {
    methods,
    components,
    computed,
    mounted
  }
}

inquirer.prompt([
  {
    name: 'module',
    message: '你需要哪些vue基础选项?',
    type: 'checkbox',
    choices: [
      "methods",
      "computed",
      "mounted",
      "components"
    ],
  },
  {
    name: 'searchFields',
    message: '你想要在搜索栏中展示哪些组件?',
    type: 'editor',
    suffix: "type,label,model",
  },
]).then(answers => {
	const { module, searchFields } = answers
  let { methods, components, mounted, computed} = renderLifeCycle(module)

	// 页面模版
  const indexTep = 
`<template>
  <search-field title="高级搜索">
    <el-form :inline="true" size="small" label-width="100px">
      ${renderCom(searchFields)}
    </el-form>
    <div class="search-button-container">
      <el-button type="primary" @click="" size="small">查询</el-button>
      <el-button @click="" size="small" plain>重置</el-button>
    </div>
  </search-field>
</template>

<script>
import vTable from '@/components/tools/vtable'
import searchField from '@/components/tools/searchField'
export default {
	${components}
	data() {
		return  {

		}
	},
	${mounted}
	${computed}
	${methods}	
}
</script>

<style lang="less">

</style>
`;

  fs.mkdirSync(`${dirPath}`); // mkdir $1
  process.chdir(`${dirPath}`); // cd $1

  fs.writeFileSync('index.vue', indexTep);
  fs.writeFileSync('index.less', lessTep);

  console.log(`模版${getDirName(dirPath)}已创建,请手动添加其他功能,happy hacking!`);

  process.exit(0);
}).catch(e => {
  console.error(chalk.red(`> Generate failed`));
  console.log(e);
  process.exit(1);
});