////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@haixing_hu/common-validator';
import CredentialType from '../models/common/CredentialType';

/**
 * Verify whether a field value of an object is a valid credential type or a
 * string representation of a valid credential type.
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
function validateCredentialTypeField(value, context = {}) {
  const { owner, nullable, extraMessage } = context;
  const label = context.label ?? '证件类型';
  const whose = (owner ? `${owner}的` : '');
  if (value === undefined || value === null || value === '') {
    if (nullable) {
      return new ValidationResult(true);
    } else {
      return new ValidationResult(false, `请选择${whose}${label}`);
    }
  }
  if (CredentialType.has(value)) {
    return new ValidationResult(true);
  } else {
    const message = (extraMessage ? `: ${extraMessage}` : '');
    return new ValidationResult(false, `${whose}${label}不受支持${message}`);
  }
}

export default validateCredentialTypeField;
