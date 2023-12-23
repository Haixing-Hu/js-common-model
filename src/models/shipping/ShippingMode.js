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
 * 此枚举表示配送方式。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class ShippingMode {
  static NONE = '无需配送';

  static EXPRESS = '快递';

  static SELF = '自提';

  static EMAIL = '电子邮件发送';

  static SMS = '手机短信发送';
}

export default ShippingMode;
