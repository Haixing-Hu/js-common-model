////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import {
  EmployeeInfo,
  Credential,
  CredentialType,
  Gender,
  Info,
} from '../../../src';

/**
 * 单元测试 EmployeeInfo 构造器。
 *
 * @author 胡海星
 */
describe('EmployeeInfo.prototype.constructor', () => {
  test('默认构造器', () => {
    const employee = new EmployeeInfo();
    expect(employee.id).toBe('');
    expect(employee.code).toBe('');
    expect(employee.internal_code).toBe('');
    expect(employee.username).toBe('');
    expect(employee.name).toBe('');
    expect(employee.gender).toBe('');
    expect(employee.birthday).toBe('');
    expect(employee.credential).toBeInstanceOf(Credential);
    expect(employee.credential).toEqual(new Credential());
    expect(employee.mobile).toBe('');
    expect(employee.organization).toBeNull();
    expect(employee.department).toBeNull();
  });
});

/**
 * 单元测试 EmployeeInfo 从 WithBirthday MixIn 中获得的 age() 函数。
 *
 * @author 胡海星
 */
describe('EmployeeInfo.prototype.age()', () => {
  test('生日为空', () => {
    const employee = new EmployeeInfo();
    const age = employee.age();
    expect(age).toBe(-1);
  });
  test('年龄小于1岁', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(100, 'day');
    const age = employee.age();
    expect(age).toBe(0);
  });
  test('年龄正好1岁', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(1, 'year').startOf('day');
    const age = employee.age();
    expect(age).toBe(1);
  });
  test('年龄大于1岁不到2岁', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(13, 'month');
    const age = employee.age();
    expect(age).toBe(1);
  });
  test('年龄大于3岁', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(83, 'month');
    const age = employee.age();
    expect(age).toBe(6);
  });
  test('指定开始计算的日期', () => {
    const employee = new EmployeeInfo();
    const from = dayjs().add(1, 'month');
    employee.birthday = from.subtract(84, 'month');
    const age = employee.age(from);
    expect(age).toBe(6);
  });
  test('指定开始计算的日期，指定单位', () => {
    const employee = new EmployeeInfo();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2020-02-12');
    const age = employee.age(from, 'day');
    expect(age).toBe(0);
  });
  test('指定开始计算的日期，指定单位', () => {
    const employee = new EmployeeInfo();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2020-02-11');
    const age = employee.age(from, 'day');
    expect(age).toBe(1);
  });
  test('指定开始计算的日期，指定单位', () => {
    const employee = new EmployeeInfo();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2020-01-11');
    const age = employee.age(from, 'day');
    expect(age).toBe(32);
  });
  test('指定开始计算的日期，指定精度', () => {
    const employee = new EmployeeInfo();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2019-02-12');
    const age = employee.age(from, 'year', true);
    expect(age).toBe(1.0);
  });
  test('指定开始计算的日期，指定精度', () => {
    const employee = new EmployeeInfo();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2019-02-11');
    const age = employee.age(from, 'year', true);
    expect(age).toBeGreaterThan(1.0);
  });
  test('指定错误的单位', () => {
    const employee = new EmployeeInfo();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2019-02-11');
    expect(() => employee.age(from, 'second'))
      .toThrow(/^Unit only support/);
  });
});

/**
 * 单元测试 EmployeeInfo 从 WithBirthday MixIn 中获得的 isAdult() 函数。
 *
 * @author 胡海星
 */
describe('EmployeeInfo.prototype.isAdult()', () => {
  test('生日为空', () => {
    const employee = new EmployeeInfo();
    expect(employee.isAdult()).toBe(true);
  });
  test('年龄小于18岁', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(11, 'year');
    expect(employee.isAdult()).toBe(false);
  });
  test('年龄正好18岁', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(18, 'year').startOf('day');
    expect(employee.isAdult()).toBe(true);
  });
  test('年龄离18岁差1秒', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(18, 'year')
      .startOf('day').add(1, 'second');
    expect(employee.isAdult()).toBe(false);
  });
  test('年龄大于18岁', () => {
    const employee = new EmployeeInfo();
    const today = dayjs();
    employee.birthday = today.subtract(19, 'year').format('YYYY-MM-DD');
    expect(employee.isAdult()).toBe(true);
  });
  test('年龄小于18岁，指定开始日期', () => {
    const employee = new EmployeeInfo();
    const from = '2020-02-12';
    employee.birthday = '2003-02-11';
    expect(employee.isAdult(from)).toBe(false);
  });
  test('年龄正好18岁，指定开始日期', () => {
    const employee = new EmployeeInfo();
    const from = '2020-02-12';
    employee.birthday = '2002-02-12';
    expect(employee.isAdult(from)).toBe(true);
  });
  test('年龄正好18岁，指定开始日期，指定成人年龄为20岁', () => {
    const employee = new EmployeeInfo();
    const from = '2020-02-12';
    employee.birthday = '2002-02-12';
    expect(employee.isAdult(from, 20)).toBe(false);
  });
  test('年龄正好20岁，指定开始日期，指定成人年龄为20岁', () => {
    const employee = new EmployeeInfo();
    const from = '2020-02-12';
    employee.birthday = '2000-02-12';
    expect(employee.isAdult(from, 20)).toBe(true);
  });
});

/**
 * 单元测试 EmployeeInfo 从 WithBirthday MixIn 中获得的 defaultAgeFrom 属性。
 *
 * @author 胡海星
 */
describe('EmployeeInfo.defaultAgeFrom()', () => {
  test('get/set defaultAgeFrom', () => {
    expect(EmployeeInfo.defaultAgeFrom).toBe(null);
    EmployeeInfo.defaultAgeFrom = '2020-02-12';
    expect(EmployeeInfo.defaultAgeFrom).toBe('2020-02-12');
    EmployeeInfo.defaultAgeFrom = null;
  });
  test('set defaultAgeFrom', () => {
    EmployeeInfo.defaultAgeFrom = '2020-02-12';
    const employee = new EmployeeInfo();
    employee.birthday = '2002-02-13';
    expect(employee.isAdult()).toBe(false);
    employee.birthday = '2002-02-12';
    expect(employee.isAdult()).toBe(true);
    EmployeeInfo.defaultAgeFrom = null;
  });
});

/**
 * 单元测试 EmployeeInfo 从 WithBirthday MixIn 中获得的 defaultAdultMinAge 属性。
 *
 * @author 胡海星
 */
describe('EmployeeInfo.defaultAdultMinAge()', () => {
  test('get/set defaultAdultMinAge', () => {
    expect(EmployeeInfo.defaultAdultMinAge).toBe(18);
    EmployeeInfo.defaultAdultMinAge = 20;
    expect(EmployeeInfo.defaultAdultMinAge).toBe(20);
    EmployeeInfo.defaultAdultMinAge = 18;
  });
  test('set defaultAgeFrom', () => {
    EmployeeInfo.defaultAdultMinAge = 20;
    EmployeeInfo.defaultAgeFrom = '2020-02-12';
    const employee = new EmployeeInfo();
    employee.birthday = '2002-02-12';
    expect(employee.isAdult()).toBe(false);
    employee.birthday = '2000-02-12';
    expect(employee.isAdult()).toBe(true);
    EmployeeInfo.defaultAgeFrom = null;
    EmployeeInfo.defaultAdultMinAge = 18;
  });
});

/**
 * 单元测试 EmployeeInfo.prototype.assign()
 *
 * @author 胡海星
 */
describe('EmployeeInfo.prototype.assign', () => {
  test('obj 为 undefined', () => {
    const employee = new EmployeeInfo();
    const obj = undefined;
    employee.assign(obj);
    expect(employee.id).toBe('');
    expect(employee.code).toBe('');
    expect(employee.internal_code).toBe('');
    expect(employee.username).toBe('');
    expect(employee.name).toBe('');
    expect(employee.gender).toBe('');
    expect(employee.credential).toBeInstanceOf(Credential);
    expect(employee.credential).toEqual(new Credential());
    expect(employee.mobile).toBe('');
    expect(employee.organization).toBeNull();
    expect(employee.department).toBeNull();
    expect(employee.birthday).toBe('');
  });
  test('obj 为 null', () => {
    const employee = new EmployeeInfo();
    const obj = null;
    employee.assign(obj);
    expect(employee.id).toBe('');
    expect(employee.code).toBe('');
    expect(employee.internal_code).toBe('');
    expect(employee.username).toBe('');
    expect(employee.name).toBe('');
    expect(employee.gender).toBe('');
    expect(employee.credential).toBeInstanceOf(Credential);
    expect(employee.credential).toEqual(new Credential());
    expect(employee.mobile).toBe('');
    expect(employee.organization).toBeNull();
    expect(employee.department).toBeNull();
    expect(employee.birthday).toBe('');
  });
  test('obj 为包含 EmpoyeeInfo 属性的正常对象', () => {
    const employee = new EmployeeInfo();
    const obj = {
      id: '1234',
      code: 'xxx',
      internal_code: 'xxx-yyy',
      username: ' zhangsan ',
      name: 'zhangsan',
      gender: 'MALE',
      birthday: '2010-03-01',
      credential: {
        type: 'IDENTITY_CARD',
        number: '1234567890',
      },
      mobile: '777888999',
      organization: {
        'id': '1001',
        'code': 'njzhyl',
        'name': '智慧医疗',
      },
      department: {
        'id': '1002',
        'code': 'develop',
        'name': '研发部',
      },
    };
    employee.assign(obj);
    expect(employee.id).toBe('1234');
    expect(employee.code).toBe('xxx');
    expect(employee.internal_code).toBe('xxx-yyy');
    expect(employee.username).toBe('zhangsan');
    expect(employee.name).toBe('ZHANGSAN');
    expect(employee.gender).toBe(Gender.MALE.value);
    expect(employee.birthday).toBe('2010-03-01');
    expect(employee.credential).toBeInstanceOf(Credential);
    expect(employee.credential).toEqual(
      new Credential(CredentialType.IDENTITY_CARD.value, '1234567890'),
    );
    expect(employee.mobile).toBe('777888999');
    expect(employee.organization).toBeInstanceOf(Info);
    expect(employee.organization).toEqual(new Info('1001', 'njzhyl', '智慧医疗'));
    expect(employee.department).toBeInstanceOf(Info);
    expect(employee.department).toEqual(new Info('1002', 'develop', '研发部'));
  });
});
