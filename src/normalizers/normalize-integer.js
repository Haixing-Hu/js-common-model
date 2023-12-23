////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isUndefinedOrNull } from '@haixing_hu/common-util';
import { Integer } from '@haixing_hu/common-validator';

/**
 * 将某个字段值正则化为表示整数的`Number`对象。
 *
 * @param {string|number} value
 *     待正则化的字段值。
 * @return {number}
 *     正则化的结果。
 */
export default function normalizeInteger(value) {
  if (isUndefinedOrNull(value)) {
    return value;
  } else if (typeof value === 'string') {
    if (value === '') {
      return 0;
    } if (Integer.isValid(value)) {
      return Number.parseInt(value, 10);
    } else {
      throw new RangeError(`Invalid integer format: ${value}`);
    }
  } else if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return Math.floor(value);   // 删除小数点后面可能的0
    } else {
      throw new RangeError(`Invalid integer value: ${value}`);
    }
  } else if (value instanceof Number) {
    value = Number(value);        // 将wrapped object转换为primitive
    if (Number.isInteger(value)) {
      return Math.floor(value);   // 删除小数点后面可能的0
    } else {
      throw new RangeError(`Invalid integer value: ${value}`);
    }
  } else {
    throw new RangeError(`Invalid integer format: type is ${typeof value}`);
  }
}
