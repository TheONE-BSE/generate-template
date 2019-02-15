#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

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

inquirer.prompt([
  {
    name: 'module',
    message: 'Select the modules you want',
    type: 'checkbox',
    choices: [
      "methods",
      "computed",
      "mounted",
      "components"
    ],
  },
]).then(answers => {
	const { module } = answers
	const hasMethods = module.includes('methods')
	let methods = hasMethods ? `methods: {

	},` : ''

	const hasComponents = module.includes('components')
	let components = hasComponents ? `components: {

	},` : ''

	const hasComputed = module.includes('computed')
	let computed = hasComputed ? `computed: {

	},` : ''

	const hasMounted= module.includes('mounted')
	let mounted = hasMounted ? `mounted() {

	},` : ''

	// 页面模版
	const indexTep = `<template>
	<div class="${getDirName(dirPath)}">this is ${getDirName(dirPath)} page/component</div>
</template>

<script>
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