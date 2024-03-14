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
import Credential from '../common/Credential';
import Person from '../person/Person';
import TaxPayerType from '../common/TaxPayerType';
import Contact from '../contact/Contact';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此模型表示机构。
 *
 * @author 胡海星
 */
@Model
class Organization {
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
   * 名称，全局唯一。
   */
  @Normalizable
  @Label('名称')
  name = '';

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
   * 上级机构的基本信息，若没有上级机构则为`null`。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('上级机构')
  @Nullable
  parent = null;

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
   * 备注。
   */
  @Normalizable
  @Label('备注')
  @Nullable
  comment = '';

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
   * 机构的身份证明证件，例如营业执照、组织机构代码证等。
   */
  @Validatable
  @Normalizable
  @Type(Credential)
  @Label('证件')
  @Nullable
  credential = null;

  /**
   * 其他资质证件列表，包含执业许可证、生产经营许可证等。
   */
  @Validatable
  @Normalizable
  @ElementType(Credential)
  @Label('资质')
  @Nullable
  licenses = null;

  /**
   * 机构的法人或负责人信息。
   */
  @Validatable
  @Normalizable
  @Type(Person)
  @Label('法人')
  @Nullable
  principal = null;

  /**
   * 机构的纳税人类型。
   */
  @Normalizable
  @Validatable
  @Type(TaxPayerType)
  @Label('纳税人类型')
  @Nullable
  tax_payer_type = null;

  /**
   * 机构的纳税号。
   */
  @Normalizable
  @Label('纳税号')
  @Nullable
  tax_number = '';

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

export default Organization;
