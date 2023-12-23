////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Unit tests the specified enumeration class.
 *
 * @author Haixing Hu
 */
export function testEnumClass(EnumClass) {
  describe(`Unit test the enumeration class ${EnumClass.name}`, () => {
    test('Test all the enumerators', () => {
      Object.keys(EnumClass).forEach((key) => {
        const item = EnumClass[key];
        if (typeof item === 'object') {
          expect(item).toBeInstanceOf(EnumClass);
          expect(item.value).toBe(key);
          expect(typeof item.name).toBe('string');
          if (item.code !== undefined) {
            expect(typeof item.code).toBe('string');
          }
        }
      });
    });

    test(`Test ${EnumClass.name}.values()`, () => {
      const values = EnumClass.values();
      const items = Object.keys(EnumClass)
        .filter((key) => (typeof EnumClass[key] === 'object'))
        .map((key) => EnumClass[key]);
      expect(values).toEqual(items);
      const filtered = values.filter((e) => (e instanceof EnumClass));
      expect(filtered.length).toBe(values.length);
    });

    test(`Test ${EnumClass.name}.ofValue(), ${EnumClass.name}.hasValue()`, () => {
      Object.keys(EnumClass).forEach((key) => {
        const item = EnumClass[key];
        if (typeof item === 'object') {
          expect(item).toBeInstanceOf(EnumClass);
          expect(EnumClass.ofValue(item.value)).toBe(item);
          expect(EnumClass.hasValue(item.value)).toBe(true);
        }
      });
      expect(EnumClass.ofValue('')).toBeUndefined();
      expect(EnumClass.hasValue('')).toBe(false);
      expect(EnumClass.ofValue(null)).toBeUndefined();
      expect(EnumClass.hasValue(null)).toBe(false);
      expect(EnumClass.ofValue(undefined)).toBeUndefined();
      expect(EnumClass.hasValue(undefined)).toBe(false);
      expect(EnumClass.ofValue('x?')).toBeUndefined();
      expect(EnumClass.hasValue('x?')).toBe(false);
    });

    test(`Test ${EnumClass.name}.ofName(), ${EnumClass.name}.hasName()`, () => {
      Object.keys(EnumClass).forEach((key) => {
        const item = EnumClass[key];
        if (typeof item === 'object') {
          expect(item).toBeInstanceOf(EnumClass);
          expect(EnumClass.ofName(item.name)).toBe(item);
          expect(EnumClass.hasName(item.name)).toBe(true);
        }
      });
      expect(EnumClass.ofName('')).toBeUndefined();
      expect(EnumClass.hasName('')).toBe(false);
      expect(EnumClass.ofName(null)).toBeUndefined();
      expect(EnumClass.hasName(null)).toBe(false);
      expect(EnumClass.ofName(undefined)).toBeUndefined();
      expect(EnumClass.hasName(undefined)).toBe(false);
      expect(EnumClass.ofName('x?')).toBeUndefined();
      expect(EnumClass.hasName('x?')).toBe(false);
    });

    test(`Test ${EnumClass.name}.ofCode(), ${EnumClass.name}.hasCode()`, () => {
      Object.keys(EnumClass).forEach((key) => {
        const item = EnumClass[key];
        if (typeof item === 'object') {
          expect(item).toBeInstanceOf(EnumClass);
          if (item.code !== undefined) {
            expect(EnumClass.ofCode(item.code)).toBe(item);
            expect(EnumClass.hasCode(item.code)).toBe(true);
          }
        }
      });
      expect(EnumClass.ofCode('')).toBeUndefined();
      expect(EnumClass.hasCode('')).toBe(false);
      expect(EnumClass.ofCode(null)).toBeUndefined();
      expect(EnumClass.hasCode(null)).toBe(false);
      expect(EnumClass.ofCode(undefined)).toBeUndefined();
      expect(EnumClass.hasCode(undefined)).toBe(false);
      expect(EnumClass.ofCode('x?')).toBeUndefined();
      expect(EnumClass.hasCode('x?')).toBe(false);
    });

    test(`Test ${EnumClass.name}.of(), ${EnumClass.name}.has()`, () => {
      Object.keys(EnumClass).forEach((key) => {
        const item = EnumClass[key];
        if (typeof item === 'object') {
          expect(item).toBeInstanceOf(EnumClass);
          expect(EnumClass.of(item.value)).toBe(item);
          expect(EnumClass.has(item.value)).toBe(true);
          expect(EnumClass.of(item.name)).toBe(item);
          expect(EnumClass.has(item.name)).toBe(true);
          if (item.code !== undefined) {
            expect(EnumClass.of(item.code)).toBe(item);
            expect(EnumClass.has(item.code)).toBe(true);
          }
        }
      });
      expect(EnumClass.of('')).toBeUndefined();
      expect(EnumClass.has('')).toBe(false);
      expect(EnumClass.of(null)).toBeUndefined();
      expect(EnumClass.has(null)).toBe(false);
      expect(EnumClass.of(undefined)).toBeUndefined();
      expect(EnumClass.has(undefined)).toBe(false);
      expect(EnumClass.of('x?')).toBeUndefined();
      expect(EnumClass.has('x?')).toBe(false);
    });
  });
}
