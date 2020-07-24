module.exports = {
  radio: function(model) {
    let dom = 
        `<el-radio-group v-model="${model}">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>`
    return dom
  },
  select: function(model) {
    let dom = 
        `<el-select v-model="${model}" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>`
    return dom
  }
} 
 