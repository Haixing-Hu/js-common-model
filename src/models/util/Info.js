////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { validateTimestampField } from '@haixing_hu/common-validator';
import {
  Label,
  Model,
  Normalizable,
  Nullable,
  Validatable,
} from '@haixing_hu/common-decorator';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此模型表示对象实体的基本信息。
 *
 * @author 胡海星
 */
@Model
class Info {
  /**
   * 对象的ID。
   */
  @Normalizable
  @Label('ID')
  id = '';

  /**
   * 对象的编码。
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 对象的名称。
   */
  @Normalizable
  @Label('名称')
  name = '';

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

  /**
   * 创建一个新的{@link Info}对象。
   *
   * @param {String} id
   *     新的{@link Info}对象的ID，如不提供则使用默认值''。
   * @param {String} code
   *     新的{@link Info}对象的编码，如不提供则使用默认值''。
   * @param {String} name
   *     新的{@link Info}对象的名称，如不提供则使用默认值''。
   * @param {String} delete_time
   *     新的{@link Info}对象的标记删除时间，如不提供则使用默认值''。
   */
  constructor(id = '', code = '', name = '', delete_time = '') {
    this.id = id;
    this.code = code;
    this.name = name;
    this.delete_time = delete_time;
  }
}

export default Info;
