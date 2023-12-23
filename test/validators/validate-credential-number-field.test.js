////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@haixing_hu/common-validator';
import { CredentialType, validateCredentialNumberField } from '../../src';

/**
 * 单元测试{@link validateCredentialNumberField}。
 *
 * @author 胡海星
 */
describe('validateCredentialNumberField()，没有 owner', () => {
  const obj = {
    type: CredentialType.IDENTITY_CARD,
    number: '',
  };
  test('正确的身份证号码', () => {
    obj.type = CredentialType.IDENTITY_CARD;
    obj.number = '110101199003078515';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的护照号码', () => {
    obj.type = CredentialType.PASSPORT.value;
    obj.number = 'E12345678';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的军官证号码', () => {
    obj.type = CredentialType.OFFICER_CARD.value;
    obj.number = 'a12345';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的其他证件号码', () => {
    obj.type = CredentialType.OTHER.value;
    obj.number = 'a01';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空证件号码', () => {
    CredentialType.values().forEach((e) => {
      obj.type = e.value;
      obj.number = '';
      const context = { instance: obj, label: '号码' };
      let result = validateCredentialNumberField(obj.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
      obj.number = null;
      result = validateCredentialNumberField(obj.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
      obj.number = undefined;
      result = validateCredentialNumberField(obj.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
      delete obj.number;
      result = validateCredentialNumberField(obj.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
    });
  });
  test('错误的身份证号码', () => {
    obj.type = CredentialType.IDENTITY_CARD;
    obj.number = '110101199003078516';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('身份证号码格式不正确');
  });
  test('错误的护照号码', () => {
    obj.type = CredentialType.PASSPORT.value;
    obj.number = 'EA123456';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('护照号码格式不正确');
  });
  test('错误的军官证号码', () => {
    obj.type = CredentialType.OFFICER_CARD.value;
    obj.number = 'a12345678';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('中国人民解放军军官证号码格式不正确');
  });
  test('错误的其他证件号码', () => {
    obj.type = CredentialType.OTHER.value;
    obj.number = 'a';
    const context = { instance: obj, label: '号码' };
    const result = validateCredentialNumberField(obj.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('其他证件号码格式不正确');
  });
});

describe('validateCredentialNumberField()，有owner，owner姓名不为空', () => {
  const person = {
    name: '张三',
    credential: {
      type: CredentialType.IDENTITY_CARD,
      number: '',
    },
  };
  test('正确的身份证号码', () => {
    person.credential.type = CredentialType.IDENTITY_CARD;
    person.credential.number = '110101199003078515';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的护照号码', () => {
    person.credential.type = CredentialType.PASSPORT.value;
    person.credential.number = 'E12345678';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的军官证号码', () => {
    person.credential.type = CredentialType.OFFICER_CARD.value;
    person.credential.number = 'a12345';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的其他证件号码', () => {
    person.credential.type = CredentialType.OTHER.value;
    person.credential.number = 'a01';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空证件号码', () => {
    CredentialType.values().forEach((e) => {
      person.credential.type = e.value;
      person.credential.number = '';
      const context = { instance: person.credential, label: '号码', owner: '张三' };
      let result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写张三的${e.name}号码`);
      person.credential.number = null;
      result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写张三的${e.name}号码`);
      person.credential.number = undefined;
      result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写张三的${e.name}号码`);
      delete person.credential.number;
      result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写张三的${e.name}号码`);
    });
  });
  test('错误的身份证号码', () => {
    person.credential.type = CredentialType.IDENTITY_CARD;
    person.credential.number = '110101199003078516';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的身份证号码格式不正确');
  });
  test('错误的护照号码', () => {
    person.credential.type = CredentialType.PASSPORT.value;
    person.credential.number = 'EA123456';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的护照号码格式不正确');
  });
  test('错误的军官证号码', () => {
    person.credential.type = CredentialType.OFFICER_CARD.value;
    person.credential.number = 'a12345678';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的中国人民解放军军官证号码格式不正确');
  });
  test('错误的其他证件号码', () => {
    person.credential.type = CredentialType.OTHER.value;
    person.credential.number = 'a';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的其他证件号码格式不正确');
  });
});

describe('validateCredentialNumberField()，有父对象，父对象姓名为空', () => {
  const person = {
    name: '',
    credential: {
      type: CredentialType.IDENTITY_CARD,
      number: '',
    },
  };
  test('正确的身份证号码', () => {
    person.credential.type = CredentialType.IDENTITY_CARD;
    person.credential.number = '110101199003078515';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的护照号码', () => {
    person.credential.type = CredentialType.PASSPORT.value;
    person.credential.number = 'E12345678';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的军官证号码', () => {
    person.credential.type = CredentialType.OFFICER_CARD.value;
    person.credential.number = 'a12345';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的其他证件号码', () => {
    person.credential.type = CredentialType.OTHER.value;
    person.credential.number = 'a01';
    const context = { instance: person.credential, label: '号码', owner: '张三' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空证件号码', () => {
    CredentialType.values().forEach((e) => {
      person.credential.type = e.value;
      person.credential.number = '';
      const context = { instance: person.credential, label: '号码' };
      let result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
      person.credential.number = null;
      result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
      person.credential.number = undefined;
      result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
      delete person.credential.number;
      result = validateCredentialNumberField(person.credential.number, context);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.success).toBe(false);
      expect(result.description).toBe(`请填写${e.name}号码`);
    });
  });
  test('错误的身份证号码', () => {
    person.credential.type = CredentialType.IDENTITY_CARD;
    person.credential.number = '110101199003078516';
    const context = { instance: person.credential, label: '号码' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('身份证号码格式不正确');
  });
  test('错误的护照号码', () => {
    person.credential.type = CredentialType.PASSPORT.value;
    person.credential.number = 'EA123456';
    const context = { instance: person.credential, label: '号码' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('护照号码格式不正确');
  });
  test('错误的军官证号码', () => {
    person.credential.type = CredentialType.OFFICER_CARD.value;
    person.credential.number = 'a12345678';
    const context = { instance: person.credential, label: '号码' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('中国人民解放军军官证号码格式不正确');
  });
  test('错误的其他证件号码', () => {
    person.credential.type = CredentialType.OTHER.value;
    person.credential.number = 'a';
    const context = { instance: person.credential, label: '号码' };
    const result = validateCredentialNumberField(person.credential.number, context);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('其他证件号码格式不正确');
  });
});
