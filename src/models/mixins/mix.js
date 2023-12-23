////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 用于辅助定义 MixIn 的构造器。
 *
 * 此设计模式来源于：
 * https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/#improvingthesyntax
 *
 * @author 胡海星
 */
class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}

/**
 * 此对象用于辅助构造 MixIn 类。
 *
 * 此设计模式来源于：
 * https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/#improvingthesyntax
 *
 * 用法如下：
 *
 * ```js
 * class MyClass extends mix(MyBaseClass).with(Mixin1, Mixin2) {
 *   ...
 * }
 * ```
 *
 * @param {Class} superclass
 *     被装饰的模型类的父类，如果没有父类，可以为Object。
 * @returns
 *     一个MixinBuilder对象，通过{@code with(...)}函数生成临时类；被装饰的类需要继承这个
 *     生成的临时类，从而获取此 MixIn 定义的属性和方法。
 * @author 胡海星
 */
const mix = (superclass) => new MixinBuilder(superclass);

export default mix;
