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
  Normalizable, Nullable,
  Validatable,
} from '@haixing_hu/common-decorator';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';
import { validateTimestampField } from '@haixing_hu/common-validator';

/**
 * 此模型表示属于某个实体的可删除对象的基本信息。
 *
 * @author 胡海星
 */
@Model
class InfoWithEntity {
  /**
   * 对象的ID。
   */
  @Normalizable
  @Label('ID')
  id = '';

  /**
   * 对象所属实体。
   */
  @Normalizable
  @Validatable
  @Label('所属实体')
  entity = '';

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
   * 创建一个新的{@link InfoWithEntity}对象。
   *
   * @param {string} id
   *     新的{@link InfoWithEntity}对象的ID，如不提供则使用默认值''。
   * @param {string} entity
   *     新的{@link InfoWithEntity}对象的所属实体的名称，如不提供则使用默认值''。
   * @param {string} code
   *     新的{@link InfoWithEntity}对象的编码，如不提供则使用默认值''。
   * @param {string} name
   *     新的{@link InfoWithEntity}对象的名称，如不提供则使用默认值''。
   * @param {string} delete_time
   *     新的{@link Info}对象的标记删除时间，如不提供则使用默认值''。
   */
  constructor(id = '', entity = '', code = '', name = '', delete_time = '') {
    this.id = id;
    this.entity = entity;
    this.code = code;
    this.name = name;
    this.delete_time = delete_time;
  }

  /**
   * 创建一个新的{@link InfoWithEntity}对象。
   *
   * @param {string} id
   *     新的{@link InfoWithEntity}对象的ID。
   */
  static forId(id) {
    return new InfoWithEntity(id, '', '', '', '');
  }

  /**
   * 创建一个新的{@link InfoWithEntity}对象。
   *
   * @param {string} entity
   *     新的{@link InfoWithEntity}对象所属实体的名称。
   * @param {string} code
   *     新的{@link InfoWithEntity}对象的编码。
   */
  static forCode(entity, code) {
    return new InfoWithEntity('', entity, code, '', '');
  }

  /**
   * 创建一个新的{@link InfoWithEntity}对象。
   *
   * @param {string} entity
   *     新的{@link InfoWithEntity}对象所属实体的名称。
   * @param {string} name
   *     新的{@link InfoWithEntity}对象的名称。
   */
  static forName(entity, name) {
    return new InfoWithEntity('', entity, '', name, '');
  }
}

export default InfoWithEntity;
