////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@haixing_hu/common-validator';

/**
 * 验证指定的{@link Insurant}对象的监护人是否合法。
 *
 * @param {Insurant} insurant
 *     待验证的{@link Insurant}对象。
 * @param {String} ageFrom
 *     可选参数，表示计算年龄的起始日期，以'YYYY-MM-DD'格式的字符串表示；若此参数不存在，
 *     使用{@link Person.defaultAgeFrom}作为计算的起始日期；
 *     若{@link Person.defaultAgeFrom}为null，则使用当前日期作为计算的起始日期。
 * @param {Number} adultMinAge
 *     可选参数，表示成年人的最小年龄。如不提供，则使用{@link Person.defaultAdultMinAge}。
 * @return {ValidationResult}
 *     验证结果。
 * @author 胡海星
 */
export default function validateInsurantGuardian(insurant, ageFrom, adultMinAge) {
  const who = (insurant.name ? insurant.name : '');
  if (insurant.needGuardian(ageFrom, adultMinAge)) {
    if (!insurant.guardian) {
      return new ValidationResult(false, `未成年人${who}必须指定监护人`);
    }
    // 检查其监护人是否合法
    const r = insurant.guardian.validate('*', { ageFrom, adultMinAge });
    if (!r.success) {
      return r;
    }
    if (insurant.equals(insurant.guardian)) {
      const that = (insurant.guardian.name ? insurant.guardian.name : '');
      return new ValidationResult(false, `未成年人${who}与其监护人${that}不应有相同证件`);
    }
  } else if (insurant.guardian) {
    return new ValidationResult(false, `成年人${who}不需要指定监护人`);
  }
  return new ValidationResult(true);
}
