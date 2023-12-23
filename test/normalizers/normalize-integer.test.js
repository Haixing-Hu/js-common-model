////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { normalizeInteger } from '../../src';

/**
 * 单元测试{@link normalizeInteger}。
 *
 * @author 胡海星
 */
describe('normalizeInteger', () => {
  test('normalizeInteger(undefined)', () => {
    const value = undefined;
    const result = normalizeInteger(value);
    expect(result).toBeUndefined();
  });
  test('normalizeInteger(null)', () => {
    const value = null;
    const result = normalizeInteger(value);
    expect(result).toBeNull();
  });
  test('normalizeInteger(123)', () => {
    const value = 123;
    const result = normalizeInteger(value);
    expect(result).toBe(123);
  });
  test('normalizeInteger(123.00)', () => {
    const value = 123.00;
    const result = normalizeInteger(value);
    expect(result).toBe(123);
  });
  test('normalizeInteger(123.99)', () => {
    const value = 123.99;
    expect(() => normalizeInteger(value)).toThrow('Invalid integer value');
  });
  test('normalizeInteger("")', () => {
    const value = '';
    const result = normalizeInteger(value);
    expect(result).toBe(0);
  });
  test('normalizeInteger("123")', () => {
    const value = '123';
    const result = normalizeInteger(value);
    expect(result).toBe(123);
  });
  test('normalizeInteger("123.00")', () => {
    const value = '123.00';
    expect(() => normalizeInteger(value)).toThrow('Invalid integer format');
  });
  test('normalizeInteger("123.11")', () => {
    const value = '123.11';
    expect(() => normalizeInteger(value)).toThrow('Invalid integer format');
  });
  test('normalizeInteger("123.99")', () => {
    const value = '123.99';
    expect(() => normalizeInteger(value)).toThrow('Invalid integer format');
  });
  test('normalizeInteger(new Number(123))', () => {
    const value = new Number(123);
    const result = normalizeInteger(value);
    expect(result).toBe(123);
  });
  test('normalizeInteger(new Number(123.00))', () => {
    const value = new Number(123.00);
    const result = normalizeInteger(value);
    expect(result).toBe(123);
  });
  test('normalizeInteger(new Number(123.11))', () => {
    const value = new Number(123.11);
    expect(() => normalizeInteger(value)).toThrow('Invalid integer value');
  });
  test('normalizeInteger(new Number(123.99))', () => {
    const value = new Number(123.99);
    expect(() => normalizeInteger(value)).toThrow('Invalid integer value');
  });
});
