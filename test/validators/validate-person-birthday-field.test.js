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
  validatePersonBirthdayField,
} from '../../src';

/**
 * 单元测试{@link validatePersonBirthdayField}。
 *
 * @author 胡海星
 */
describe('validatePersonBirthdayField()', () => {
  const obj = {
    name: '张三',
    credential: new Credential(),
    birthday: '',
  };
  test('空出生日期，没有姓名', () => {
    obj.birthday = '';
    let result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择出生日期');

    obj.birthday = null;
    result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择出生日期');

    obj.birthday = undefined;
    result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择出生日期');

    obj.birthday = 123;
    result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('出生日期格式不正确');
  });
  test('空出生日期，有姓名', () => {
    obj.birthday = '';
    let result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的出生日期');

    obj.birthday = null;
    result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的出生日期');

    obj.birthday = undefined;
    result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的出生日期');

    obj.birthday = 123;
    result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的出生日期格式不正确');
  });
  test('正确的出生日期，没有证件信息', () => {
    obj.credential = null;
    obj.birthday = '1991-02-12';
    const result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的出生日期，有非身份证证件信息', () => {
    obj.credential = new Credential(CredentialType.PASSPORT.value, 'E12345678');
    obj.birthday = '1991-02-12';
    const result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的出生日期，有身份证信息', () => {
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    obj.birthday = '1990-03-07';
    let result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '320219197706225525');
    obj.birthday = '1977-06-22';
    result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误出生日期，没有证件信息，没有姓名', () => {
    obj.credential = null;
    obj.birthday = 'xx';
    const result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('出生日期格式不正确');
  });
  test('错误出生日期，没有证件信息，有姓名', () => {
    obj.credential = null;
    obj.birthday = 'xx';
    const result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的出生日期格式不正确');
  });
  test('错误出生日期，有非身份证证件信息，没有姓名', () => {
    obj.credential = new Credential(CredentialType.PASSPORT.value, 'E12345678');
    obj.birthday = 'xx';
    const result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('出生日期格式不正确');
  });
  test('错误出生日期，有非身份证证件信息，有姓名', () => {
    obj.credential = new Credential(CredentialType.PASSPORT.value, 'E12345678');
    obj.birthday = 'xx';
    const result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的出生日期格式不正确');
  });
  test('错误出生日期，有身份证证件信息，没有姓名', () => {
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    obj.birthday = '1999-11-01';
    let result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('出生日期和身份证号码不匹配');

    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '320219197706225525');
    obj.birthday = '2001-01-01';
    result = validatePersonBirthdayField(obj.birthday, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('出生日期和身份证号码不匹配');
  });
  test('错误出生日期，有身份证证件信息，有姓名', () => {
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    obj.birthday = '1999-11-01';
    let result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的出生日期和身份证号码不匹配');

    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '320219197706225525');
    obj.birthday = '2001-01-01';
    result = validatePersonBirthdayField(obj.birthday, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的出生日期和身份证号码不匹配');
  });
});
