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
 * 此枚举表示医保类别。
 *
 * @author 胡海星
 */
@Enum
class MedicareType {
  static EMPLOYEE = '城镇职工基本医疗保险';

  static RESIDENT = '城镇居民基本医疗保险';

  static NEW_RURAL_COOPERATIVE = '新型农村合作医疗保险';

  static OTHER = '其它医疗保险';
}

export default MedicareType;
