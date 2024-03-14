////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type } from '@haixing_hu/common-decorator';
import Info from '../util/Info';

/**
 * 此模型表示交易的参与者。
 *
 * @author 胡海星
 */
@Model
class Account {
  /**
   * 唯一标识，系统自动生成。
   */
  id = '';

  /**
   * 所属 App 的基本信息。
   */
  @Type(Info)
  app = null;

  /**
   * 所有者的实体类型。
   */
  owner_type = '';

  /**
   * 所有者的实体ID。
   */
  owner_id = '';

  /**
   * 账户类别。
   */
  type = '';

  /**
   * 账户名称，此名称是该账户在支付平台内部的显示名称。
   */
  name = '';

  /**
   * 账户号码。
   *
   * 如该账户不是平台内部账户，则此号码对应于第三方支付的账号，或者银行卡卡号等。
   */
  number = '';

  /**
   * 账户账号供应商的基本信息。
   *
   * 如该账户不是平台内部账户，则此对象对应于第三方支付的渠道供应商信息，
   * 或者银行卡开户行信息等。
   */
  @Type(Info)
  provider = null;

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

export default Account;
