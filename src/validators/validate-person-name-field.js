////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  PersonName,
  validateStringFieldByRule,
} from '@haixing_hu/common-validator';

/**
 * Verify whether a field value of an object is a string representing a person's
 * name.
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
function validatePersonNameField(value, context = {}) {
  context.label = context.label || '姓名';
  context.owner = context.owner || value;
  context.extraMessage = context.extraMessage || '请填写正确的中英文名，中文名中勿加空格';
  return validateStringFieldByRule(value, PersonName, context);
}

export default validatePersonNameField;
