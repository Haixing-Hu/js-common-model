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
 * 此枚举表示支付模式。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class PaymentMode {
  static APP = 'App内支付';

  static LITE_APP = '微信小程序内支付';

  static WAP = '移动端网站支付';

  static WEB = 'PC网站支付';

  static JSAPI = 'APP内置浏览器支付';

  static ACTIVE_QR = '扫商家二维码支付';

  static PASSIVE_QR = '被商家扫二维码支付';

  static OFFLINE = '线下转账支付';

  static UNKNOWN = '未知支付模式';
}

export default PaymentMode;
