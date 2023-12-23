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
 * 此枚举表示退货发起方。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class ReturnIssuer {
  static BUYER = '购买人';

  static INSURANT = '被保险人';

  static INSURANT_GUARDIAN = '被保险人的监护人';

  static SELLER = '卖家';

  static PLATFORM = '平台';

  static MEDICARE = '医保个账';
}

export default ReturnIssuer;
