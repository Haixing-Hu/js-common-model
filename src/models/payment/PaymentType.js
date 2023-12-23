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
 * 此枚举表示支付类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class PaymentType {
  static NORMAL = '普通支付';

  static MEDICARE = '医保个账支付';
}

export default PaymentType;
