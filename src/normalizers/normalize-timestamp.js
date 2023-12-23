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
 * 可解析的时间戳格式。
 */
const CUSTOM_PARSE_FORMAT = [
  'YYYY-M-D',
  'YYYY-M-Dz',
  'YYYY-M-DZ',
  'YYYY-M-DTH:m',
  'YYYY-M-DTH:mz',
  'YYYY-M-DTH:mZ',
  'YYYY-M-DTH:m:s',
  'YYYY-M-DTH:m:sz',
  'YYYY-M-DTH:m:sZ',
  'YYYY-M-DTH:m:s.S',
  'YYYY-M-DTH:m:s.Sz',
  'YYYY-M-DTH:m:s.SZ',
  'YYYY-M-DTH:m:s.SS',
  'YYYY-M-DTH:m:s.SSz',
  'YYYY-M-DTH:m:s.SSZ',
  'YYYY-M-DTH:m:s.SSS',
  'YYYY-M-DTH:m:s.SSSz',
  'YYYY-M-DTH:m:s.SSSZ',
];

/**
 * 将某个字段值正则化为表示时间戳的字符串。
 *
 * @param {String|Date} value
 *     待正则化的字段值。
 * @return {String}
 *     正则化的结果。
 */
export default function normalizeTimestamp(value) {
  // console.log('normalizeTimestamp: value = ', value);
  if ((value === undefined) || (value === null) || (value === '')) {
    return value;
  } else if (typeof value === 'string') {
    // 注意: customParseFormat插件如果以数组形式传递自定义解析格式，则不能正确处理时区
    // 参考这个issue: https://github.com/iamkun/dayjs/issues/1750
    // const timestamp = dayjs.utc(value, CUSTOM_PARSE_FORMAT, false);
    // if (!timestamp.isValid()) {
    //   throw new RangeError(`Invalid timestamp value: ${value}`);
    // }
    let timestamp = null;
    for (const format of CUSTOM_PARSE_FORMAT) {
      const t = dayjs.utc(value, format, false);
      if (t.isValid()) {
        timestamp = t;      // 永远使用后面的匹配，即更严格的匹配
      }
    }
    if (timestamp === null) {
      throw new RangeError(`Invalid timestamp value: ${value}`);
    }
    return timestamp.toISOString();
  } else if (value instanceof Date) {
    return dayjs(value).toISOString();
  } else {
    throw new RangeError(`Invalid timestamp format: type is ${typeof value}`);
  }
}
