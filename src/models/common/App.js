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
import Info from './Info';
import State from './State';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此模型表示应用。
 *
 * @author 胡海星
 */
@Model
class App {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 代码，全局不可重复，一旦设置不能更改。
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 名称，同一机构下不可重复。
   */
  @Normalizable
  @Label('名称')
  name = '';

  /**
   * 所属机构的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('所属机构')
  organization = null;

  /**
   * 所属类别的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('类别')
  @Nullable
  category = null;

  /**
   * 对象状态。
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
   * 网址 URL。
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
   * 备注。
   */
  @Normalizable
  @Label('备注')
  @Nullable
  comment = '';

  /**
   * 安全秘钥，从数据库中读取出来的是秘钥加盐后的哈希值。
   */
  @Normalizable
  @Label('安全秘钥')
  security_key = '';

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

export default App;
