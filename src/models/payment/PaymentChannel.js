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
 * 此枚举表示支付渠道。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class PaymentChannel {
  static ALIPAY = '支付宝';

  static WECHAT_PAY = '微信';

  static UNION_PAY = '银联';

  static MEDICARE = '医保个账';
}

export default PaymentChannel;
