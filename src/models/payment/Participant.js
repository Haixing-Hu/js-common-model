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
import Info from '../common/Info';
import Account from './Account';

/**
 * 此模型表示交易的参与者。
 *
 * @author 胡海星
 */
@Model
class Participant {
  /**
   * 参与者ID，此ID参与者表示的对象在系统内部的ID。
   *
   * 若参与者是个人，此ID是{@link Person}对象的ID；若参与者是机构，此ID是
   * {@link Organization}对象的ID。
   */
  id = '';

  /**
   * 参与者类型，个人或机构。
   */
  type = '';

  /**
   * 参与者姓名或名称。
   *
   * 对于个人参与者，通常是个人真实姓名；对于机构参与者，通常是机构注册名称。
   */
  name = '';

  /**
   * 参与者证件。
   *
   * 对于个人参与者，证件通常是身份证，社保卡等；对于机构参与者，证件通常是营业执照、
   * 组织机构代码证等。
   */
  @Type(Credential)
  credential = null;

  /**
   * 参与者手机号码。
   *
   * 对于个人参与者，通常是手机号码；对于机构参与者，可以是固定电话。
   */
  phone = '';

  /**
   * 参与者电子邮件地址。
   */
  email = '';

  /**
   * 订单所属类别的基本信息。
   */
  @Type(Info)
  category = null;

  /**
   * 参与者使用的账户信息。
   */
  @Type(Account)
  account = null;
}

export default Participant;
