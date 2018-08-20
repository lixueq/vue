<template>
<div class="list-wrap">
  <el-breadcrumb class="list-breadcrumd" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table
    :data="tableData"
    v-loading="loading"
    style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="层级">
      <!--
        自定义表格列：
        1. 在表格列中加一个 template 标签，写上 slot-scope="scope"
            slot-scope="scope" 的值 scope 可以是任何名字，它始终表示当前遍历的作用域对象
            该作用域对象中有一个属性 row 可以用来获取当前行对象，也就是数组的每一项
        2. 在 template 中自定义你想要的内容列表
           我们在 template 里面就可以使用 scope.row 数据成员
       -->
      <template slot-scope="scope">
        <span v-if="scope.row.level === '0'">一级</span>
        <span v-else-if="scope.row.level === '1'">二级</span>
        <span v-else-if="scope.row.level === '2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  created () {
    this.loadRights()
  },
  data () {
    return {
      tableData: [],
      loading: true // 默认 loading 状态
    }
  },
  methods: {
    async loadRights () {
      const res = await this.$http.get('/rights/list')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data
        this.loading = false // 数据加载完成，取消 loading 状态
      }
    }
  }
}
</script>

<style>
</style>
