////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import { Label, Normalizable, Validatable } from '@haixing_hu/common-decorator';
import { normalizeDate } from '@haixing_hu/common-normalizer';
import validatePersonBirthdayField from '../../validators/validate-person-birthday-field';

/**
 * 解析日期时间时使用的格式。
 *
 * 注意我们使用'YYYY-M-D'而非'YYYY-MM-DD'，是为了有更好的容错性。
 *
 * @author 胡海星
 */
const DATE_PARSE_FORMAT = 'YYYY-M-D';

/**
 * 默认的成年人最小年龄
 *
 * @author 胡海星
 */
let DEFAULT_ADULT_MIN_AGE = 18;

/**
 * 默认的年龄计算开始时间。
 *
 * @author 胡海星
 */
let DEFAULT_AGE_FROM = null;

/**
 * 此 MixIn 用于为指定的带有生日属性的模型类添加年龄相关计算函数。
 *
 * 用法如下：
 *
 * ```js
 * &#064;Model
 * class MyClass extends WithBirthday(MySuperClass) {
 *
 *   &#064;Normalizable(trimString)
 *   &#064;Validatable(validatePersonBirthdayField)
 *   &#064;Label('出生日期')
 *   birthday = '';
 * }
 * ```
 *
 * 关于此 MixIn 的设计模式参见：
 * https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 *
 * @param {Class} superclass
 *     被装饰的模型类的父类，如果没有父类，可以为Object。
 * @returns
 *     一个新的临时类，被装饰的类需要继承这个临时类，从而获取此 MixIn 定义的属性和方法。
 * @author 胡海星
 */
const WithBirthday = (superclass) => class extends superclass {
  /**
   * 出生日期，以字符串形式‘YYYY-MM-DD’表示。
   */
  @Normalizable(normalizeDate)
  @Validatable(validatePersonBirthdayField)
  @Label('出生日期')
  birthday = '';

  /**
   * 根据生日计算年龄，以年为单位。
   *
   * 注意：按照保司规则，在承保日当天过生日的，按照规则允许其承保。因此如果计算年龄判定是否可
   * 承保，必须按小数计算年龄(即设置此函数的accuracy参数为true)，并要求承包人的年龄严格大于
   * 指定的年龄整数。
   *
   * @param {String} ageFrom
   *     可选参数，表示计算年龄的起始日期，以'YYYY-MM-DD'格式的字符串表示；若此参数不存在，
   *     使用{@link Person.defaultAgeFrom}作为计算的起始日期；
   *     若{@link Person.defaultAgeFrom}为null，则使用当前日期作为计算的起始日期。
   * @param {String} unit
   *     可选参数，表示年龄的计量单位，可选值为'day', 'month', 'year'。默认值为'year'，
   *     表示按年计量。
   * @param {Boolean} accuracy
   *     可选参数，表示计算结果是否保留小数部分。默认值为false。
   * @return {Number}
   *     当前对象从指定日期开始计算的年龄，以年为单位。如当前对象没有设置出生日期，则返回-1。
   */
  age(ageFrom = DEFAULT_AGE_FROM, unit = 'year', accuracy = false) {
    if (!['day', 'monty', 'year'].includes(unit)) {
      throw new Error('Unit only support "day", "month", and "year"');
    }
    if (this.birthday) {
      const birthday = dayjs(this.birthday, DATE_PARSE_FORMAT);
      // 注意，下面将按照 today.startOf('day') 计算年龄，
      // 这样如果在去年今天午夜0点之后出生的，不算1岁;
      // 只有到去年今天午夜0点及其前出生的，才算1岁。
      const today = (ageFrom ? dayjs(ageFrom) : dayjs());
      const startOfToday = today.startOf('day');
      return startOfToday.diff(birthday, unit, accuracy);
    }
    return -1;
  }

  /**
   * 判定当前客户是否是成年人。
   *
   * @param {String} ageFrom
   *     可选参数，表示计算年龄的起始日期，以'YYYY-MM-DD'格式的字符串表示；若此参数不存在，
   *     使用{@link Person.defaultAgeFrom}作为计算的起始日期；
   *     若{@link Person.defaultAgeFrom}为null，则使用当前日期作为计算的起始日期。
   * @param {Number} adultMinAge
   *     可选参数，表示成年人的最小年龄。如不提供，则使用{@link Person.defaultAdultMinAge}。
   * @return {Boolean}
   *     若当前客户是成年人，则返回true，否则返回false；
   */
  isAdult(ageFrom = DEFAULT_AGE_FROM, adultMinAge = DEFAULT_ADULT_MIN_AGE) {
    if (this.birthday) {
      const age = this.age(ageFrom, 'year', true);
      return age >= adultMinAge;
    } else {
      // 默认认为是成年人
      return true;
    }
  }

  /**
   * 获取默认的年龄计算起始日期。
   *
   * @return {String}
   *     默认的年龄计算起始日期，以字符串形式表示，格式为'YYYY-M-D'；null或空字符串则表示从
   *     今天开始算起。
   */
  static get defaultAgeFrom() {
    return DEFAULT_AGE_FROM;
  }

  /**
   * 设置默认的年龄计算起始日期。
   *
   * @param {String} from
   *     默认的年龄计算起始日期，以字符串形式表示，格式为'YYYY-M-D'；null或空字符串则表示从
   *     今天开始算起。
   */
  static set defaultAgeFrom(from) {
    DEFAULT_AGE_FROM = from;
  }

  /**
   * 获取默认的成年人最小年龄。
   *
   * @return {Number}
   *     默认的成年人最小年龄。
   */
  static get defaultAdultMinAge() {
    return DEFAULT_ADULT_MIN_AGE;
  }

  /**
   * 设置默认的成年人最小年龄。
   *
   * @param {Number} minAge
   *     默认的成年人最小年龄。
   */
  static set defaultAdultMinAge(minAge) {
    DEFAULT_ADULT_MIN_AGE = minAge;
  }
};

export default WithBirthday;
