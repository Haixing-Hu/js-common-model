////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Enum } from '@haixing_hu/common-decorator';

/**
 * 此枚举表示验证场景。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class VerifyScene {
  /**
   * 注册。
   */
  static REGISTER = '注册';

  /**
   * 重置密码。
   */
  static RESET_PASSWORD = '重置密码';

  /**
   * 支付。
   */
  static PAY = '支付';

  /**
   * 退款。
   */
  static REFUND = '退款';

  /**
   * 验证手机号。
   */
  static VERIFY_MOBILE = '验证手机号';

  /**
   * 验证电子邮箱。
   */
  static VERIFY_EMAIL = '验证电子邮箱';

  /**
   * 实名认证。
   */
  static VERIFY_REALNAME = '实名认证';

  /**
   * 取药验证码。
   */
  static RECEIVE_DRUG = '取药验证码';

  /**
   * 更新信息。
   */
  static MODIFY = '更新信息';

  /**
   * 登陆。
   */
  static LOGIN = '登陆';

  /**
   * 绑定职工信息。
   */
  static BIND_EMPLOYEE = '绑定职工信息';

  /**
   * 其他。
   */
  static OTHER = '其他';
}

export default VerifyScene;
