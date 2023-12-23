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
 * 此枚举表示货币单位。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class Currency {
  static CNY = '人民币';

  static HKD = '港币';

  static TWD = '新台币';

  static USD = '美元';

  static EUR = '欧元';

  static GBP = '英镑';

  static JPY = '日元';

  static VIRTUAL = '虚拟货币';
}

export default Currency;
