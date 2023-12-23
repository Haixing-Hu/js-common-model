////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  Label,
  ElementType,
  Model,
  Normalizable,
  Nullable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import Person from './Person';
import Guardian from './Guardian';
import KeyValuePair from '../common/KeyValuePair';
import Kinship from '../common/Kinship';
import validateInsurantGuardian from './impl/validate-insurant-guardian';
import ReturnStatus from '../order/ReturnStatus';

/**
 * 此模型表示受保人
 *
 * @author 胡海星
 */
@Model
class Insurant extends Person {
  /**
   * 监护人。
   */
  @Normalizable
  @Validatable
  @Type(Guardian)
  @Label('监护人')
  @Nullable
  guardian = null;

  /**
   * 与监护人的关系。
   */
  @Normalizable
  @Validatable
  @Type(Kinship)
  @Label('与监护人关系')
  kinship = null;

  /**
   * 退款状态。
   *
   * FIXME: Shall we need this field? -- starfish
   */
  @Normalizable
  @Validatable
  @Type(ReturnStatus)
  @Label('退款状态')
  return_status = null;

  /**
   * 额外参数。
   */
  @Normalizable
  @Validatable
  @ElementType(KeyValuePair)
  @Label('额外参数')
  payload = null;

  /**
   * 为此参保者设置新的证件。
   *
   * 若新证件为合法的身份证，则根据新身份证的号码，自动设置此参保者的性别和出生日期。若参保者
   * 的出生日期重新设置后，该参保者为成年人，则清空其监护人。
   *
   * @param {Credential} credential
   *     指定的证件。
   * @param {Object} changes
   *     可选，用于存储对当前{@link Insurant}对象的改变；若不提供此参数则忽略。
   */
  setCredential(credential, changes) {
    super.setCredential(credential, changes);
    if (this.isAdult()) {
      this.guardian = null;
      if (changes) {
        changes.guardian = null;
      }
    }
  }

  /**
   * 为此参保者设置出生日期。
   *
   * 若参保者的出生日期重新设置后，该参保者为成年人，则清空其监护人。
   *
   * @param {String} birthday
   *     指定的出生日期。
   * @param {Object} changes
   *     可选，用于存储对当前{@link Insurant}对象的改变；若不提供此参数则忽略。
   */
  setBirthday(birthday, changes) {
    if (birthday === undefined || birthday === null) {
      this.birthday = '';
      if (changes) {
        changes.birthday = '';
      }
    } else {
      this.birthday = birthday;
      if (changes) {
        changes.birthday = birthday;
      }
      if (this.isAdult()) {
        this.guardian = null;
        if (changes) {
          changes.guardian = null;
        }
      }
    }
  }

  /**
   * 判定当前投保人是否需要监护人。
   *
   * @param {String} ageFrom
   *     可选参数，表示计算年龄的起始日期，以'YYYY-MM-DD'格式的字符串表示；若此参数不存在，
   *     使用{@link Person.defaultAgeFrom}作为计算的起始日期；
   *     若{@link Person.defaultAgeFrom}为null，则使用当前日期作为计算的起始日期。
   * @param {Number} adultMinAge
   *     可选参数，表示成年人的最小年龄。如不提供，则使用{@link Person.defaultAdultMinAge}。
   * @return
   *     若当前投保人需要监护人，则返回true，否则返回false。若当前投保人
   *     年龄未确定，则返回false。
   */
  needGuardian(ageFrom = Person.defaultAgeFrom, adultMinAge = Person.defaultAdultMinAge) {
    if (this.birthday === '') {
      return false;
    }
    return !this.isAdult(ageFrom, adultMinAge);
  }

  /**
   * 设置当前参保者的监护人。
   *
   * 若指定的监护人不为null，且此参保者没有手机号码或电子邮件，则将该监护人的手机号码
   * 或电子邮件设置为此参保者的手机号码或电子邮件。
   *
   * @param {Guardian} guardian
   *     待设置的监护人对象，可以为null。
   * @param {Object} changes
   *     可选，用于存储对当前{@link Insurant}对象的改变；若不提供此参数则忽略。
   */
  setGuardian(guardian, changes) {
    if (guardian === undefined || guardian === null) {
      this.guardian = null;
      if (changes) {
        changes.guardian = null;
      }
    } else {
      this.guardian = guardian;   // 注意这里是引用
      if (changes) {
        changes.guardian = guardian;
      }
      if (!this.mobile && guardian.mobile) {
        this.mobile = guardian.mobile;
        if (changes) {
          changes.mobile = guardian.mobile;
        }
      }
      if (!this.email && guardian.email) {
        this.email = guardian.email;
        if (changes) {
          changes.email = guardian.email;
        }
      }
    }
  }

  /**
   * 判定当前对象是否拥有{@link #kinship}属性。
   *
   * @return
   *     若拥有则返回true，否则返回false。
   */
  hasKinship() {
    return (this.kinship !== undefined
        && this.kinship !== null
        && this.kinship !== '');
  }

  /**
   * 判定当前参保人是否可以使用医保个账支付。
   *
   * @return
   *     若可以则返回true，否则返回false。
   */
  canPaidByMedicare() {
    return Kinship.directs().find((k) => k.value === this.kinship) !== undefined;
  }

  /**
   * 复制当前参保人的监护人的联系方式到当前参保人的信息中。
   */
  copyGuardianContact() {
    if (!this.guardian) {
      return;
    }
    if (!this.mobile) {
      this.mobile = this.guardian.mobile;
    }
    if (!this.email) {
      this.email = this.guardian.email;
    }
  }

  /**
   * Validates the specified validatable fields of this object.
   *
   * A field is validatable if and only if it is decorated with the
   * `@{@link Validatable}` decorator.
   *
   * The implementation of `Insurant.prototype.validateField()` inherits the
   * implementation of `Person.prototype.validateField()`, and adds the special
   * validation rule for the `'guardian'` field: i.e., the insurant need a valid
   * guardian if and only if it is not an adult.
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
    if (field === 'guardian') {
      const ageFrom = context.ageFrom ?? Person.defaultAgeFrom;
      const adultMinAge = context.adultMinAge ?? Person.defaultAdultMinAge;
      return validateInsurantGuardian(this, ageFrom, adultMinAge);
    } else {
      return super.validateField(field, context);
    }
  }
}

export default Insurant;
