////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Address, Location } from '../../../src';

/**
 * 单元测试 Address.position
 *
 * @author 胡海星
 */
describe('Address.position', () => {
  test('new Address', () => {
    const address = new Address();
    expect(address.position).toBeNull();
  });
  test('normal Address with location', () => {
    const address = new Address();
    address.location = new Location(118.759031, 31.996905);
    expect(address.position).toEqual([118.759031, 31.996905]);
  });
});
