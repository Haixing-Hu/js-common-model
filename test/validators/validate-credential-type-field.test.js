////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@haixing_hu/common-validator';
import { CredentialType, validateCredentialTypeField } from '../../src';

/**
 * 单元测试{@link validateCredentialTypeField}。
 *
 * @author 胡海星
 */
describe('validateCredentialTypeField()，没有 owner', () => {
  const instance = {
    type: CredentialType.IDENTITY_CARD.value,
  };
  test('正确的证件类型', () => {
    CredentialType.values().forEach((e) => {
      instance.type = e.value;
      const result = validateCredentialTypeField(instance.type);
      expect(result.success).toBe(true);
      expect(result.description).toBe('');
    });
  });
  test('空证件类型', () => {
    instance.type = '';
    let result = validateCredentialTypeField(instance.type);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');

    instance.type = null;
    result = validateCredentialTypeField(instance.type);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');

    instance.type = undefined;
    result = validateCredentialTypeField(instance.type);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');

    delete instance.type;
    result = validateCredentialTypeField(instance.type);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');
  });
  test('错误证件类型', () => {
    instance.type = 'xx';
    const result = validateCredentialTypeField(instance.type);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('证件类型不受支持');
  });
});

describe('validateCredentialTypeField()，有owner', () => {
  const person = {
    name: '张三',
    credential: {
      type: CredentialType.IDENTITY_CARD.value,
    },
  };
  test('正确的证件类型', () => {
    CredentialType.values().forEach((e) => {
      person.credential.type = e.value;
      const result = validateCredentialTypeField(person.credential.type, { owner: '张三' });
      expect(result.success).toBe(true);
      expect(result.description).toBe('');
    });
  });
  test('空证件类型', () => {
    person.credential.type = '';
    let result = validateCredentialTypeField(person.credential.type, { owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');

    person.credential.type = null;
    result = validateCredentialTypeField(person.credential.type, { owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');

    person.credential.type = undefined;
    result = validateCredentialTypeField(person.credential.type, { owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');

    delete person.credential.type;
    result = validateCredentialTypeField(person.credential.type, { owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');
  });
  test('错误证件类型', () => {
    person.credential.type = 'xx';
    const result = validateCredentialTypeField(person.credential.type, { owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的证件类型不受支持');
  });
});

describe('validateCredentialTypeField()，有owner, owner名字为空', () => {
  const person = {
    name: '',
    credential: {
      type: CredentialType.IDENTITY_CARD.value,
    },
  };
  test('正确的证件类型', () => {
    CredentialType.values().forEach((e) => {
      person.credential.type = e.value;
      const result = validateCredentialTypeField(person.credential.type, { owner: '' });
      expect(result.success).toBe(true);
      expect(result.description).toBe('');
    });
  });
  test('空证件类型', () => {
    person.credential.type = '';
    let result = validateCredentialTypeField(person.credential.type, { owner: '' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');

    person.credential.type = null;
    result = validateCredentialTypeField(person.credential.type, { owner: '' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');

    person.credential.type = undefined;
    result = validateCredentialTypeField(person.credential.type, { owner: '' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');

    delete person.credential.type;
    result = validateCredentialTypeField(person.credential.type, { owner: '' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');
  });
  test('错误证件类型', () => {
    person.credential.type = 'xx';
    const result = validateCredentialTypeField(person.credential.type, { owner: '' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('证件类型不受支持');
  });
});
