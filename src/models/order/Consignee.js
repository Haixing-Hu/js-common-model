////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type } from '@haixing_hu/common-decorator';
import Credential from '../common/Credential';
import Address from '../contact/Address';

/**
 * 此模型表示收件人。
 *
 * @author 胡海星
 */
@Model
class Consignee {
  /**
   * ID。
   */
  id = '';

  /**
   * 所对应的用户的ID。
   */
  user_id = '';

  /**
   * 此收件地址配置标题。
   */
  title = '';

  /**
   * 收件人姓名。
   */
  name = '';

  /**
   * 收件人手机号码。
   */
  mobile = '';

  /**
   * 收件人电子邮件地址。
   */
  email = '';

  /**
   * 收件人证件信息。
   */
  @Type(Credential)
  credential = null;

  /**
   * 收件人地址。
   */
  @Type(Address)
  address = null;

  /**
   * 备注。
   */
  comment = '';

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  create_time = '';

  /**
   * 对象的最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  modify_time = '';

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  delete_time = '';
}

export default Consignee;
