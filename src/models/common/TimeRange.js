////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model } from '@haixing_hu/common-decorator';

/**
 * 此模型表示时间范围（前闭后开区间）。
 *
 * @author 胡海星
 */
@Model
class TimeRange {
  /**
   * 开始时间（闭区间），表示为'HH:mm:ss'的字符串格式。
   */
  start = '';

  /**
   * 结束时间（开区间），表示为'HH:mm:ss'的字符串格式。
   */
  end = '';

  /**
   * 时间的字符串表示格式。此格式可被`dayjs`框架进行格式化和解析。
   */
  static get FORMAT() {
    return 'HH:mm:ss';
  }
}

export default TimeRange;
