////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  Label, Model,
  Normalizable,
  Type, Validatable,
} from '@haixing_hu/common-decorator';
import { validateTimestampField } from '@haixing_hu/common-validator';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此对象表示令牌。
 *
 * @author 胡海星
 */
@Model
class Token {
  /**
   * 令牌的值。
   *
   * @type {String}
   */
  @Normalizable
  @Validatable
  @Label('令牌值')
  value = '';

  /**
   * 令牌创建时间，UTC时区，精度为秒。
   * <p>
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   *
   * @type {string}
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('创建时间')
  creat_time = '';

  /**
   * 令牌的最大生存时间，单位为秒。
   *
   * <p>{@code null}表示无限制。</p>
   *
   * @type {Number}
   */
  @Normalizable
  @Validatable
  @Label('生存时间')
  @Type(Number)
  max_age = null;

  /**
   * 上一次过期的令牌的值。
   *
   * @type {String}
   */
  @Normalizable
  @Validatable
  @Label('过期令牌值')
  previous_value = '';
}

export default Token;
