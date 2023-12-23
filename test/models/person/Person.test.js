////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import { ValidationResult } from '@haixing_hu/common-validator';
import {
  Person, Credential, CredentialType, Gender,
} from '../../../src';

/**
 * 单元测试 Person.prototype.assign()
 *
 * @author 胡海星
 */
describe('Person.prototype.assign', () => {
  test('obj 为 undefined', () => {
    const person = new Person();
    expect(person.gender).toBe('');
    const obj = undefined;
    person.assign(obj);
    expect(person.id).toBe('');
    expect(person.name).toBe('');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe('');
    expect(person.birthday).toBe('');
    expect(person.email).toBe('');
  });
  test('obj 为 null', () => {
    const person = new Person();
    const obj = null;
    person.assign(obj);
    expect(person.id).toBe('');
    expect(person.name).toBe('');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe('');
    expect(person.birthday).toBe('');
    expect(person.email).toBe('');
  });
  test('obj 为空对象', () => {
    const person = new Person();
    const obj = {};
    person.assign(obj);
    expect(person.id).toBe('');
    expect(person.name).toBe('');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe('');
    expect(person.birthday).toBe('');
    expect(person.email).toBe('');
  });
  test('obj 为正常对象，但某些属性不存在，某些为null', () => {
    const person = new Person();
    const obj = {
      name: 'Jack ',
      credential: null,
      gender: ' male ',
      birthday: '',
    };
    person.assign(obj);
    expect(person.id).toBe('');
    expect(person.name).toBe('JACK');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe(Gender.MALE);
    expect(person.birthday).toBe('');
    expect(person.email).toBe('');

    person.assign(obj, false);
    expect(person.id).toBe('');
    expect(person.name).toBe('Jack ');
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe(Gender.MALE);
    expect(person.birthday).toBe('');
    expect(person.email).toBe('');
  });
});

/**
 * 单元测试 Person.prototype.normalize()
 *
 * @author 胡海星
 */
describe('Person.prototype.normalize', () => {
  test('person为新建对象', () => {
    const person = new Person();
    const id = person.id;
    person.normalize('id');
    person.normalize('name');
    person.normalize('credential');
    person.normalize('gender');
    person.normalize('birthday');
    person.normalize('email');
    expect(person.id).toBe(id);
    expect(person.name).toBe('');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe('');
    expect(person.birthday).toBe('');
    expect(person.email).toBe('');
  });

  test('person.hasOwnProperty(birthday)', () => {
    class Foo {
      x = 0;
    }
    class Bar extends Foo {
      y = 0;
    }
    const bar = new Bar();
    expect(Object.hasOwn(bar, 'x')).toBe(true);
    expect(Object.hasOwn(bar, 'y')).toBe(true);

    class P {
      x = 0;
    }
    const WithY = (superclass) => class extends superclass {
      y = 0;
    };
    class C extends WithY(P) {
      z = 0;
    }
    const c = new C();
    expect(Object.hasOwn(c, 'x')).toBe(true);
    expect(Object.hasOwn(c, 'y')).toBe(true);
    expect(Object.hasOwn(c, 'z')).toBe(true);

    const person = new Person();
    expect(Object.hasOwn(person, 'birthday')).toBe(true);
    expect(Object.hasOwn(person, 'birthdayxx')).toBe(false);
  });

  test('person为正常对象', () => {
    const person = new Person();
    person.id = '123';
    person.name = ' x ';
    person.credential = new Credential('identity_card', ' 123abc  ');
    person.gender = 'male';
    person.birthday = '  2020/01/01 ';
    person.email = 'i@i.com ';
    // person.normalize('id');
    // person.normalize('name');
    // person.normalize('credential');
    // person.normalize('gender');
    person.normalize('birthday');
    // person.normalize('email');
    // expect(person.id).toBe('123');
    // expect(person.name).toBe('X');
    // expect(person.credential).toBeInstanceOf(Credential);
    // expect(person.credential.type).toBe('IDENTITY_CARD');
    // expect(person.credential.number).toBe('123ABC');
    // expect(person.gender).toBe('MALE');
    expect(person.birthday).toBe('2020-01-01');
    // expect(person.email).toBe('i@i.com');
  });
  test('person为正常对象，normalize不存在的字段', () => {
    const person = new Person();
    person.id = '123';
    person.name = ' x ';
    person.credential = new Credential('identity_card', ' 123abc  ');
    person.gender = 'male';
    person.birthday = '  2020/01/01 Fri';
    person.email = 'i@i.com ';
    person.normalize('id');
    person.normalize('name');
    person.normalize('credential');
    person.normalize('gender');
    person.normalize('birthday');
    person.normalize('email');
    person.normalize('xxx');
    expect(person.id).toBe('123');
    expect(person.name).toBe('X');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential.type).toBe('identity_card');
    expect(person.credential.number).toBe('123ABC');
    expect(person.gender).toBe('male');
    expect(person.birthday).toBe('2020-01-01');
    expect(person.email).toBe('i@i.com');
  });
  test('person为正常对象，normalize默认不为空但实际值为空的字段', () => {
    const person = new Person();
    person.id = '123';
    person.name = ' x ';
    person.credential = null;
    person.gender = 'male';
    person.birthday = '  2020-01-01 Fri';
    person.email = 'i@i.com ';
    person.normalize('credential');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential.type).toBe(CredentialType.IDENTITY_CARD);
    expect(person.credential.number).toBe('');
  });
});

/**
 * 单元测试 Person.create()
 *
 * @author 胡海星
 */
describe('Person.create', () => {
  test('Person.create(undefined)', () => {
    const data = undefined;
    const person = Person.create(data);
    expect(person).toBeNull();
  });
  test('Person.create(null)', () => {
    const data = null;
    const person = Person.create(data);
    expect(person).toBeNull();
  });
  test('Person.create(data)；data.credential为空；', () => {
    const data = {
      id: '123',
      name: '张三',
      mobile: '12345',
    };
    const person = Person.create(data);
    expect(person.id).toBe('123');
    expect(person.name).toBe('张三');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe('');
    expect(person.birthday).toBe('');
    expect(person.mobile).toBe('12345');
    expect(person.email).toBe('');
  });
  test('Person.create(data)；data.id类型不正确；data.credential为空；', () => {
    const data = {
      id: 123,
      name: '张三',
      mobile: '12345',
    };
    const person = Person.create(data);
    expect(person.id).toBe(123);
    expect(person.name).toBe('张三');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential());
    expect(person.gender).toBe('');
    expect(person.birthday).toBe('');
    expect(person.mobile).toBe('12345');
    expect(person.email).toBe('');
  });
  test('Person.create(data)；data.credential.type为CredentialType对象', () => {
    const data = {
      id: '123',
      credential: {
        type: CredentialType.PASSPORT,
        number: '12345x',
      },
      name: '张三',
      mobile: '12345',
    };
    const person = Person.create(data);
    expect(person.id).toBe('123');
    expect(person.name).toBe('张三');
    expect(person.credential).toBeInstanceOf(Credential);
    expect(person.credential).toEqual(new Credential(CredentialType.PASSPORT, '12345X'));
    expect(person.gender).toBe('');
    expect(person.birthday).toBe('');
    expect(person.mobile).toBe('12345');
    expect(person.email).toBe('');
  });
});

/**
 * 单元测试 Person.prototype.validate()
 *
 * @author 胡海星
 */
describe('Person.prototype.validate', () => {
  const obj = {
    id: '12345',
    name: '张三',
    credential: new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515'),
    gender: Gender.MALE.value,
    birthday: '1990-03-07',
    mobile: '1795113474937629',
    email: 'i@i.com',
  };
  test('正确的验证结果', () => {
    const person = Person.create(obj);
    const result = person.validate();
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result).toEqual(new ValidationResult(true));
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('name为空', () => {
    const person = Person.create(obj);
    person.name = '';
    const result = person.validate();
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写姓名');
  });
  test('name格式错误', () => {
    const person = Person.create(obj);
    person.name = '张s';
    const result = person.validate();
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张s的姓名格式不正确: 请填写正确的中英文名，中文名中勿加空格');
  });
  test('credential为空，无姓名', () => {
    const person = Person.create(obj);
    person.credential = null;
    person.name = '';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('必须设置证件的值');
  });
  test('credential为空，有姓名', () => {
    const person = Person.create(obj);
    person.credential = null;
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('必须设置张三的证件的值');
  });
  test('credential.type为空，无姓名', () => {
    const person = Person.create(obj);
    person.credential.type = '';
    person.name = '';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');
  });
  test('credential.type为空，有姓名', () => {
    const person = Person.create(obj);
    person.credential.type = '';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');
  });
  test('credential.type格式错误，无姓名', () => {
    const person = Person.create(obj);
    person.credential.type = 'xxx';
    person.name = '';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('证件类型不受支持');
  });
  test('credential.type格式错误，有姓名', () => {
    const person = Person.create(obj);
    person.credential.type = 'xxx';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的证件类型不受支持');
  });
  test('credential.number为空，无姓名', () => {
    const person = Person.create(obj);
    person.credential.number = '';
    person.name = '';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写身份证号码');
  });
  test('credential.number为空，有姓名', () => {
    const person = Person.create(obj);
    person.credential.number = '';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的身份证号码');
  });
  test('credential.number格式错误，无姓名', () => {
    const person = Person.create(obj);
    person.credential.number = 'xxx';
    person.name = '';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('身份证号码格式不正确');
  });
  test('credential.number格式错误，有姓名', () => {
    const person = Person.create(obj);
    person.credential.number = 'xxx';
    const result = person.validate('credential');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的身份证号码格式不正确');
  });
  test('gender为空，无姓名', () => {
    const person = Person.create(obj);
    person.gender = '';
    person.name = '';
    const result = person.validate('gender');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择性别');
  });
  test('gender为空，有姓名', () => {
    const person = Person.create(obj);
    person.gender = '';
    const result = person.validate('gender');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的性别');
  });
  test('gender格式错误，无姓名', () => {
    const person = Person.create(obj);
    person.gender = 'xxx';
    person.name = '';
    const result = person.validate('gender');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('性别只能是“男”或“女”');
  });
  test('gender格式错误，有姓名', () => {
    const person = Person.create(obj);
    person.gender = 'xxx';
    const result = person.validate('gender');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的性别只能是“男”或“女”');
  });
  test('gender和身份证号码不匹配，无姓名', () => {
    const person = Person.create(obj);
    person.gender = Gender.FEMALE.value;
    person.name = '';
    const result = person.validate('gender');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('性别和身份证号码不匹配');
  });
  test('gender和身份证号码不匹配，有姓名', () => {
    const person = Person.create(obj);
    person.gender = Gender.FEMALE.value;
    const result = person.validate('gender');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的性别和身份证号码不匹配');
  });
  test('birthday为空，无姓名', () => {
    const person = Person.create(obj);
    person.birthday = '';
    person.name = '';
    const result = person.validate('birthday');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择出生日期');
  });
  test('birthday为空，有姓名', () => {
    const person = Person.create(obj);
    person.birthday = '';
    const result = person.validate('birthday');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写或选择张三的出生日期');
  });
  test('birthday格式错误，无姓名', () => {
    const person = Person.create(obj);
    person.birthday = 'xxx';
    person.name = '';
    const result = person.validate('birthday');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('出生日期格式不正确');
  });
  test('birthday格式错误，有姓名', () => {
    const person = Person.create(obj);
    person.birthday = 'xxx';
    const result = person.validate('birthday');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的出生日期格式不正确');
  });
  test('birthday和身份证号码不匹配，无姓名', () => {
    const person = Person.create(obj);
    person.birthday = '1990-03-08';
    person.name = '';
    const result = person.validate('birthday');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('出生日期和身份证号码不匹配');
  });
  test('birthday和身份证号码不匹配，有姓名', () => {
    const person = Person.create(obj);
    person.birthday = '1990-03-08';
    const result = person.validate('birthday');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的出生日期和身份证号码不匹配');
  });
  test('mobile为空，无姓名', () => {
    const person = Person.create(obj);
    person.mobile = '';
    person.name = '';
    const result = person.validate('mobile');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写手机号码');
  });
  test('mobile为空，有姓名', () => {
    const person = Person.create(obj);
    person.mobile = '';
    const result = person.validate('mobile');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的手机号码');
  });
  test('mobile格式错误，无姓名', () => {
    const person = Person.create(obj);
    person.mobile = 'xxx';
    person.name = '';
    const result = person.validate('mobile');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('手机号码格式不正确');
  });
  test('mobile格式错误，有姓名', () => {
    const person = Person.create(obj);
    person.mobile = 'xxx';
    const result = person.validate('mobile');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的手机号码格式不正确');
  });
  test('email为空，无姓名', () => {
    const person = Person.create(obj);
    person.email = '';
    person.name = '';
    const result = person.validate('email');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('email为空，有姓名', () => {
    const person = Person.create(obj);
    person.email = '';
    const result = person.validate('email');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('email格式错误，无姓名', () => {
    const person = Person.create(obj);
    person.email = 'xxx';
    person.name = '';
    const result = person.validate('email');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('电子邮件地址格式不正确');
  });
  test('email格式错误，有姓名', () => {
    const person = Person.create(obj);
    person.email = 'xxx';
    const result = person.validate('email');
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的电子邮件地址格式不正确');
  });
});

/**
 * 单元测试 Person 从 WithBirthday MixIn 中获得的 age() 函数。
 *
 * @author 胡海星
 */
describe('Person.prototype.age()', () => {
  test('生日为空', () => {
    const person = new Person();
    const age = person.age();
    expect(age).toBe(-1);
  });
  test('年龄小于1岁', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(100, 'day');
    const age = person.age();
    expect(age).toBe(0);
  });
  test('年龄正好1岁', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(1, 'year').startOf('day');
    const age = person.age();
    expect(age).toBe(1);
  });
  test('年龄大于1岁不到2岁', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(13, 'month');
    const age = person.age();
    expect(age).toBe(1);
  });
  test('年龄大于3岁', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(83, 'month');
    const age = person.age();
    expect(age).toBe(6);
  });
  test('指定开始计算的日期', () => {
    const person = new Person();
    const from = dayjs().add(1, 'month');
    person.birthday = from.subtract(84, 'month');
    const age = person.age(from);
    expect(age).toBe(6);
  });
  test('指定开始计算的日期，指定单位', () => {
    const person = new Person();
    const from = dayjs('2020-02-12');
    person.birthday = dayjs('2020-02-12');
    const age = person.age(from, 'day');
    expect(age).toBe(0);
  });
  test('指定开始计算的日期，指定单位', () => {
    const person = new Person();
    const from = dayjs('2020-02-12');
    person.birthday = dayjs('2020-02-11');
    const age = person.age(from, 'day');
    expect(age).toBe(1);
  });
  test('指定开始计算的日期，指定单位', () => {
    const person = new Person();
    const from = dayjs('2020-02-12');
    person.birthday = dayjs('2020-01-11');
    const age = person.age(from, 'day');
    expect(age).toBe(32);
  });
  test('指定开始计算的日期，指定精度', () => {
    const person = new Person();
    const from = dayjs('2020-02-12');
    person.birthday = dayjs('2019-02-12');
    const age = person.age(from, 'year', true);
    expect(age).toBe(1.0);
  });
  test('指定开始计算的日期，指定精度', () => {
    const person = new Person();
    const from = dayjs('2020-02-12');
    person.birthday = dayjs('2019-02-11');
    const age = person.age(from, 'year', true);
    expect(age).toBeGreaterThan(1.0);
  });
  test('指定错误的单位', () => {
    const person = new Person();
    const from = dayjs('2020-02-12');
    person.birthday = dayjs('2019-02-11');
    expect(() => person.age(from, 'second'))
      .toThrow(/^Unit only support/);
  });
  // old teset
  test('Person.prototype.age()', () => {
    const person = new Person();
    person.birthday = '1990-03-21';
    const today = dayjs();
    const expectedAge = today.diff(person.birthday, 'year');
    expect(person.age()).toBe(expectedAge);
  });
  test('Person.prototype.age("2030-11-01")', () => {
    const person = new Person();
    person.birthday = '1990-03-21';
    const from = dayjs('2030-11-01', 'YYYY-M-D');
    const expectedAge = from.diff(person.birthday, 'year');
    expect(person.age('2030-11-01')).toBe(expectedAge);
  });
  test('Person.prototype.age() with unit day', () => {
    const person = new Person();
    person.birthday = '1990-03-21';
    const today = dayjs();
    const expectedAgeInDays = today.diff(person.birthday, 'day');
    expect(person.age(today, 'day')).toBe(expectedAgeInDays);
  });
  test('Person.prototype.ageInDays("2030-11-01")', () => {
    const person = new Person();
    person.birthday = '1990-03-21';
    const from = dayjs('2030-11-01', 'YYYY-M-D');
    const expectedAgeInDays = from.diff(person.birthday, 'day');
    expect(person.age('2030-11-01', 'day')).toBe(expectedAgeInDays);
  });
});

/**
 * 单元测试 Person 从 WithBirthday MixIn 中获得的 isAdult() 函数。
 *
 * @author 胡海星
 */
describe('Person.prototype.isAdult()', () => {
  test('生日为空', () => {
    const person = new Person();
    expect(person.isAdult()).toBe(true);
  });
  test('年龄小于18岁', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(11, 'year');
    expect(person.isAdult()).toBe(false);
  });
  test('年龄正好18岁', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(18, 'year').startOf('day');
    expect(person.isAdult()).toBe(true);
  });
  test('年龄离18岁差1秒', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(18, 'year')
      .startOf('day').add(1, 'second');
    expect(person.isAdult()).toBe(false);
  });
  test('年龄大于18岁', () => {
    const person = new Person();
    const today = dayjs();
    person.birthday = today.subtract(19, 'year').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(true);
  });
  test('年龄小于18岁，指定开始日期', () => {
    const person = new Person();
    const from = '2020-02-12';
    person.birthday = '2003-02-11';
    expect(person.isAdult(from)).toBe(false);
  });
  test('年龄正好18岁，指定开始日期', () => {
    const person = new Person();
    const from = '2020-02-12';
    person.birthday = '2002-02-12';
    expect(person.isAdult(from)).toBe(true);
  });
  test('年龄正好18岁，指定开始日期，指定成人年龄为20岁', () => {
    const person = new Person();
    const from = '2020-02-12';
    person.birthday = '2002-02-12';
    expect(person.isAdult(from, 20)).toBe(false);
  });
  test('年龄正好20岁，指定开始日期，指定成人年龄为20岁', () => {
    const person = new Person();
    const from = '2020-02-12';
    person.birthday = '2000-02-12';
    expect(person.isAdult(from, 20)).toBe(true);
  });
  //  old test
  test('Person.prototype.isAdult()', () => {
    const person = new Person();
    const now = dayjs();
    person.birthday = now.subtract(Person.defaultAdultMinAge, 'year').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(true);
    person.birthday = dayjs(person.birthday).add(1, 'day').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(false);
    person.birthday = dayjs(person.birthday).subtract(2, 'day').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(true);
  });
  test('Person.prototype.isAdult("2030-11-01")', () => {
    const person = new Person();
    const from = dayjs('2030-11-01', 'YYYY-M-D');
    person.birthday = from.subtract(Person.defaultAdultMinAge, 'year').format('YYYY-MM-DD');
    expect(person.isAdult('2030-11-01')).toBe(true);
    person.birthday = dayjs(person.birthday).add(1, 'day').format('YYYY-MM-DD');
    expect(person.isAdult('2030-11-01')).toBe(false);
    person.birthday = dayjs(person.birthday).subtract(2, 'day').format('YYYY-MM-DD');
    expect(person.isAdult('2030-11-01')).toBe(true);
  });
  test('Person.prototype.isAdult("2030-11-01", 16)', () => {
    const person = new Person();
    const from = dayjs('2030-11-01', 'YYYY-M-D');
    person.birthday = from.subtract(16, 'year').format('YYYY-MM-DD');
    expect(person.isAdult('2030-11-01', 16)).toBe(true);
    person.birthday = dayjs(person.birthday).add(1, 'day').format('YYYY-MM-DD');
    expect(person.isAdult('2030-11-01', 16)).toBe(false);
    person.birthday = dayjs(person.birthday).subtract(2, 'day').format('YYYY-MM-DD');
    expect(person.isAdult('2030-11-01', 16)).toBe(true);
  });
  test('Person.prototype.isAdult(), Person.defaultAgeFrom="2030-03-01"', () => {
    const person = new Person();
    Person.defaultAgeFrom = '2030-03-01';
    const from = dayjs('2030-03-01', 'YYYY-M-D');
    person.birthday = from.subtract(Person.defaultAdultMinAge, 'year').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(true);
    person.birthday = dayjs(person.birthday).add(1, 'day').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(false);
    person.birthday = dayjs(person.birthday).subtract(2, 'day').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(true);
    Person.defaultAgeFrom = null;
  });
  test('Person.prototype.isAdult("2020-11-01"), Person.defaultAgeFrom="2030-03-01"', () => {
    const person = new Person();
    Person.defaultAgeFrom = '2030-03-01';
    const from = dayjs('2020-11-01', 'YYYY-M-D');
    person.birthday = from.subtract(Person.defaultAdultMinAge, 'year').format('YYYY-MM-DD');
    expect(person.isAdult('2020-11-01')).toBe(true);
    person.birthday = dayjs(person.birthday).add(1, 'day').format('YYYY-MM-DD');
    expect(person.isAdult('2020-11-01')).toBe(false);
    person.birthday = dayjs(person.birthday).subtract(2, 'day').format('YYYY-MM-DD');
    expect(person.isAdult('2020-11-01')).toBe(true);
    Person.defaultAgeFrom = null;
  });
  test('Person.prototype.isAdult(), Person.defaultAgeFrom=null, Person.defaultAdultMinAge=16', () => {
    const person = new Person();
    Person.defaultAgeFrom = null;
    Person.defaultAdultMinAge = 16;
    const from = dayjs();
    person.birthday = from.subtract(16, 'year').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(true);
    person.birthday = dayjs(person.birthday).add(1, 'day').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(false);
    person.birthday = dayjs(person.birthday).subtract(2, 'day').format('YYYY-MM-DD');
    expect(person.isAdult()).toBe(true);
    Person.defaultAgeFrom = null;
    Person.defaultAdultMinAge = 18;
  });
});

/**
 * 单元测试 Person 从 WithBirthday MixIn 中获得的 defaultAgeFrom 属性。
 *
 * @author 胡海星
 */
describe('Person.defaultAgeFrom()', () => {
  test('get/set defaultAgeFrom', () => {
    expect(Person.defaultAgeFrom).toBe(null);
    Person.defaultAgeFrom = '2020-02-12';
    expect(Person.defaultAgeFrom).toBe('2020-02-12');
    Person.defaultAgeFrom = null;
  });
  test('set defaultAgeFrom', () => {
    Person.defaultAgeFrom = '2020-02-12';
    const person = new Person();
    person.birthday = '2002-02-13';
    expect(person.isAdult()).toBe(false);
    person.birthday = '2002-02-12';
    expect(person.isAdult()).toBe(true);
    Person.defaultAgeFrom = null;
  });
});

/**
 * 单元测试 Person 从 WithBirthday MixIn 中获得的 defaultAdultMinAge 属性。
 *
 * @author 胡海星
 */
describe('Person.defaultAdultMinAge()', () => {
  test('get/set defaultAdultMinAge', () => {
    expect(Person.defaultAdultMinAge).toBe(18);
    Person.defaultAdultMinAge = 20;
    expect(Person.defaultAdultMinAge).toBe(20);
    Person.defaultAdultMinAge = 18;
  });
  test('set defaultAgeFrom', () => {
    Person.defaultAdultMinAge = 20;
    Person.defaultAgeFrom = '2020-02-12';
    const person = new Person();
    person.birthday = '2002-02-12';
    expect(person.isAdult()).toBe(false);
    person.birthday = '2000-02-12';
    expect(person.isAdult()).toBe(true);
    Person.defaultAgeFrom = null;
    Person.defaultAdultMinAge = 18;
  });
});
