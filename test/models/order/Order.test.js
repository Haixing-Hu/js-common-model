////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Order, BUY_WITH_SOCIAL_SECURITY } from '../../../src';

/**
 * 单元测试 'src/models/Order.js'
 *
 * @author 胡海星
 */
describe('Order.isPaidByMedicare', () => {
  test('Order.payload 为 null', () => {
    const order = new Order();
    expect(order.payload).toBeNull();
    expect(order.isPaidByMedicare()).toBe(false);
  });
  test('Order.payload 为 undefined', () => {
    const order = new Order();
    order.payload = undefined;
    expect(order.payload).toBeUndefined();
    expect(order.isPaidByMedicare()).toBe(false);
  });
  test('Order.payload 为空数组', () => {
    const order = new Order();
    order.payload = [];
    expect(order.isPaidByMedicare()).toBe(false);
  });
  test('Order.payload 不包含 key = buyWithSocialSecurity 的项', () => {
    const order = new Order();
    order.payload = [{ key: 'k1', value: 'v1' }];
    expect(order.isPaidByMedicare()).toBe(false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "false"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'false' }];
    expect(order.isPaidByMedicare()).toBe(false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = false', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: false }];
    expect(order.isPaidByMedicare()).toBe(false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = null', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: null }];
    expect(order.isPaidByMedicare()).toBe(false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = true', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: true }];
    expect(order.isPaidByMedicare()).toBe(true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "true"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'true' }];
    expect(order.isPaidByMedicare()).toBe(true);
  });
});

describe('Order.setPaidByMedicare', () => {
  test('Order.payload 为 null，设置为 true', () => {
    const order = new Order();
    expect(order.payload).toBeNull();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 为 null，设置为 "true"', () => {
    const order = new Order();
    expect(order.payload).toBeNull();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 为 null，设置为 false', () => {
    const order = new Order();
    expect(order.payload).toBeNull();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeNull();
  });
  test('Order.payload 为 null，设置为 "false"', () => {
    const order = new Order();
    expect(order.payload).toBeNull();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeNull();
  });
  test('Order.payload 为 null，设置为 null', () => {
    const order = new Order();
    expect(order.payload).toBeNull();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeNull();
  });
  test('Order.payload 为 undefined，设置为 true', () => {
    const order = new Order();
    order.payload = undefined;
    expect(order.payload).toBeUndefined();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 为 undefined，设置为 "true"', () => {
    const order = new Order();
    order.payload = undefined;
    expect(order.payload).toBeUndefined();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 为 undefined，设置为 false', () => {
    const order = new Order();
    order.payload = undefined;
    expect(order.payload).toBeUndefined();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeUndefined();
  });
  test('Order.payload 为 undefined，设置为 "false"', () => {
    const order = new Order();
    order.payload = undefined;
    expect(order.payload).toBeUndefined();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeUndefined();
  });
  test('Order.payload 为 undefined，设置为 null', () => {
    const order = new Order();
    order.payload = undefined;
    expect(order.payload).toBeUndefined();
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeUndefined();
  });
  test('Order.payload 为空数组，设置为 true', () => {
    const order = new Order();
    order.payload = [];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 为空数组，设置为 "true"', () => {
    const order = new Order();
    order.payload = [];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 为空数组，设置为 false', () => {
    const order = new Order();
    order.payload = [];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 为空数组，设置为 "false"', () => {
    const order = new Order();
    order.payload = [];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 为空数组，设置为 null', () => {
    const order = new Order();
    order.payload = [];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 不包含 key = buyWithSocialSecurity 的项，设置为 true', () => {
    const order = new Order();
    order.payload = [{ key: 'k1', value: 'v1' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 不包含 key = buyWithSocialSecurity 的项，设置为 "true"', () => {
    const order = new Order();
    order.payload = [{ key: 'k1', value: 'v1' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 不包含 key = buyWithSocialSecurity 的项，设置为 false', () => {
    const order = new Order();
    order.payload = [{ key: 'k1', value: 'v1' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 不包含 key = buyWithSocialSecurity 的项，设置为 "false"', () => {
    const order = new Order();
    order.payload = [{ key: 'k1', value: 'v1' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 不包含 key = buyWithSocialSecurity 的项，设置为 null', () => {
    const order = new Order();
    order.payload = [{ key: 'k1', value: 'v1' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "false"，设置为 true', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'false' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "false"，设置为 "true"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'false' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "false"，设置为 false', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'false' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "false"，设置为 "false"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'false' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "false"，设置为 null', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'false' }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = false，设置为 true', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: false }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = false，设置为 "true"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: false }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = false，设置为 false', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: false }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = false，设置为 "false"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: false }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = false，设置为 null', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: false }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = null，设置为 true', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: null }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = null，设置为 "true"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: null }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = null，设置为 false', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: null }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = null，设置为 "false"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: null }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = null，设置为 null', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: null }];
    expect(order.isPaidByMedicare()).toBe(false);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });

  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = true，设置为 true', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: true }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = true，设置为 "true"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: true }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = true，设置为 false', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: true }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = true，设置为 "false"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: true }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = true，设置为 null', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: true }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "true"，设置为 true', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'true' }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare(true);
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "true"，设置为 "true"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'true' }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare('true');
    expect(order.isPaidByMedicare()).toBe(true);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === true);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "true"，设置为 false', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'true' }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare(false);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "true"，设置为 "false"', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'true' }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare('false');
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
  test('Order.payload 包含 key = buyWithSocialSecurity 的项但 value = "true"，设置为 null', () => {
    const order = new Order();
    order.payload = [{ key: BUY_WITH_SOCIAL_SECURITY, value: 'true' }];
    expect(order.isPaidByMedicare()).toBe(true);
    order.setPaidByMedicare(null);
    expect(order.isPaidByMedicare()).toBe(false);
    expect(order.payload).toBeInstanceOf(Array);
    const index = order.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    expect(index >= 0);
    expect(order.payload[index].value === false);
  });
});
