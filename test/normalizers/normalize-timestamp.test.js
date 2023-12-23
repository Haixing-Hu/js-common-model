////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { normalizeTimestamp } from '../../src';

/**
 * 单元测试{@link normalizeTimestamp}。
 *
 * @author 胡海星
 */
describe('normalizeTimestamp', () => {
  test('normalizeTimestamp(undefined)', () => {
    const value = undefined;
    const result = normalizeTimestamp(value);
    expect(result).toBeUndefined();
  });
  test('normalizeTimestamp(null)', () => {
    const value = null;
    const result = normalizeTimestamp(value);
    expect(result).toBeNull();
  });
  test('normalizeTimestamp("")', () => {
    const value = '';
    const result = normalizeTimestamp(value);
    expect(result).toBe('');
  });
  test('normalizeTimestamp("2021-01-01")', () => {
    const value = '2021-01-01';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T00:00:00.000Z');
  });
  test('normalizeTimestamp("2021-01-01z")', () => {
    const value = '2021-01-01z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T00:00:00.000Z');
  });
  test('normalizeTimestamp("2021-01-01Z")', () => {
    const value = '2021-01-01Z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T00:00:00.000Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2")', () => {
    const value = '2021-01-01T11:2';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:00.000Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:3")', () => {
    const value = '2021-01-01T11:2:3';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.000Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03")', () => {
    const value = '2021-01-01T11:2:03';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.000Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03z")', () => {
    const value = '2021-01-01T11:2:03z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.000Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03Z")', () => {
    const value = '2021-01-01T11:2:03Z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.000Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.1")', () => {
    const value = '2021-01-01T11:2:03.1';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.100Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.1z")', () => {
    const value = '2021-01-01T11:2:03.1z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.100Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.1Z")', () => {
    const value = '2021-01-01T11:2:03.1Z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.100Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.12")', () => {
    const value = '2021-01-01T11:2:03.12';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.120Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.12z")', () => {
    const value = '2021-01-01T11:2:03.12z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.120Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.12Z")', () => {
    const value = '2021-01-01T11:2:03.12Z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.120Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.123")', () => {
    const value = '2021-01-01T11:2:03.123';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.123Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.123z")', () => {
    const value = '2021-01-01T11:2:03.123z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.123Z');
  });
  test('normalizeTimestamp("2021-01-01T11:2:03.123Z")', () => {
    const value = '2021-01-01T11:2:03.123Z';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.123Z');
  });
  test('normalizeTimestamp(" 2021-01-01T11:2:03.123Z  ")', () => {
    const value = ' 2021-01-01T11:2:03.123Z  ';
    const result = normalizeTimestamp(value);
    expect(result).toBe('2021-01-01T11:02:03.123Z');
  });
  // test('normalizeTimestamp("2021-01-01T11:2:03.123+8:00")', () => {
  //   const value = '2021-01-01T11:2:03.123+8:00';
  //   const result = normalizeTimestamp(value);
  //   expect(result).toBe('2021-01-01T11:02:03.123Z');
  // });
});
