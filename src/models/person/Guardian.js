////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@haixing_hu/common-validator';
import { Model } from '@haixing_hu/common-decorator';
import Person from './Person';

const NO_GUARDIAN_NAME = '无';
const NO_GUARDIAN_VALUE = 'NONE';
const NO_GUARDIAN_ID = -1;

/**
 * Model of a guardian.
 *
 * @author Haixing Hu
 */
@Model
class Guardian extends Person {
  /**
   * Validates the specified validatable fields of this object.
   *
   * A field is validatable if and only if it is decorated with the
   * `@{@link Validatable}` decorator.
   *
   * The implementation of `Guardian.prototype.validateField()` inherits the
   * implementation of `Person.prototype.validateField()`, and adds the special
   * validation rule for the `'adult'` field: i.e., the guardian must be a
   * valid adult.
   *
   * @param {string} field
   *     the names of fields to be validated. If the specified field does not
   *     exist nor non-validatable, this function does nothing and returns
   *     `null`.
   * @param {object} context
   *     The validation context. If this argument is not specified, an empty
   *     context is used.
   * @returns {ValidationResult|null}
   *     The validation result if the specified field exists; `null` otherwise.
   *     If the specified field exist but is non-validatable, returns the success
   *     validation result.
   * @override
   */
  validateField(field, context = {}) {
    if (field === 'adult') {
      const ageFrom = context.ageFrom ?? Person.defaultAgeFrom;
      const adultMinAge = context.adultMinAge ?? Person.defaultAdultMinAge;
      return this.isAdult(ageFrom, adultMinAge)
        ? new ValidationResult(true)
        : new ValidationResult(false, '监护人必须是成年人');
    } else {
      return super.validateField(field, context);
    }
  }

  /**
   * Validates this object.
   *
   * The implementation of `Guardian.prototype.validate()` inherits the
   * implementation of `Person.prototype.validate()`, and adds the special
   * validation rule for the `'adult'` field: i.e., if the function is called
   * to validate all fields of this `Guardian` object, besides checking all
   * validatable fields of this `Guardian` object, this function will also check
   * whether this guardian is a valid adult.
   *
   * @param {undefined|string|array} fields
   *     the names of fields to be validated. If this argument is not specified,
   *     or `undefined`, or `null`, or a string `'*'`, this function validates
   *     all validatable fields of this object; If this argument is an array of
   *     strings, this function validates all validatable fields specified
   *     in the array. If this argument is a string other than `'*'`, this
   *     function validates the field with the name equals to this argument;
   *     if the specified field does not exist nor non-validatable, this
   *     function does nothing.
   * @param {object} context
   *     The validation context. If this argument is not specified, an empty
   *     context is used.
   * @returns {ValidationResult}
   *     The result of validation.
   */
  validate(fields = '*', context = {}) {
    if (fields === undefined || fields === null || fields === '*') {
      const fields = Object.keys(this).push('adult');
      const results = fields.map((f) => this.validateField(f, context));
      return ValidationResult.merge(results);
    } else {
      return super.validate(fields, context);
    }
  }
}

export {
  NO_GUARDIAN_NAME,
  NO_GUARDIAN_VALUE,
  NO_GUARDIAN_ID,
  Guardian,
};

export default Guardian;
