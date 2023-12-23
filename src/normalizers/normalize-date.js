////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

/**
 * 可解析的日期格式。
 */
const CUSTOM_PARSE_FORMAT = [
  'YYYY-M-D',
  'YYYY/M/D',
];

/**
 * 日期的标准显示格式。
 */
const DISPLAY_FORMAT = 'YYYY-MM-DD';

/**
 * 将某个字段值正则化为表示日期的字符串。
 *
 * @param {String|Date} value
 *     待正则化的字段值。
 * @return {String}
 *     正则化的结果。
 */
export default function normalizeDate(value) {
  // console.log('normalizeDate: value = ', value);
  if ((value === undefined) || (value === null) || (value === '')) {
    return '';
  } else if (typeof value === 'string') {
    // 注意: customParseFormat插件如果以数组形式传递自定义解析格式，则不能正确处理时区
    // 参考这个issue: https://github.com/iamkun/dayjs/issues/1750
    // const date = dayjs.utc(value, CUSTOM_PARSE_FORMAT, false);
    // if (!date.isValid()) {
    //   throw new RangeError(`Invalid date value: ${value}`);
    // }
    let date = null;
    for (const format of CUSTOM_PARSE_FORMAT) {
      const t = dayjs.utc(value, format, false);
      if (t.isValid()) {
        date = t;      // 永远使用后面的匹配，即更严格的匹配
      }
    }
    if (date === null) {
      throw new RangeError(`Invalid date value: ${value}`);
    }
    return date.format(DISPLAY_FORMAT);
  } else if (value instanceof Date) {
    return dayjs(value).format(DISPLAY_FORMAT);
  } else {
    throw new RangeError(`Invalid date format: type is ${typeof value}`);
  }
}
