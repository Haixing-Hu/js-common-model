////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { IdentityCard, ValidationResult } from '@haixing_hu/common-validator';
import CredentialType from '../models/common/CredentialType';
import Gender from '../models/person/Gender';

/**
 * Verify whether a field value of an object is a valid gender of a person.
 *
 * @param {string|Gender} value
 *     The field value to be verified must be a string or a `Gender` object; for
 *     other types, an error will be reported in the returned verification result.
 * @param {object} context
 *     The validation context.
 * @return {ValidationResult}
 *     The validation result.
 * @author Haixing Hu
 */
function validatePersonGenderField(value, context = {}) {
  const { instance, owner, nullable, extraMessage } = context;
  const label = context.label ?? '性别';
  const whose = (owner ? `${owner}的` : '');
  if (value === undefined || value === null || value === '') {
    if (nullable) {
      return new ValidationResult(true);
    } else {
      return new ValidationResult(false, `请填写或选择${whose}${label}`);
    }
  }
  // check the format of the birthday
  if (!Gender.has(value)) {
    const message = (extraMessage ? `: ${extraMessage}` : '');
    return new ValidationResult(false, `${whose}${label}只能是“男”或“女”${message}`);
  }
  // Check whether the birthday is consistent with the identity card of the person
  const credential = instance.credential;
  const type = credential?.type;
  const number = credential?.number;
  if ((CredentialType.of(type) === CredentialType.IDENTITY_CARD) && IdentityCard.isValid(number)) {
    const expected = Gender.of(IdentityCard.getGender(number));
    const actual = Gender.of(value);
    if (actual !== expected) {
      return new ValidationResult(false, `${whose}${label}和身份证号码不匹配`);
    }
  }
  return new ValidationResult(true);
}

export default validatePersonGenderField;
