////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@haixing_hu/common-validator';
import {
  Credential,
  CredentialType,
  Gender,
  validatePersonGenderField,
} from '../../src';

/**
 * 单元测试{@link validatePersonGenderField}。
 *
 * @author 胡海星
 */
describe('validatePersonGenderField()', () => {
  const obj = {
    name: '张三',
    credential: new Credential(),
    gender: Gender.MALE.value,
  };
  test('空性别，没有姓名', () => {
    obj.gender = '';
    let result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择性别');

    obj.gender = null;
    result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择性别');

    obj.gender = undefined;
    result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择性别');

    obj.gender = 123;
    result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('性别只能是“男”或“女”');
  });
  test('空性别，有姓名', () => {
    obj.gender = '';
    let result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的性别');

    obj.gender = null;
    result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的性别');

    obj.gender = undefined;
    result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的性别');

    obj.gender = 123;
    result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的性别只能是“男”或“女”');
  });
  test('正确的性别，没有证件信息', () => {
    obj.credential = null;
    Gender.values().forEach((e) => {
      obj.gender = e.value;
      const result = validatePersonGenderField(obj.gender, { instance: obj });
      expect(result.success).toBe(true);
      expect(result.description).toBe('');
    });
  });
  test('正确的性别，有非身份证证件信息', () => {
    obj.credential = new Credential(CredentialType.PASSPORT.value, 'E12345678');
    Gender.values().forEach((e) => {
      obj.gender = e.value;
      const result = validatePersonGenderField(obj.gender, { instance: obj });
      expect(result.success).toBe(true);
      expect(result.description).toBe('');
    });
  });
  test('正确的性别，有身份证信息', () => {
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    obj.gender = Gender.MALE.value;
    let result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '320219197706225525');
    obj.gender = Gender.FEMALE.value;
    result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误性别，没有证件信息，没有姓名', () => {
    obj.credential = null;
    obj.gender = 'xx';
    const result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('性别只能是“男”或“女”');
  });
  test('错误性别，没有证件信息，有姓名', () => {
    obj.credential = null;
    obj.gender = 'xx';
    const result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的性别只能是“男”或“女”');
  });
  test('错误性别，有非身份证证件信息，没有姓名', () => {
    obj.credential = new Credential(CredentialType.PASSPORT.value, 'E12345678');
    obj.gender = 'xx';
    const result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('性别只能是“男”或“女”');
  });
  test('错误性别，有非身份证证件信息，有姓名', () => {
    obj.credential = new Credential(CredentialType.PASSPORT.value, 'E12345678');
    obj.gender = 'xx';
    const result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的性别只能是“男”或“女”');
  });
  test('错误性别，有身份证证件信息，没有姓名', () => {
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    obj.gender = Gender.FEMALE.value;
    let result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('性别和身份证号码不匹配');

    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '320219197706225525');
    obj.gender = Gender.MALE.value;
    result = validatePersonGenderField(obj.gender, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('性别和身份证号码不匹配');
  });
  test('错误性别，有身份证证件信息，有姓名', () => {
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    obj.gender = Gender.FEMALE.value;
    let result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的性别和身份证号码不匹配');

    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '320219197706225525');
    obj.gender = Gender.MALE.value;
    result = validatePersonGenderField(obj.gender, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的性别和身份证号码不匹配');
  });
});
