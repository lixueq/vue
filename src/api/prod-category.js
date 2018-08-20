/**
 * 该模块封装了所有和商品分类 API 相关操作函数
 * 有了这个模块，就不要在你的组件中出现任何请求了
 * 也就是说我们把所有和服务器交互的 API 接口都封装成一个一个的小函数
 *     方便维护
 *     可重用
 */


// export function save (c) {
//   return await axios.post('/categories', c)
// }

// export function findById () {

// }

// export function findByType () {

// }

// 都喜欢使用面向对象的写法
// 以前在服务器都流行类写法
// 在我们的 JavaScript 中就是构造函数

// **********************
// #region /面向对象的方式
// **********************
// function Category (c) {
//   this.cat_pid = c.cat_pid
//   this.cat_name = c.cat_name
//   this.cat_level = c.cat_pid
// }

// Category.prototype.save = async function () {
//   return await axios.post('/categories', this)
// }

// Category.findByType = async function (type) {
//   return await axios.get('/categories', {
//     params: {
//       type
//     }
//   })
// }

// Category.findById = function (catgoryId) {
//   return axios.get(`/categories/${catgoryId}`)
// }

// export default Category
// **********************
// #endregion /面向对象的方式
// **********************



// 使用
// const res = await new Category({
//   cat_pid: 1,
//   cat_name: 'xxx',
//   cat_level: 1
// }).save()


// 由于开发人员学习 ES6 之前的面向对象语法太过痛苦
// 所以 ECMAScript 6 新增了构造函数的新写法
// 让其更像我们的传统开发语言：Java、php、C#、C++、Python ...

class Category {
  // 类的构造函数
  // 当你 new Category 的时候就会自动调用该函数
  // 必须叫 constructor
  constructor (x, y) {
    console.log(x, y)
  }

  // save 必须由实例来调用
  save () {
    console.log('实例方法 save 被调用了')
  }

  // 静态方法
  // 静态方法必须由类调用
  static findById () {
    console.log('静态方法 findById 被调用了')
  }
}

const c = new Category(1, 2)

c.save()
Category.findById()






















