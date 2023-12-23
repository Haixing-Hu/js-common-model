////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { CredentialType } from '../../../src';
import { testEnumClass } from '../helper';

/**
 * 单元测试`CredentialType`枚举类。
 *
 * @author 胡海星
 */
testEnumClass(CredentialType);

/**
 * 测试`CredentialType`自定义字段和方法。
 *
 * @author 胡海星
 */
describe('测试CredentialType向前兼容性', () => {
  test('测试 CredentialType.DEFAULT', () => {
    const values = CredentialType.DEFAULT;
    expect(values).toBe(CredentialType.IDENTITY_CARD);
  });
});
