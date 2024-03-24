////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { ClientOrder, Product } from '../../../src';

dayjs.extend(utc);

/**
 * 单元测试 ClientOrder.isInEffect()
 *
 * @author 胡海星
 */
describe('ClientOrder.isInEffect()', () => {
  test('order.product 为 undefined', () => {
    const order = new ClientOrder();
    order.product = undefined;
    expect(order.isInEffect()).toBe(false);
  });
  test('order.product 为 null', () => {
    const order = new ClientOrder();
    order.product = null;
    expect(order.isInEffect()).toBe(false);
  });
  test('order.product.valid_from 为 undefined', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = undefined;
    expect(order.isInEffect()).toBe(false);
  });
  test('order.product.valid_until 为 undefined', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '2020-01-02T00:00:00+8:00';
    order.product.valid_until = undefined;
    expect(order.isInEffect()).toBe(false);
  });
  test('order.product.valid_from 为 null', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = null;
    expect(order.isInEffect()).toBe(false);
  });
  test('order.product.valid_until 为 null', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '2020-01-02T00:00:00+8:00';
    order.product.valid_until = null;
    expect(order.isInEffect()).toBe(false);
  });
  test('order.product.valid_from 为空字符串', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '';
    expect(order.isInEffect()).toBe(false);
  });
  test('order.product.valid_until 为空字符串', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '2020-01-02T00:00:00+8:00';
    order.product.valid_until = '';
    expect(order.isInEffect()).toBe(false);
  });
  test('有效期在现在之前', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.subtract(2, 'month').format();
    order.product.valid_until = now.subtract(1, 'month').format();
    expect(order.isInEffect()).toBe(false);
  });
  test('有效期在现在之后', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.add(1, 'month').format();
    order.product.valid_until = now.add(2, 'month').format();
    expect(order.isInEffect()).toBe(false);
  });
  test('现在在有效期内', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.subtract(1, 'month').format();
    order.product.valid_until = now.add(1, 'month').format();
    expect(order.isInEffect()).toBe(true);
  });
  test('现在是有效期开始', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.format();
    order.product.valid_until = now.add(1, 'month').format();
    expect(order.isInEffect()).toBe(true);
  });
  test('现在是有效期结束', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.subtract(1, 'month').format();
    order.product.valid_until = now.format();
    expect(order.isInEffect()).toBe(true);
  });
  test('现在是有效期开始，valid_from是UTC时间字符串', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.utc().format();
    order.product.valid_until = now.add(1, 'month').format();
    // console.log('now =', now.format());
    // console.log('valid_from =', order.product.valid_from,
    //   'valid_until =', order.product.valid_until);
    expect(order.isInEffect()).toBe(true);
  });
});

/**
 * 单元测试 ClientOrder.isExpired()
 *
 * @author 胡海星
 */
describe('ClientOrder.isExpired()', () => {
  test('order.product 为 undefined', () => {
    const order = new ClientOrder();
    order.product = undefined;
    expect(order.isExpired()).toBe(false);
  });
  test('order.product 为 null', () => {
    const order = new ClientOrder();
    order.product = null;
    expect(order.isExpired()).toBe(false);
  });
  test('order.product.valid_from 为 undefined', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = undefined;
    expect(order.isExpired()).toBe(false);
  });
  test('order.product.valid_until 为 undefined', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '2020-01-02T00:00:00+8:00';
    order.product.valid_until = undefined;
    expect(order.isExpired()).toBe(false);
  });
  test('order.product.valid_from 为 null', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = null;
    expect(order.isExpired()).toBe(false);
  });
  test('order.product.valid_until 为 null', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '2020-01-02T00:00:00+8:00';
    order.product.valid_until = null;
    expect(order.isExpired()).toBe(false);
  });
  test('order.product.valid_from 为空字符串', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '';
    expect(order.isExpired()).toBe(false);
  });
  test('order.product.valid_until 为空字符串', () => {
    const order = new ClientOrder();
    order.product = new Product();
    order.product.valid_from = '2020-01-02T00:00:00+8:00';
    order.product.valid_until = '';
    expect(order.isExpired()).toBe(false);
  });
  test('有效期在现在之前', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.subtract(2, 'month').format();
    order.product.valid_until = now.subtract(1, 'month').format();
    expect(order.isExpired()).toBe(true);
  });
  test('有效期在现在之后', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.add(1, 'month').format();
    order.product.valid_until = now.add(2, 'month').format();
    expect(order.isExpired()).toBe(false);
  });
  test('现在在有效期内', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.subtract(1, 'month').format();
    order.product.valid_until = now.add(1, 'month').format();
    expect(order.isExpired()).toBe(false);
  });
  test('现在是有效期开始', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.format();
    order.product.valid_until = now.add(1, 'month').format();
    expect(order.isExpired()).toBe(false);
  });
  test('现在是有效期结束', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.subtract(1, 'month').format();
    order.product.valid_until = now.format();
    expect(order.isExpired()).toBe(false);
  });
  test('现在是有效期开始，valid_from是UTC时间字符串', () => {
    const order = new ClientOrder();
    order.product = new Product();
    const now = dayjs();
    order.product.valid_from = now.utc().format();
    order.product.valid_until = now.add(1, 'month').format();
    // console.log('now =', now.format());
    // console.log('valid_from =', order.product.valid_from,
    //   'valid_until =', order.product.valid_until);
    expect(order.isExpired()).toBe(false);
  });
});
