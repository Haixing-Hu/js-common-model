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
 * 此枚举表示账户类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class AccountType {
  static BANK_CARD = '银行卡';

  static CREDIT_CARD = '信用卡';

  static DEPOSIT_BOOK = '存折';

  static THIRD_PART = '第三方支付';

  static SETTLEMENT = '结算账户';

  static CHANGE = '零钱';

  static VIRTUAL = '虚拟货币';
}

export default AccountType;
