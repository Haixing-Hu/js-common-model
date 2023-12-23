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
 * 此枚举表示被保险人状态。
 *
 * @author 胡海星
 */
@Enum
class InsuredStatus {
  static RECOVERY = '痊愈';

  static UNDER_TREATMENT = '治疗中';

  static DEATH = '身故';

  static OTHER = '其他';
}

export default InsuredStatus;
