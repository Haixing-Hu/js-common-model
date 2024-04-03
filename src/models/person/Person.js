////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  trimString,
  trimUppercaseString,
} from '@haixing_hu/common-util';
import {
  validateIntegerField,
  validateMobileField,
  validateEmailField,
  validateTimestampField,
  IdentityCard,
} from '@haixing_hu/common-validator';
import {
  Model,
  Type,
  Normalizable,
  Validatable,
  Label,
  NameField,
  Nullable,
} from '@haixing_hu/common-decorator';
import Credential from '../common/Credential';
import CredentialType from '../common/CredentialType';
import Gender from './Gender';
import mix from '../mixins/mix';
import WithBirthday from '../mixins/WithBirthday';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';
import validatePersonNameField from '../../validators/validate-person-name-field';
import validatePersonGenderField from '../../validators/validate-person-gender-field';

/**
 * 此模型表示个人信息
 *
 * @author 胡海星
 */
@Model
class Person extends mix(Object).with(WithBirthday) {
  /**
   * ID。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 姓名。
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validatePersonNameField)
  @Label('姓名')
  @NameField
  name = '';

  /**
   * 姓名。
   */
  @Normalizable(trimString)
  @Label('用户名')
  @Nullable
  username = '';

  /**
   * 性别
   */
  @Normalizable
  @Validatable(validatePersonGenderField)
  @Type(Gender)
  @Label('性别')
  gender = '';

  // birthday 属性继承自 WithBirthday

  /**
   * 证件
   */
  @Normalizable
  @Validatable
  @Type(Credential)
  @Label('证件')
  credential = new Credential();

  /**
   * 手机号码
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validateMobileField)
  @Label('手机号码')
  mobile = '';

  /**
   * 电子邮件地址。
   */
  @Normalizable
  @Validatable(validateEmailField)
  @Label('电子邮件地址')
  @Nullable
  email = '';

  // /**
  //  * 联系方式。
  //  */
  // @Normalizable
  // @Validatable
  // @Type(Contact)
  // @Label('联系方式')
  // @Nullable
  // contact = null;

  /**
   * 是否测试数据。
   */
  @Normalizable
  @Type(Boolean)
  @Label('是否测试数据')
  test = false;

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('标记删除时间')
  @Nullable
  delete_time = '';

  /**
   * 判定此用户是否有完善的证件信息。
   *
   * @return {Boolean}
   *    若此用户有完善的证件信息，返回true；否则返回false。
   */
  hasCredential() {
    return (this.credential !== undefined)
      && (this.credential !== null)
      && (this.credential.type !== undefined)
      && (this.credential.type !== null)
      && (this.credential.type !== '')
      && (this.credential.number !== undefined)
      && (this.credential.number !== null)
      && (this.credential.number !== '');
  }

  /**
   * 判定此用户是否有手机号码。
   *
   * @return {Boolean}
   *     若此用户有手机号码，返回true；否则返回false。
   */
  hasMobile() {
    return (this.mobile !== undefined)
        && (this.mobile !== null)
        && (this.mobile !== '');
  }

  /**
   * 为此客户设置新的证件。
   *
   * 若新证件为合法的身份证，则根据新身份证的号码，自动设置此客户的性别和出生日期。
   *
   * @param {Credential} credential
   *     指定的证件。
   * @param {Object} changes
   *     可选，用于存储对当前{@link Person}对象的改变；若不提供此参数则忽略。
   */
  setCredential(credential, changes) {
    if (credential === undefined || credential === null) {
      this.credential = null;
      if (changes) {
        changes.credential = null;
      }
    } else {
      this.credential = Credential.create(credential);
      if (changes) {
        changes.credential = Credential.create(credential);
      }
      if (this.credential.type === CredentialType.IDENTITY_CARD) {
        if (IdentityCard.isValid(this.credential.number)) {
          this.gender = Gender.of(IdentityCard.getGender(this.credential.number));
          this.birthday = IdentityCard.getBirthday(this.credential.number);
          if (changes) {
            changes.gender = this.gender;
            changes.birthday = this.birthday;
          }
        }
      }
    }
  }

  /**
   * 根据可能存在的身份证号码，刷新当前客户的性别和生日。
   */
  refreshGenderBirthday() {
    if (this.credential !== undefined && this.credential !== null) {
      if (this.credential.type === CredentialType.IDENTITY_CARD) {
        if (IdentityCard.isValid(this.credential.number)) {
          this.gender = Gender.of(IdentityCard.getGender(this.credential.number));
          this.birthday = IdentityCard.getBirthday(this.credential.number);
        }
      }
    }
  }

  /**
   * 检测当前对象和另一个对象是否表示同一个人。
   *
   * @param {any} other
   *    另一个人
   * @return {Boolean}
   *    若当前对象和other是同一个人，则返回true；否则返回false。
   */
  equals(other) {
    if (!(other instanceof Person)) {
      return false;
    }
    // 证件相同姓名不同也认为是同一人
    // if (this.name !== other.name) {
    //   return false;
    // }
    if ((this.credential === null) || (other.credential === null)) {
      // 若两人之一无身份证信息，无法比较他们是否同一人，认为不同
      return false;
    }
    return (this.credential.type === other.credential.type)
        && (this.credential.number === other.credential.number);
  }
}

export default Person;
