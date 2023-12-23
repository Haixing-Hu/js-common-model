////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  IdentityCard,
  Passport,
  OfficerCard,
  OtherCredential,
  ValidationResult,
} from '@haixing_hu/common-validator';
import CredentialType from '../models/common/CredentialType';

/**
 * Verify whether a field value of an object is a string representation of a
 * valid credential number.
 *
 * @param {string} value
 *     The field value to be verified must be of string type; for other types,
 *     an error will be reported in the returned verification result.
 * @param {object} context
 *     The validation context.
 * @return {ValidationResult}
 *     The validation result.
 * @author Haixing Hu
 */
function validateCredentialNumberField(value, context = {}) {
  const { instance, owner, nullable, label, extraMessage } = context;
  const whose = (owner ? `${owner}的` : '');
  const type = CredentialType.of(instance.type);
  const credential = (type ? type.name : '证件');
  if (value === undefined || value === null || value === '') {
    if (nullable) {
      return new ValidationResult(true);
    } else {
      return new ValidationResult(false, `请填写${whose}${credential}${label}`);
    }
  }
  let valid;
  switch (type) {
    case CredentialType.IDENTITY_CARD:
      valid = IdentityCard.isValid(value);
      break;
    case CredentialType.PASSPORT:
      valid = Passport.isValid(value);
      break;
    case CredentialType.OFFICER_CARD:
      valid = OfficerCard.isValid(value);
      break;
    case CredentialType.OTHER:
    default:
      valid = OtherCredential.isValid(value);
      break;
  }
  if (valid) {
    return new ValidationResult(true);
  } else {
    const message = (extraMessage ? `: ${extraMessage}` : '');
    return new ValidationResult(false, `${whose}${credential}${label}格式不正确${message}`);
  }
}

export default validateCredentialNumberField;
