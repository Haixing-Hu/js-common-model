////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  validateIntegerField,
  validateTimestampField,
} from '@haixing_hu/common-validator';
import {
  ElementType,
  Model,
  Type,
  Normalizable,
  Validatable,
  Label,
  Nullable,
} from '@haixing_hu/common-decorator';
import KeyValuePair from '../common/KeyValuePair';
import Payload from '../common/Payload';
import SocialNetwork from './SocialNetwork';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此模型表示用户在社交网络中的账号。
 *
 * @author 胡海星
 */
@Model
class SocialNetworkAccount {
  /**
   * 唯一标识，系统自动生成。
   *
   * @type {string}
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 用户名。
   *
   * @type {string}
   */
  @Normalizable
  @Validatable
  @Label('用户名')
  username = '';

  /**
   * 所属社交网络的类型
   *
   * @type {SocialNetwork}
   */
  @Normalizable
  @Validatable
  @Type(SocialNetwork)
  @Label('所属社交网络')
  social_network = null;

  /**
   * 此账号在对应的社交网络中的App ID。
   *
   * @type {string}
   */
  @Normalizable
  @Validatable
  @Label('App ID')
  app_id = '';

  /**
   * 此账号在对应的社交网络中的Open ID。
   *
   * @type {string}
   */
  @Normalizable
  @Validatable
  @Label('Open ID')
  open_id = '';

  /**
   * 昵称。
   */
  @Normalizable
  @Label('昵称')
  @Nullable
  nickname = '';

  /**
   * 头像。
   */
  @Normalizable
  @Label('头像')
  @Nullable
  avatar = '';

  /**
   * 个人信息。
   */
  @Normalizable
  @ElementType(KeyValuePair)
  @Label('个人信息')
  @Nullable
  profiles = [];

  /**
   * 额外参数。
   */
  @Normalizable
  @ElementType(Payload)
  @Label('额外参数')
  @Nullable
  payloads = [];

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('创建时间')
  @Nullable
  create_time = '';

  /**
   * 对象的最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('最后一次修改时间')
  @Nullable
  modify_time = '';

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

export default SocialNetworkAccount;
