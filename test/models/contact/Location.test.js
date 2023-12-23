////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Location } from '../../../src';

/**
 * 单元测试 Location.position
 *
 * @author 胡海星
 */
describe('Location.position', () => {
  test('new Location', () => {
    const location = new Location();
    expect(location.position).toEqual([0, 0]);
  });
  test('normal Location', () => {
    const location = new Location(118.759031, 31.996905);
    expect(location.position).toEqual([118.759031, 31.996905]);
  });
});
