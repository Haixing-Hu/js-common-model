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
  Employee,
  Credential,
  CredentialType,
  Gender,
  Info,
  State,
} from '../../../src';

/**
 * 单元测试 Employee 构造器。
 *
 * @author 胡海星
 */
describe('Employee.prototype.constructor', () => {
  test('默认构造器', () => {
    const employee = new Employee();
    expect(employee.id).toBe('');
    expect(employee.code).toBe('');
    expect(employee.internal_code).toBe('');
    expect(employee.username).toBe('');
    expect(employee.person_id).toBe('');
    expect(employee.name).toBe('');
    expect(employee.gender).toBe('');
    expect(employee.birthday).toBe('');
    expect(employee.category).toBeNull();
    expect(employee.organization).toBeNull();
    expect(employee.department).toBeNull();
    expect(employee.contact).toBeNull();
    expect(employee.photo).toBe('');
    expect(employee.description).toBe('');
    expect(employee.credential).toBeNull();
    expect(employee.practising_certificate).toBeNull();
    expect(employee.title_certificate).toBeNull();
    expect(employee.practising_type).toBe('');
    expect(employee.practising_scope).toBe('');
    expect(employee.job_title).toBe('');
    expect(employee.state).toBe('');
    expect(employee.comment).toBe('');
    expect(employee.create_time).toBe('');
    expect(employee.modify_time).toBe('');
    expect(employee.delete_time).toBe('');
  });
});

/**
 * 单元测试 Employee 从 WithBirthday MixIn 中获得的 age() 函数。
 *
 * @author 胡海星
 */
describe('Employee.prototype.age()', () => {
  test('生日为空', () => {
    const employee = new Employee();
    const age = employee.age();
    expect(age).toBe(-1);
  });
  test('年龄小于1岁', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(100, 'day');
    const age = employee.age();
    expect(age).toBe(0);
  });
  test('年龄正好1岁', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(1, 'year').startOf('day');
    const age = employee.age();
    expect(age).toBe(1);
  });
  test('年龄大于1岁不到2岁', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(13, 'month');
    const age = employee.age();
    expect(age).toBe(1);
  });
  test('年龄大于3岁', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(83, 'month');
    const age = employee.age();
    expect(age).toBe(6);
  });
  test('指定开始计算的日期', () => {
    const employee = new Employee();
    const from = dayjs().add(1, 'month');
    employee.birthday = from.subtract(84, 'month');
    const age = employee.age(from);
    expect(age).toBe(6);
  });
  test('指定开始计算的日期，指定单位', () => {
    const employee = new Employee();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2020-02-12');
    const age = employee.age(from, 'day');
    expect(age).toBe(0);
  });
  test('指定开始计算的日期，指定单位', () => {
    const employee = new Employee();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2020-02-11');
    const age = employee.age(from, 'day');
    expect(age).toBe(1);
  });
  test('指定开始计算的日期，指定单位', () => {
    const employee = new Employee();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2020-01-11');
    const age = employee.age(from, 'day');
    expect(age).toBe(32);
  });
  test('指定开始计算的日期，指定精度', () => {
    const employee = new Employee();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2019-02-12');
    const age = employee.age(from, 'year', true);
    expect(age).toBe(1.0);
  });
  test('指定开始计算的日期，指定精度', () => {
    const employee = new Employee();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2019-02-11');
    const age = employee.age(from, 'year', true);
    expect(age).toBeGreaterThan(1.0);
  });
  test('指定错误的单位', () => {
    const employee = new Employee();
    const from = dayjs('2020-02-12');
    employee.birthday = dayjs('2019-02-11');
    expect(() => employee.age(from, 'second'))
      .toThrow(/^Unit only support/);
  });
});

/**
 * 单元测试 Employee 从 WithBirthday MixIn 中获得的 isAdult() 函数。
 *
 * @author 胡海星
 */
describe('Employee.prototype.isAdult()', () => {
  test('生日为空', () => {
    const employee = new Employee();
    expect(employee.isAdult()).toBe(true);
  });
  test('年龄小于18岁', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(11, 'year');
    expect(employee.isAdult()).toBe(false);
  });
  test('年龄正好18岁', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(18, 'year').startOf('day');
    expect(employee.isAdult()).toBe(true);
  });
  test('年龄离18岁差1秒', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(18, 'year')
      .startOf('day').add(1, 'second');
    expect(employee.isAdult()).toBe(false);
  });
  test('年龄大于18岁', () => {
    const employee = new Employee();
    const today = dayjs();
    employee.birthday = today.subtract(19, 'year').format('YYYY-MM-DD');
    expect(employee.isAdult()).toBe(true);
  });
  test('年龄小于18岁，指定开始日期', () => {
    const employee = new Employee();
    const from = '2020-02-12';
    employee.birthday = '2003-02-11';
    expect(employee.isAdult(from)).toBe(false);
  });
  test('年龄正好18岁，指定开始日期', () => {
    const employee = new Employee();
    const from = '2020-02-12';
    employee.birthday = '2002-02-12';
    expect(employee.isAdult(from)).toBe(true);
  });
  test('年龄正好18岁，指定开始日期，指定成人年龄为20岁', () => {
    const employee = new Employee();
    const from = '2020-02-12';
    employee.birthday = '2002-02-12';
    expect(employee.isAdult(from, 20)).toBe(false);
  });
  test('年龄正好20岁，指定开始日期，指定成人年龄为20岁', () => {
    const employee = new Employee();
    const from = '2020-02-12';
    employee.birthday = '2000-02-12';
    expect(employee.isAdult(from, 20)).toBe(true);
  });
});

/**
 * 单元测试 Employee 从 WithBirthday MixIn 中获得的 defaultAgeFrom 属性。
 *
 * @author 胡海星
 */
describe('Employee.defaultAgeFrom()', () => {
  test('get/set defaultAgeFrom', () => {
    expect(Employee.defaultAgeFrom).toBe(null);
    Employee.defaultAgeFrom = '2020-02-12';
    expect(Employee.defaultAgeFrom).toBe('2020-02-12');
    Employee.defaultAgeFrom = null;
  });
  test('set defaultAgeFrom', () => {
    Employee.defaultAgeFrom = '2020-02-12';
    const employee = new Employee();
    employee.birthday = '2002-02-13';
    expect(employee.isAdult()).toBe(false);
    employee.birthday = '2002-02-12';
    expect(employee.isAdult()).toBe(true);
    Employee.defaultAgeFrom = null;
  });
});

/**
 * 单元测试 Employee 从 WithBirthday MixIn 中获得的 defaultAdultMinAge 属性。
 *
 * @author 胡海星
 */
describe('Employee.defaultAdultMinAge()', () => {
  test('get/set defaultAdultMinAge', () => {
    expect(Employee.defaultAdultMinAge).toBe(18);
    Employee.defaultAdultMinAge = 20;
    expect(Employee.defaultAdultMinAge).toBe(20);
    Employee.defaultAdultMinAge = 18;
  });
  test('set defaultAgeFrom', () => {
    Employee.defaultAdultMinAge = 20;
    Employee.defaultAgeFrom = '2020-02-12';
    const employee = new Employee();
    employee.birthday = '2002-02-12';
    expect(employee.isAdult()).toBe(false);
    employee.birthday = '2000-02-12';
    expect(employee.isAdult()).toBe(true);
    Employee.defaultAgeFrom = null;
    Employee.defaultAdultMinAge = 18;
  });
});

/**
 * 单元测试 Employee.prototype.assign()
 *
 * @author 胡海星
 */
describe('Employee.prototype.assign', () => {
  test('obj 为 undefined', () => {
    const employee = new Employee();
    const obj = undefined;
    employee.assign(obj);
    expect(employee.id).toBe('');
    expect(employee.code).toBe('');
    expect(employee.internal_code).toBe('');
    expect(employee.username).toBe('');
    expect(employee.person_id).toBe('');
    expect(employee.name).toBe('');
    expect(employee.gender).toBe('');
    expect(employee.birthday).toBe('');
    expect(employee.category).toBeNull();
    expect(employee.organization).toBeNull();
    expect(employee.department).toBeNull();
    expect(employee.contact).toBeNull();
    expect(employee.photo).toBe('');
    expect(employee.description).toBe('');
    expect(employee.credential).toBeNull();
    expect(employee.practising_certificate).toBeNull();
    expect(employee.title_certificate).toBeNull();
    expect(employee.practising_type).toBe('');
    expect(employee.practising_scope).toBe('');
    expect(employee.job_title).toBe('');
    expect(employee.state).toBe('');
    expect(employee.comment).toBe('');
    expect(employee.create_time).toBe('');
    expect(employee.modify_time).toBe('');
    expect(employee.delete_time).toBe('');
  });
  test('obj 为 null', () => {
    const employee = new Employee();
    const obj = null;
    employee.assign(obj);
    expect(employee.id).toBe('');
    expect(employee.code).toBe('');
    expect(employee.internal_code).toBe('');
    expect(employee.username).toBe('');
    expect(employee.person_id).toBe('');
    expect(employee.name).toBe('');
    expect(employee.gender).toBe('');
    expect(employee.birthday).toBe('');
    expect(employee.category).toBeNull();
    expect(employee.organization).toBeNull();
    expect(employee.department).toBeNull();
    expect(employee.contact).toBeNull();
    expect(employee.photo).toBe('');
    expect(employee.description).toBe('');
    expect(employee.credential).toBeNull();
    expect(employee.practising_certificate).toBeNull();
    expect(employee.title_certificate).toBeNull();
    expect(employee.practising_type).toBe('');
    expect(employee.practising_scope).toBe('');
    expect(employee.job_title).toBe('');
    expect(employee.state).toBe('');
    expect(employee.comment).toBe('');
    expect(employee.create_time).toBe('');
    expect(employee.modify_time).toBe('');
    expect(employee.delete_time).toBe('');
  });
  test('obj 为包含 EmpoyeeInfo 属性的正常对象', () => {
    const employee = new Employee();
    const obj = {
      id: '1234',
      code: 'xxx',
      internal_code: 'xxx-yyy',
      username: 'zhangsan',
      person_id: '123',
      name: '张三',
      gender: 'MALE',
      birthday: '2010-03-01',
      category: {
        'id': '1111',
        'code': 'person',
        'name': '人员',
      },
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
      photo: 'zhangsan.png',
      description: '这就是张三',
      credential: {
        type: 'IDENTITY_CARD',
        number: '1234567890',
      },
      practising_certificate: {
        type: 'PRACTISING_CERTIFICATE',
        number: 'ABCDEFG',
      },
      title_certificate: {
        type: 'TITLE_CERTIFICATE',
        number: 'HIJKLMN',
      },
      practising_type: '工程技术',
      practising_scope: '软件开发',
      job_title: '软件开发工程师',
      state: 'NORMAL',
      comment: '张三是个好同志',
      create_time: '2022-01-23T16:02:33Z',
      modify_time: '2022-01-23T18:02:33Z',
      delete_time: '2022-01-23T20:02:33Z',
    };
    employee.assign(obj);
    expect(employee.id).toBe('1234');
    expect(employee.code).toBe('xxx');
    expect(employee.internal_code).toBe('xxx-yyy');
    expect(employee.username).toBe('zhangsan');
    expect(employee.person_id).toBe('123');
    expect(employee.name).toBe('张三');
    expect(employee.gender).toBe(Gender.MALE);
    expect(employee.birthday).toBe('2010-03-01');
    expect(employee.category).toBeInstanceOf(Info);
    expect(employee.category).toEqual(new Info('1111', 'person', '人员'));
    expect(employee.organization).toBeInstanceOf(Info);
    expect(employee.organization).toEqual(new Info('1001', 'njzhyl', '智慧医疗'));
    expect(employee.department).toBeInstanceOf(Info);
    expect(employee.department).toEqual(new Info('1002', 'develop', '研发部'));
    expect(employee.contact).toBeNull();
    expect(employee.photo).toBe('zhangsan.png');
    expect(employee.description).toBe('这就是张三');
    expect(employee.credential).toBeInstanceOf(Credential);
    expect(employee.credential).toEqual(
      new Credential(CredentialType.IDENTITY_CARD, '1234567890'),
    );
    expect(employee.practising_certificate).toBeInstanceOf(Credential);
    expect(employee.practising_certificate).toEqual(
      new Credential(CredentialType.PRACTISING_CERTIFICATE, 'ABCDEFG'),
    );
    expect(employee.title_certificate).toBeInstanceOf(Credential);
    expect(employee.title_certificate).toEqual(
      new Credential(CredentialType.TITLE_CERTIFICATE, 'HIJKLMN'),
    );
    expect(employee.practising_type).toBe('工程技术');
    expect(employee.practising_scope).toBe('软件开发');
    expect(employee.job_title).toBe('软件开发工程师');
    expect(employee.state).toBe(State.NORMAL);
    expect(employee.comment).toBe('张三是个好同志');
    expect(employee.create_time).toBe('2022-01-23T16:02:33.000Z');
    expect(employee.modify_time).toBe('2022-01-23T18:02:33.000Z');
    expect(employee.delete_time).toBe('2022-01-23T20:02:33.000Z');
  });
});
