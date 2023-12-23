////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Buyer, Credential } from '../../../src';

/**
 * 单元测试 Buyer.assign()
 *
 * @author 胡海星
 */
describe('Buyer.assign', () => {
  test('obj 为 undefined', () => {
    const buyer = new Buyer();
    expect(buyer.gender).toBe('');
    const obj = undefined;
    buyer.assign(obj);
    expect(buyer.id).toBe('');
    expect(buyer.name).toBe('');
    expect(buyer.credential).toEqual(new Credential());
    expect(buyer.gender).toBe('');
    expect(buyer.birthday).toBe('');
    expect(buyer.email).toBe('');
  });
  // test('obj 为 null', () => {
  //   const buyer = new Buyer();
  //   const obj = null;
  //   buyer.assign(obj);
  //   expect(buyer.id).toBe('');
  //   expect(buyer.name).toBe('');
  //   expect(buyer.credential).toEqual(new Credential());
  //   expect(buyer.gender).toBe('');
  //   expect(buyer.birthday).toBe('');
  //   expect(buyer.email).toBe('');
  // });
  // test('obj 为空对象', () => {
  //   const buyer = new Buyer();
  //   const obj = {};
  //   buyer.assign(obj);
  //   expect(buyer.id).toBe('');
  //   expect(buyer.name).toBe('');
  //   expect(buyer.credential).toEqual(new Credential());
  //   expect(buyer.gender).toBe('');
  //   expect(buyer.birthday).toBe('');
  //   expect(buyer.email).toBe('');
  // });
  // test('obj 为正常对象，但某些属性不存在，某些为null', () => {
  //   const buyer = new Buyer();
  //   const obj = {
  //     name: 'Jack ',
  //     credential: null,
  //     gender: ' male ',
  //     birthday: '',
  //   };
  //   buyer.assign(obj);
  //   expect(buyer.id).toBe('');
  //   expect(buyer.name).toBe('JACK');
  //   expect(buyer.credential).toEqual(new Credential());
  //   expect(buyer.gender).toBe('MALE');
  //   expect(buyer.birthday).toBe('');
  //   expect(buyer.email).toBe('');
  // });
});

/**
 * 单元测试 Buyer.normalize()
 *
 * @author 胡海星
 */
// describe('Buyer.normalize', () => {
//   test('buyer为新建对象', () => {
//     const buyer = new Buyer();
//     const id = buyer.id;
//     buyer.normalize('id');
//     buyer.normalize('name');
//     buyer.normalize('credential');
//     buyer.normalize('gender');
//     buyer.normalize('birthday');
//     buyer.normalize('email');
//     expect(buyer.id).toBe(id);
//     expect(buyer.name).toBe('');
//     expect(buyer.credential).toEqual(new Credential());
//     expect(buyer.gender).toBe('');
//     expect(buyer.birthday).toBe('');
//     expect(buyer.email).toBe('');
//   });
//   test('buyer为正常对象', () => {
//     const buyer = new Buyer();
//     buyer.id = '123';
//     buyer.name = ' x ';
//     buyer.credential = new Credential('identity_card', ' 123abc  ');
//     buyer.gender = 'male';
//     buyer.birthday = '  2020-01-01 Fri';
//     buyer.email = 'i@i.com ';
//     buyer.normalize('id');
//     buyer.normalize('name');
//     buyer.normalize('credential');
//     buyer.normalize('gender');
//     buyer.normalize('birthday');
//     buyer.normalize('email');
//     expect(buyer.id).toBe('123');
//     expect(buyer.name).toBe('X');
//     expect(buyer.credential.type).toBe('IDENTITY_CARD');
//     expect(buyer.credential.number).toBe('123ABC');
//     expect(buyer.gender).toBe('MALE');
//     expect(buyer.birthday).toBe('2020-01-01 Fri');
//     expect(buyer.email).toBe('i@i.com');
//   });
//   test('buyer为正常对象，normalize不存在的字段', () => {
//     const buyer = new Buyer();
//     buyer.id = '123';
//     buyer.name = ' x ';
//     buyer.credential = new Credential('identity_card', ' 123abc  ');
//     buyer.gender = 'male';
//     buyer.birthday = '  2020-01-01 Fri';
//     buyer.email = 'i@i.com ';
//     buyer.normalize('id');
//     buyer.normalize('name');
//     buyer.normalize('credential');
//     buyer.normalize('gender');
//     buyer.normalize('birthday');
//     buyer.normalize('email');
//     buyer.normalize('xxx');
//     expect(buyer.id).toBe('123');
//     expect(buyer.name).toBe('X');
//     expect(buyer.credential.type).toBe('IDENTITY_CARD');
//     expect(buyer.credential.number).toBe('123ABC');
//     expect(buyer.gender).toBe('MALE');
//     expect(buyer.birthday).toBe('2020-01-01 Fri');
//     expect(buyer.email).toBe('i@i.com');
//   });
// });

// /**
//  * 单元测试 Buyer.validate()
//  *
//  * @author 胡海星
//  */
// describe('Buyer.validate', () => {
//   test('正确的buyer对象', () => {
//     const obj = {
//       id: '255333475727441928',
//       name: '张三丰',
//       credential: {
//         type: 'IDENTITY_CARD',
//         number: '110101199003078515',
//       },
//       gender: 'MALE',
//       birthday: '1990-03-07',
//       mobile: '18602543764',
//       email: '',
//     };
//     const buyer = Buyer.create(obj);
//     const result = Buyer.validate(buyer);
//     console.log(result);
//     expect(result.success).toBe(true);
//   });
// });
