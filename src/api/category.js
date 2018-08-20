import {http} from '../assets/js/http'

// 使用 webpack 打包的代码，某些 Node 模块在浏览器中可以使用，例如 path 模块
// import path from 'path'
// M Model
//    在服务器那么 Model 就是和数据库交互的
//    在客户端 Model 和服务器接口数据交互的
//    Model 其实就是一个类
//    Model 和 View 没有一毛钱关系
//    类就是模型、模板的意思、
//    Model
// V  View 视图、html
// VM 操作视图的数据

// 这种写法源自于服务端编程语言：Java、c#...
// 在这些语言中，一个文件就放一个类，成员都放在类的内部，最后可以指定成员的公开还是私有
//    public
//    private
// 在这些语言中，由于一个文件里面放一个类，类是一个抽象的模板、模型，所以我们有时候把这个 业务数据模型类

const baseUrl = '/categories'

export default class Category {
  constructor (c) {
    this.cat_pid = c.cat_pid
    this.cat_name = c.cat_name
    this.cat_level = c.cat_level
  }

  // 实例成员，只能被实例调用
  save () {
    return http.post(baseUrl, this)
  }

  static findAll (type = 3) {
    return http.get(baseUrl, {
      params: {
        type: type
      }
    })
  }

  // 静态成员，只能被类调用

  static findByType (condition) {
    return http.get(baseUrl, {
      params: {
        type: condition.type,
        pagenum: condition.pagenum,
        pagesize: condition.pagesize
      }
    })
  }

  findById (id) {
    return http.get(`${baseUrl}/${id}`)
  }

  static updateById (id, category) {
    return http.put(`${baseUrl}/${id}`, {
      cat_name: category.cat_name
    })
  }

  static deleteById (id) {
    return http.delete(`${baseUrl}/${id}`)
  }
}
