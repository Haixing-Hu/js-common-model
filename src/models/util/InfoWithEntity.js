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
  Normalizable,
  Validatable,
} from '@haixing_hu/common-decorator';
import Info from './Info';

/**
 * 此模型表示属于某个实体的可删除对象的基本信息。
 *
 * @author 胡海星
 */
@Model
class InfoWithEntity extends Info {
  /**
   * 对象所属实体。
   */
  @Normalizable
  @Validatable
  @Label('所属实体')
  entity = '';

  /**
   * 创建一个新的{@link InfoWithEntity}对象。
   *
   * @param {String} id
   *     新的{@link InfoWithEntity}对象的ID，如不提供则使用默认值''。
   * @param {String} entity
   *     新的{@link InfoWithEntity}对象的所属实体，如不提供则使用默认值''。
   * @param {String} code
   *     新的{@link InfoWithEntity}对象的编码，如不提供则使用默认值''。
   * @param {String} name
   *     新的{@link InfoWithEntity}对象的名称，如不提供则使用默认值''。
   * @param {String} delete_time
   *     新的{@link Info}对象的标记删除时间，如不提供则使用默认值''。
   */
  constructor(id = '', entity = '', code = '', name = '', delete_time = '') {
    super(id, code, name, delete_time);
    this.entity = entity;
  }
}

export default InfoWithEntity;
