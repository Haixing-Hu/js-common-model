////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  IdentityCard,
  OfficerCard,
} from '@haixing_hu/common-validator';
import {
  Credential,
  CredentialType,
} from '../../../src';

/**
 * 单元测试 Credential.prototype.validate()
 *
 * @author 胡海星
 */
describe('Credential.prototype.validate()', () => {
  test('默认构造的Credential对象，validate()', () => {
    const credential = new Credential();
    const result = credential.validate();
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写身份证号码');
  });
  test('默认构造的Credential对象，类型为军官证，validate()', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value);
    const result = credential.validate();
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写中国人民解放军军官证号码');
  });
  test('默认构造的Credential对象，类型为护照，validate()', () => {
    const credential = new Credential(CredentialType.PASSPORT.value);
    const result = credential.validate();
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写护照号码');
  });
  test('正确的Credential对象，类型为身份证，validate()', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate();
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate()', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate();
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate()', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate();
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${IdentityCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为军官证，validate()', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate();
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${OfficerCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为错误类型，validate()', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate();
    expect(result.success).toBe(false);
    expect(result.description).toBe('证件类型不受支持');
  });
  test('错误的Credential对象，类型为空，validate()', () => {
    const credential = new Credential('', '123');
    const result = credential.validate();
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');
  });
});

/**
 * 单元测试 credential.validate("*" )
 *
 * @author 胡海星
 */
describe('credential.validate("*")', () => {
  test('默认构造的Credential对象，validate("*")', () => {
    const credential = new Credential();
    const result = credential.validate('*');
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写身份证号码');
  });
  test('正确的Credential对象，类型为身份证，validate("*")', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate('*');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate("*")', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate('*');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate("*")', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate('*');
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${IdentityCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为军官证，validate("*")', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate('*');
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${OfficerCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为错误类型，validate("*")', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate('*');
    expect(result.success).toBe(false);
    expect(result.description).toBe('证件类型不受支持');
  });
  test('错误的Credential对象，类型为空，validate("*")', () => {
    const credential = new Credential('', '123');
    const result = credential.validate('*');
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');
  });
});

/**
 * 单元测试 credential.validate("*", { parentInstance: person })
 *
 * @author 胡海星
 */
describe('credential.validate("*" , { owner: "张三" })', () => {
  test('默认构造的Credential对象，validate("*" , { owner: "张三" })', () => {
    const credential = new Credential();
    const result = credential.validate('*', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的身份证号码');
  });
  test('正确的Credential对象，类型为身份证，validate("*" , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate('*', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate("*" , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate('*', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate("*" , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate('*', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe(`张三的${IdentityCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为军官证，validate("*" , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate('*', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe(`张三的${OfficerCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为错误类型，validate("*" , { owner: "张三" })', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate('*', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的证件类型不受支持');
  });
  test('错误的Credential对象，类型为空，validate("*" , { owner: "张三" })', () => {
    const credential = new Credential('', '123');
    const result = credential.validate('*', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');
  });
});

/**
 * 单元测试 credential.validate("type")
 *
 * @author 胡海星
 */
describe('credential.validate("type")', () => {
  test('默认构造的Credential对象，validate("type")', () => {
    const credential = new Credential();
    const result = credential.validate('type');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为身份证，validate("type")', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate('type');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate("type")', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate('type');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate("type")', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate('type');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为军官证，validate("type")', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate('type');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为错误类型，validate("type")', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate('type');
    expect(result.success).toBe(false);
    expect(result.description).toBe('证件类型不受支持');
  });
  test('错误的Credential对象，类型为空，validate("type")', () => {
    const credential = new Credential('', '123');
    const result = credential.validate('type');
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');
  });
});

/**
 * 单元测试 credential.validate("type", { owner: '张三' })
 *
 * @author 胡海星
 */
describe('credential.validate("type", { owner: "张三" })', () => {
  test('默认构造的Credential对象，validate("type", { owner: "张三" })', () => {
    const credential = new Credential();
    const result = credential.validate('type', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为身份证，validate("type", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate('type', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate("type", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate('type', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate("type", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate('type', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为军官证，validate("type", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate('type', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为错误类型，validate("type", { owner: "张三" })', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate('type', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的证件类型不受支持');
  });
  test('错误的Credential对象，类型为空，validate("type", { owner: "张三" })', () => {
    const credential = new Credential('', '123');
    const result = credential.validate('type', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');
  });
});

/**
 * 单元测试 credential.validate("number")
 *
 * @author 胡海星
 */
describe('credential.validate("number")', () => {
  test('默认构造的Credential对象，validate("number")', () => {
    const credential = new Credential();
    const result = credential.validate('number');
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写身份证号码');
  });
  test('正确的Credential对象，类型为身份证，validate("number")', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate('number');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate("number")', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate('number');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate("number")', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate('number');
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${IdentityCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为军官证，validate("number")', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate('number');
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${OfficerCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为错误类型，validate("number")', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate('number');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为空，validate("number")', () => {
    const credential = new Credential('', '123');
    const result = credential.validate('number');
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
});

/**
 * 单元测试 credential.validate("number", { owner: '张三' })
 *
 * @author 胡海星
 */
describe('credential.validate("number", { owner: "张三" })', () => {
  test('默认构造的Credential对象，validate("number", { owner: "张三" })', () => {
    const credential = new Credential();
    const result = credential.validate('number', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的身份证号码');
  });
  test('正确的Credential对象，类型为身份证，validate("number", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate('number', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate("number", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate('number', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate("number", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate('number', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe(`张三的${IdentityCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为军官证，validate("number", { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate('number', { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe(`张三的${OfficerCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为错误类型，validate("number", { owner: "张三" })', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate('number', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为空，validate("number", { owner: "张三" })', () => {
    const credential = new Credential('', '123');
    const result = credential.validate('number', { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
});

/**
 * 单元测试 credential.validate(["type", "number"], { owner: '张三' })
 *
 * @author 胡海星
 */
describe('credential.validate(["type", "number"])', () => {
  test('默认构造的Credential对象，validate(["type", "number"])', () => {
    const credential = new Credential();
    const result = credential.validate(['type', 'number']);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写身份证号码');
  });
  test('正确的Credential对象，类型为身份证，validate(["type", "number"])', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate(['type', 'number']);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate(["type", "number"])', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate(['type', 'number']);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate(["type", "number"])', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate(['type', 'number']);
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${IdentityCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为军官证，validate(["type", "number"])', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate(['type', 'number']);
    expect(result.success).toBe(false);
    expect(result.description).toBe(`${OfficerCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为错误类型，validate(["type", "number"])', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate(['type', 'number']);
    expect(result.success).toBe(false);
    expect(result.description).toBe('证件类型不受支持');
  });
  test('错误的Credential对象，类型为空，validate(["type", "number"])', () => {
    const credential = new Credential('', '123');
    const result = credential.validate(['type', 'number']);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择证件类型');
  });
});

/**
 * 单元测试 credential.validate(["type", "number"], { owner: '张三' })
 *
 * @author 胡海星
 */
describe('credential.validate(["type", "number"] , { owner: "张三" })', () => {
  test('默认构造的Credential对象，validate(["type", "number"] , { owner: "张三" })', () => {
    const credential = new Credential();
    const result = credential.validate(['type', 'number'], { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的身份证号码');
  });
  test('正确的Credential对象，类型为身份证，validate(["type", "number"] , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078515');
    const result = credential.validate(['type', 'number'], { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的Credential对象，类型为军官证，，validate(["type", "number"] , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123.45');
    const result = credential.validate(['type', 'number'], { owner: '张三' });
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('错误的Credential对象，类型为身份证，validate(["type", "number"] , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.IDENTITY_CARD.value, '110101199003078516');
    const result = credential.validate(['type', 'number'], { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe(`张三的${IdentityCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为军官证，validate(["type", "number"] , { owner: "张三" })', () => {
    const credential = new Credential(CredentialType.OFFICER_CARD.value, '123');
    const result = credential.validate(['type', 'number'], { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe(`张三的${OfficerCard.name}号码格式不正确`);
  });
  test('错误的Credential对象，类型为错误类型，validate(["type", "number"] , { owner: "张三" })', () => {
    const credential = new Credential('xxx', '123');
    const result = credential.validate(['type', 'number'], { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的证件类型不受支持');
  });
  test('错误的Credential对象，类型为空，validate(["type", "number"] , { owner: "张三" })', () => {
    const credential = new Credential('', '123');
    const result = credential.validate(['type', 'number'], { owner: '张三' });
    expect(result.success).toBe(false);
    expect(result.description).toBe('请选择张三的证件类型');
  });
});

/**
 * 单元测试 Credential.create()
 *
 * @author 胡海星
 */
describe('Credential.create()', () => {
  test('Credential.create(undefined)', () => {
    const data = undefined;
    const credential = Credential.create(data);
    expect(credential).toBeNull();
  });
  test('Credential.create(null)', () => {
    const data = null;
    const credential = Credential.create(data);
    expect(credential).toBeNull();
  });
  test('Credential.create(data)；data没有type字段，没有number字段', () => {
    const data = {};
    const credential = Credential.create(data);
    expect(credential.type).toBe(CredentialType.IDENTITY_CARD);
    expect(credential.number).toBe('');
  });
  test('Credential.create(data)；data没有type字段，有number字段', () => {
    const data = { number: '123' };
    const credential = Credential.create(data);
    expect(credential.type).toBe(CredentialType.IDENTITY_CARD);
    expect(credential.number).toBe('123');
  });
  test('Credential.create(data)；data有正确的type字段，没有number字段', () => {
    const data = { type: CredentialType.PASSPORT.value };
    const credential = Credential.create(data);
    expect(credential.type).toBe(CredentialType.PASSPORT);
    expect(credential.number).toBe('');
  });
  test('Credential.create(data)；data有错误的type字段，没有number字段', () => {
    const data = { type: 'xxxx' };
    expect(() => {
      Credential.create(data);
    }).toThrow(Error);
  });
  test('Credential.create(data)；data有小写的type字段，有小写的number字段', () => {
    const data = { type: CredentialType.PASSPORT.value.toLowerCase(), number: 'abcde' };
    let credential = Credential.create(data);
    expect(credential.type).toBe(CredentialType.PASSPORT);
    expect(credential.number).toBe('ABCDE');
    credential = Credential.create(data, false);
    expect(credential.type).toBe(CredentialType.PASSPORT);
    expect(credential.number).toBe(data.number);
  });
  test('Credential.create()，错误的 type 类型', () => {
    const data = { type: CredentialType.PASSPORT, number: '12345' };
    const credential = Credential.create(data, true);
    expect(credential.type).toBe(CredentialType.PASSPORT);
    expect(credential.number).toBe('12345');
  });
  test('Credential.create()，是否调用 Credential.normalize()', () => {
    const data = { type: ' passport', number: 'xx12345 ' };
    let credential = Credential.create(data);
    expect(credential.type).toBe(CredentialType.PASSPORT);
    expect(credential.number).toBe('XX12345');

    credential = Credential.create(data, false);
    expect(credential.type).toBe(CredentialType.PASSPORT);
    expect(credential.number).toBe('xx12345 ');
  });
});
