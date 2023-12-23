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
 * 此枚举表示日期类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class DayType {
  static ANY = '任何日期';

  static WORKING_DAY = '工作日';

  static HOLIDAY = '节假日';

  static WEEKEND = '周末';
}

export default DayType;
