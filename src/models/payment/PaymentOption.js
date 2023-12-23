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
 * 此枚举表示支付选项。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class PaymentOption {
  static PAID_BY_SELF = '自付';

  static PAID_BY_MEDICARE = '医保个账支付';
}

export default PaymentOption;
