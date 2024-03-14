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
import Info from '../util/Info';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此模型表示数据字典中的条目。
 *
 * @author 胡海星
 */
@Model
class DictEntry {
  /**
   * 唯一标识，系统自动生成。
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 编码，全局不可重复，一旦设置不能更改。
   */
  @Validatable
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 名称。
   */
  @Validatable
  @Normalizable
  @Label('名称')
  @Nullable
  name = '';

  /**
   * 所属字典的基本信息。
   */
  @Validatable
  @Normalizable
  @Type(Info)
  @Label('所属字典')
  @Nullable
  dict = null;

  /**
   * 详细描述。
   */
  @Validatable
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';

  /**
   * 备注。
   */
  @Validatable
  @Normalizable
  @Label('备注')
  @Nullable
  comment = '';

  /**
   * 父项条目。
   */
  @Validatable
  @Normalizable
  @Type(Info)
  @Label('父项条目')
  @Nullable
  parent = null;

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Validatable(validateTimestampField)
  @Normalizable(normalizeTimestamp)
  @Label('创建时间')
  @Nullable
  create_time = '';

  /**
   * 对象的最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
    */
  @Validatable(validateTimestampField)
  @Normalizable(normalizeTimestamp)
  @Label('修改时间')
  @Nullable
  modify_time = '';

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Validatable(validateTimestampField)
  @Normalizable(normalizeTimestamp)
  @Label('删除时间')
  @Nullable
  delete_time = '';
}

export default DictEntry;
