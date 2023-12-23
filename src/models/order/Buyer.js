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
import Person from '../person/Person';

/**
 * 此模型表示购买者。
 *
 * @author 胡海星
 */
@Model
class Buyer extends Person {
  /**
   * Validates the specified validatable fields of this object.
   *
   * A field is validatable if and only if it is decorated with the
   * `@{@link Validatable}` decorator.
   *
   * The implementation of `Buyer.prototype.validateField()` inherits the
   * implementation of `Person.prototype.validateField()`, and adds the special
   * validation rule for the `'adult'` field: i.e., the buyer must be an adult.
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
        : new ValidationResult(false, '购买人必须是成年人');
    } else {
      return super.validateField(field, context);
    }
  }

  /**
   * Validates this object.
   *
   * The implementation of `Buyer.prototype.validate()` inherits the
   * implementation of `Person.prototype.validate()`, and adds the special
   * validation rule for the `'adult'` field: i.e., if the function is called
   * to validate all fields of this `Buyer` object, besides checking all
   * validatable fields of this `Buyer` object, this function will also check
   * whether this buyer is a valid adult.
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

export default Buyer;
