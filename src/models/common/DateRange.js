////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  Model,
  Validatable,
  Normalizable,
  Label,
  Nullable,
} from '@haixing_hu/common-decorator';
import { validateDateField } from '@haixing_hu/common-validator';
import { normalizeDate } from '@haixing_hu/common-normalizer';

/**
 * 此模型表示日期范围（闭区间）。
 *
 * @author 胡海星
 */
@Model
class DateRange {
  /**
   * 开始日期（闭区间），表示为'YYYY-MM-DD'的字符串格式。
   */
  @Validatable(validateDateField)
  @Normalizable(normalizeDate)
  @Label('开始日期')
  @Nullable
  start = '';

  /**
   * 结束日期（闭区间），表示为'YYYY-MM-DD'的字符串格式。
   */
  @Validatable(validateDateField)
  @Normalizable(normalizeDate)
  @Label('结束日期')
  @Nullable
  end = '';

  /**
   * 日期的字符串表示格式。此格式可被`dayjs`框架进行格式化和解析。
   */
  static get FORMAT() {
    return 'YYYY-MM-DD';
  }
}

export default DateRange;
