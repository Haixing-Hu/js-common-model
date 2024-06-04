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
  Model,
  Type,
  ElementType,
  Validatable,
  Normalizable,
  Label,
  Nullable,
} from '@haixing_hu/common-decorator';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';
import Info from '../util/Info';
import State from './State';
import DictEntry from './DictEntry';

/**
 * 此模型表示数据字典。
 *
 * @author 胡海星
 */
@Model
class Dict {
  /**
   * 唯一标识，系统自动生成。
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('ID')
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
  name = '';

  /**
   * 所遵循的标准规范。
   */
  @Validatable
  @Normalizable
  @Label('标准规范')
  @Nullable
  standard_doc = '';

  /**
   * 在所遵循的标准规范中的编码。
   */
  @Validatable
  @Normalizable
  @Label('标准编码')
  @Nullable
  standard_code = '';

  /**
   * 网址 URL。
   */
  @Validatable
  @Normalizable
  @Label('URL')
  @Nullable
  url = '';

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
   * 所属App的基本信息。
   */
  @Validatable
  @Normalizable
  @Type(Info)
  @Label('所属应用')
  @Nullable
  app = null;

  /**
   * 所属类别的基本信息。
   */
  @Validatable
  @Normalizable
  @Type(Info)
  @Label('所属类别')
  @Nullable
  category = null;

  /**
   * 字典条目列表。
   */
  @Validatable
  @Normalizable
  @ElementType(DictEntry)
  @Label('字典条目')
  entries = null;

  /**
   * 对象状态。
   */
  @Validatable
  @Normalizable
  @Type(State)
  @Label('状态')
  @Nullable
  state = null;

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
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
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

export default Dict;
