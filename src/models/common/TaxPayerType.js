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
 * 此枚举表示纳税人类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class TaxPayerType {
  static SMALL_SCALE = '小规模纳税人';

  static GENERAL = '一般纳税人';

  static OTHER = '其他';
}

export default TaxPayerType;
