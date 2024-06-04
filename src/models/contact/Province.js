////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  validateTimestampField,
  validateUrlField,
} from '@haixing_hu/common-validator';
import {
  Label,
  Model,
  Normalizable,
  Nullable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';
import Info from '../util/Info';

/**
 * 此模型表示省份。
 *
 * @author 胡海星
 */
@Model
class Province {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 省份代码，全局不可重复。
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 省份名称，同一国家内不可重复。
   */
  @Normalizable
  @Label('名称')
  name = '';

  /**
   * 所属国家的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('所属国家')
  country = null;

  /**
   * 邮政编码。
   */
  @Normalizable
  @Label('邮政编码')
  @Nullable
  postalcode = '';

  /**
   * 级别。
   */
  @Label('级别')
  @Nullable
  level = 0;

  /**
   * 图标。
   */
  @Normalizable
  @Label('图标')
  @Nullable
  icon = '';

  /**
   * 网址。
   */
  @Normalizable
  @Validatable(validateUrlField)
  @Label('网址')
  @Nullable
  url = '';

  /**
   * 描述。
   */
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('创建时间')
  @Nullable
  create_time = '';

  /**
   * 对象的最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('最后一次修改时间')
  @Nullable
  modify_time = '';

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('标记删除时间')
  @Nullable
  delete_time = '';
}

export default Province;
