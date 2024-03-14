////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  Label,
  Model,
  Normalizable, Nullable, Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import { trimUppercaseString } from '@haixing_hu/common-util';
import {
  validateEmailField,
  validateIntegerField, validateMobileField, validateTimestampField,
} from '@haixing_hu/common-validator';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';
import validatePersonGenderField
  from '../../validators/validate-person-gender-field';
import State from '../common/State';
import Gender from './Gender';

/**
 * 此模型表示用户信息。
 */
@Model
class User {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 用户名。
   */
  @Normalizable
  @Label('用户名')
  username = '';

  /**
   * 真实姓名。
   */
  @Normalizable
  @Label('姓名')
  @Nullable
  name = '';

  /**
   * 昵称。
   */
  @Normalizable
  @Label('昵称')
  @Nullable
  nickname = '';

  /**
   * 性别
   */
  @Normalizable
  @Validatable(validatePersonGenderField)
  @Type(Gender)
  @Label('性别')
  @Nullable
  gender = '';

  /**
   * 头像。
   */
  @Normalizable
  @Label('头像')
  @Nullable
  avatar = '';

  /**
   * 手机号码
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validateMobileField)
  @Label('手机号码')
  mobile = '';

  /**
   * 电子邮件地址。
   */
  @Normalizable
  @Validatable(validateEmailField)
  @Label('电子邮件地址')
  @Nullable
  email = '';

  /**
   * 状态。
   */
  @Normalizable
  @Validatable
  @Type(State)
  @Label('状态')
  state = State.NORMAL;

  /**
   * 是否是测试数据。
   */
  @Normalizable
  @Label('测试数据')
  test = false;

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('标记删除时间')
  @Nullable
  delete_time = '';
}

export default User;
