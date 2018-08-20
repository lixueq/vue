import Category from '@/api/category'

export default {
  created () {
    this.loadCategories(1)
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      totalSize: 0,
      pageSize: 10,
      loading: true,
      addDialog: false,
      editDialog: false,
      editForm: {
        cat_name: ''
      },
      addForm: {
        cat_name: '',
        cat_pid: [],
        cat_level: 0
      },
      categoryCascaderOptions: []
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadCategories(1)
      this.currentPage = 1 // 让页码高亮回归到第一页
    },

    handleCurrentChange (page) {
      this.loadCategories(page)
    },

    async loadCategories (page) {
      this.loading = true // 发请求之前加载 loading 效果
      const res = await Category.findByType({
        type: 3,
        pagenum: page,
        pagesize: this.pageSize
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data.result
        this.totalSize = data.total
        this.loading = false // 取消 loading
      }
    },

    /**
     * 级联选择器改变的事件处理函数
     */

    handleCascaderChange (val) {
    },

    /**
     * 《显示添加分类对话框》
     * 1. 加载二级分类列表数据到级联选择器中
     */

    async handleShowAddCategory () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.categoryCascaderOptions = data
        this.addDialog = true
      }
    },

    /**
     * 《添加分类》
     * 1. 注册添加分类确定点击事件处理函数
     * 2. 得到表单数据
     *    cat_name
     *    cat_level
     *    当 cat_pid 数组为
     *      length === 0 0
     *      length === 1 cat_pid[0]
     *      length === 2 cat_pid[1]
     *      说白了就是最后一个节点的值
     *      cat_pid.length === 0 ? 0 : cat_pid[cat_pid.length - 1]
     *    cat_level
     *      cat_pid.length
     * 3. 发起请求执行添加操作
     * 4. 根据响应做交互处理
     */
    async handleAddCategory () {
      this.addForm.cat_level = this.addForm.cat_pid.length

      // 这个处理流程可以提取出来，放到级联选择器的改变事件中去处理
      let cat_pid = 0
      switch(this.addForm.cat_pid.length) {
        case 1:
          // 这里不要去修改 this.addForm.cat_pid
          // 因为 this.addForm.cat_pid 双向绑定了级联选择器
          // 级联选择器要求必须绑定一个数组
          // 而你这里把它重新赋值为一个数字了，所以组件警告报错了
          // this.addForm.cat_pid = this.addForm.cat_pid[0]
          cat_pid = this.addForm.cat_pid[0]
          break
        case 2:
          cat_pid = this.addForm.cat_pid[1]
          break
      }

      const res = await new Category({
        cat_name: this.addForm.cat_name,
        cat_level: this.addForm.cat_level,
        cat_pid
      }).save()

      const {data, meta} = res.data

      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加分类成功'
        })
        this.addDialog = false // 关闭弹框
        this.addForm.cat_name = ''
        this.addForm.cat_pid = []
        this.loadCategories(this.currentPage)
      }
    },

    /**
     * 处理删除分类
     */
    handleRemoveCategory (category) {
      this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await Category.deleteById(category.cat_id)
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除分类成功'
          })
          this.loadCategories(this.currentPage)
        }
      }).catch((err) => { // 这个 catch 会捕获到 Promise 的错误以及内部所有的错误
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    /**
     * 显示编辑分类对话框
     */

    async showEditDialog (category) {
      const res = await Category.findById(category.cat_id)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.editForm = data
        this.editDialog = true
      }
    },

    /**
     * 处理编辑分类
     */

    async handleEditCategory () {
      const res = await Category.updateById(this.editForm.cat_id, this.editForm)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.editDialog = false // 关闭编辑分类对话框
        this.$message({
          type: 'success',
          message: '编辑分类成功'
        })
        this.loadCategories(this.currentPage) // 重新加载当前分页数据
      }
    }
  }
}
