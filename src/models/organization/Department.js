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
  ElementType,
  Model,
  Normalizable,
  Nullable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import Info from '../util/Info';
import State from '../common/State';
import Payload from '../common/Payload.js';
import Contact from '../contact/Contact';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此模型表示部门。
 *
 * @author 胡海星
 */
@Model
class Department {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 编码，全局唯一。
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 名称，同一个机构中不重复。
   */
  @Normalizable
  @Label('名称')
  name = '';

  /**
   * 在所属机构内部编码。
   */
  @Normalizable
  @Label('内部编码')
  @Nullable
  internal_code = '';

  /**
   * 所属类别基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('类别')
  @Nullable
  category = null;

  /**
   * 上级部门的基本信息，若没有上级部门则为`null`。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('上级部门')
  @Nullable
  parent = null;

  /**
   * 所属机构基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('所属机构')
  organization = null;

  /**
   * 此对象的状态。
   */
  @Normalizable
  @Validatable
  @Type(State)
  @Label('状态')
  state = null;

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
   * 联系方式。
   */
  @Validatable
  @Normalizable
  @Type(Contact)
  @Label('联系方式')
  @Nullable
  contact = null;

  /**
   * 额外参数。
   */
  @Validatable
  @Normalizable
  @ElementType(Payload)
  @Label('额外参数')
  @Nullable
  payloads = [];

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

export default Department;
