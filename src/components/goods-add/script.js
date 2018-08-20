import {getToken} from '@/assets/js/auth'
import CategoryCascader from '@/common/category-cascader'

export default {
  created () {},
  data () {
    return {
      prodForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        is_promote: false,
        pics: [],
        goods_introduce: ''
      },
      stepActive: 1,
      manyParams: [],
      onlyParams: [],
      uploadImgHeader: { // 上传图片接口请求头
        Authorization: getToken()
      },
      content: '',
      editorOption: {} // 富文本编辑器的配置选项
    }
  },
  methods: {
    handleCascaderChange (val) {
      this.prodForm.goods_cat = val.join(',')
    },

    handleRemove(file, fileList) {
      console.log('handleRemove', file, fileList)
    },

    handlePreview(file) {
      console.log('handlePreview', file)
    },

    handleSuccess (res, file) {
      console.log('success', res, file)

      // pics 用户添加商品表单提交
      this.prodForm.pics.push({
        pic: res.data.tmp_path
      })
    },

    async handleAddProd () {
      // 提交表单的时候，找到所有选中的标签
      this.prodForm.attrs = [...this.manyParams, ...this.onlyParams]
      const res = await this.$http.post('/goods', this.prodForm)
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加商品成功'
        })
      }
    },

    /**
     * 处理标签页 tab 被选中时触发的事件
     */

    handleTabClick (tab, event) {
      this.stepActive = Number(tab.index)
      if (tab.label === '商品参数') {
        // 加载用户所选商品分类下的动态参数
        this.loadManyPrams()
      } else if (tab.label === '商品属性') {
        this.loadOnlyParams()
      }
    },

    /**
     * 加载商品分类下的动态参数
     */

    async loadManyPrams () {
      const categoryId = this.prodForm.goods_cat.split(',')[2]
      const res = await this.$http.get(`/categories/${categoryId}/attributes`, {
        params: {
          sel: 'many'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        // 将 attr_vals 字符串（以,分隔的，有规律）转换为数组
        data.forEach(item => item.attr_vals = item.attr_vals.split(','))
        this.manyParams = data
      }
    },

    async loadOnlyParams () {
      const categoryId = this.prodForm.goods_cat.split(',')[2]
      const res = await this.$http.get(`/categories/${categoryId}/attributes`, {
        params: {
          sel: 'only'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        console.log(data)
        this.onlyParams = data
      }
    },

    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },

    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },

    onEditorReady(quill) {
      console.log('editor ready!', quill)
    }
  },
  components: {
    CategoryCascader
  }
}
