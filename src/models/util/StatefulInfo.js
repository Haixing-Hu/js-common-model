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
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import State from '../common/State';
import Info from './Info';

/**
 * 此模型表示带状态的对象实体的基本信息。
 *
 * @author 胡海星
 */
@Model
class StatefulInfo extends Info {
  /**
   * 对象的状态。
   */
  @Normalizable
  @Validatable
  @Type(State)
  @Label('状态')
  state = '';

  /**
   * 创建一个新的{@link Info}对象。
   *
   * @param {String} id
   *     新的{@link Info}对象的ID，如不提供则使用默认值''。
   * @param {String} code
   *     新的{@link Info}对象的编码，如不提供则使用默认值''。
   * @param {String} name
   *     新的{@link Info}对象的名称，如不提供则使用默认值''。
   * @param {String} state
   *     新的{@link Info}对象的状态，如不提供则使用默认值''。
   * @param {String} delete_time
   *     新的{@link Info}对象的标记删除时间，如不提供则使用默认值''。
   */
  constructor(id = '', code = '', name = '', state = '', delete_time = '') {
    super(id, code, name, delete_time);
    this.state = state;
  }
}

export default StatefulInfo;
