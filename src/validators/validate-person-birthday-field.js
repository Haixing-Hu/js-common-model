////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { IdentityCard, LocalDate, ValidationResult } from '@haixing_hu/common-validator';
import CredentialType from '../models/common/CredentialType';

/**
 * Verify whether a field value of an object is a valid birthday of a person.
 *
 * @param {string|Date} value
 *     The field value to be verified must be a string or a built-in `Date`
 *     object; for other types, an error will be reported in the returned
 *     verification result.
 * @param {object} context
 *     The validation context.
 * @return {ValidationResult}
 *     The validation result.
 * @author Haixing Hu
 */
function validatePersonBirthdayField(value, context = {}) {
  const { instance, owner, nullable, extraMessage } = context;
  const label = context.label ?? '出生日期';
  const whose = (owner ? `${owner}的` : '');
  if (value === undefined || value === null || value === '') {
    if (nullable) {
      return new ValidationResult(true);
    } else {
      return new ValidationResult(false, `请填写或选择${whose}${label}`);
    }
  }
  // check the format of the birthday
  if (!LocalDate.isValid(value)) {
    const message = (extraMessage ? `: ${extraMessage}` : '');
    return new ValidationResult(false, `${whose}${label}格式不正确${message}`);
  }
  // Check whether the birthday is consistent with the identity card of the person
  const credential = instance.credential;
  const type = credential?.type;
  const number = credential?.number;
  if ((CredentialType.of(type) === CredentialType.IDENTITY_CARD) && IdentityCard.isValid(number)) {
    const expected = Date.parse(IdentityCard.getBirthday(number));
    const actual = new Date(value).getTime();
    if (actual !== expected) {
      return new ValidationResult(false, `${whose}${label}和身份证号码不匹配`);
    }
  }
  return new ValidationResult(true);
}

export default validatePersonBirthdayField;
