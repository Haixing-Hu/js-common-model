////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { trimUppercaseString } from '@haixing_hu/common-util';
import {
  Model,
  Type,
  Normalizable,
  Validatable,
  Label,
} from '@haixing_hu/common-decorator';
import CredentialType from './CredentialType';
import validateCredentialTypeField from '../../validators/validate-credential-type-field';
import validateCredentialNumberField from '../../validators/validate-credential-number-field';

/**
 * 此模型表示证件。
 *
 * @author 胡海星
 */
@Model
class Credential {
  /**
   * 证件类型。
   */
  @Validatable(validateCredentialTypeField)
  @Normalizable
  @Type(CredentialType)
  @Label('证件类型')
  type = CredentialType.DEFAULT;

  /**
   * 证件号码。
   */
  @Validatable(validateCredentialNumberField)
  @Normalizable(trimUppercaseString)
  @Label('号码')
  number = '';

  /**
   * 创建一个新的{@link Credential}对象。
   *
   * @param {String} type
   *     新的{@link Credential}对象的证件类型，如不提供则使用默认值身份证。
   * @param {String} number
   *     新的{@link Credential}对象的证件号码，如不提供则使用默认值空字符串。
   */
  constructor(type = CredentialType.DEFAULT, number = '') {
    this.type = type;
    this.number = number;
  }

  /**
   * 测试此证件是否是身份证。
   *
   * @return {Boolean}
   *    此证件是否是身份证。
   */
  isIdentityCard() {
    return (this.type === CredentialType.IDENTITY_CARD);
  }

  /**
   * 修改此对象的证件类型，将其类型取值正则化，并将其号码清空。
   *
   * @param {string|CredentialType} type
   *     新的证件类型，必须为字符串类型或一个{@link CredentialType}中的枚举项。
   */
  changeType(type) {
    const theType = CredentialType.of(type);
    if (theType === undefined) {
      throw new TypeError(`Invalid credential type: ${type}`);
    }
    this.type = theType;
    this.number = '';
  }

  /**
   * 将一个JSON对象转换为 Credential 对象；若该对象为空，则转换为 null。
   *
   * @param {Object} credential
   *     待转换的JSON对象
   * @return {Credential}
   *     若参数 credential 为 undefined 或 null，返回null；若该参数为一个空的
   *     Credential对象，返回 null；否则将其转换为一个等价的 Credential 对象。
   */
  static emptyToNull(credential) {
    if (credential === undefined || credential === null) {
      return null;
    }
    if (credential.type === undefined
      || credential.type === null
      || credential.type === ''
      || credential.number === undefined
      || credential.number === null
      || credential.number === '') {
      return null;
    }
    return new Credential(credential.type, credential.number);
  }
}

export default Credential;
