////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  validateIntegerField,
  validateTimestampField,
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
import InfoWithEntity from '../util/InfoWithEntity';

/**
 * 此模型表示类别。
 *
 * @author 胡海星
 */
@Model
class Category {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 所属实体，一旦设置不能更改。
   */
  @Normalizable
  @Label('所属实体')
  entity = '';

  /**
   * 代码，全局不可重复，一旦设置不能更改。
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 名称，同一实体下不可重复。
   */
  @Normalizable
  @Label('名称')
  name = '';

  /**
   * 图标，存储相对路径或者URL。
   */
  @Normalizable
  @Label('图标')
  @Nullable
  icon = '';

  /**
   * 描述。
   */
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';

  /**
   * 显示标题。
   */
  @Normalizable
  @Label('显示标题')
  @Nullable
  title = '';

  /**
   * 所属父类别的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(InfoWithEntity)
  @Label('父类别')
  @Nullable
  parent = null;

  /**
   * 是否预定义。
   */
  @Normalizable
  @Label('是否预定义')
  @Nullable
  predefined = false;

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

export default Category;
