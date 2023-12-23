////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Kinship } from '../../../src';
import { testEnumClass } from '../helper';

/**
 * 单元测试`Kinship`枚举类。
 *
 * @author 胡海星
 */
testEnumClass(Kinship);

/**
 * 测试`Kinship`自定义字段和方法。
 *
 * @author 胡海星
 */
describe('测试`Kinship`自定义字段和方法', () => {
  test('测试 Kinship.directs()', () => {
    const values = Kinship.directs();
    const items = Object.keys(Kinship)
      .filter((key) => (typeof Kinship[key] === 'object') && (key !== 'OTHER'))
      .map((key) => Kinship[key]);
    expect(values).toEqual(items);
  });
});
