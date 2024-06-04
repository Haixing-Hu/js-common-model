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
  NameField,
  Normalizable,
  Nullable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import { trimUppercaseString } from '@haixing_hu/common-util';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';
import Credential from '../common/Credential';
import Info from '../util/Info';
import State from '../common/State';
import Gender from '../person/Gender';
import Contact from '../contact/Contact';
import mix from '../mixins/mix';
import WithBirthday from '../mixins/WithBirthday';
import validatePersonNameField from '../../validators/validate-person-name-field';
import validatePersonGenderField from '../../validators/validate-person-gender-field';

/**
 * 此模型表示员工。
 *
 * @author 胡海星
 */
@Model
class Employee extends mix(Object).with(WithBirthday) {
  /**
   * 唯一标识，系统自动生成。
   *
   * @type {String}
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 关联用户的用户名，对应于 {@link User} 类的 username 属性。
   *
   * @type {String}
   */
  @Normalizable
  @Label('用户名')
  @Nullable
  username = '';

  /**
   * 个人档案ID，对应于 {@link Person} 类的 id 属性。
   *
   * @type {String}
   */
  @Normalizable
  @Label('个人档案ID')
  @Nullable
  person_id = '';

  /**
   * 编码，全局唯一。
   *
   * @type {String}
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 在所属机构内部编码，在所属机构内部不可重复。
   *
   * @type {String}
   */
  @Normalizable
  @Label('内部编码')
  @Nullable
  internal_code = '';

  /**
   * 姓名。
   *
   * @type {String}
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validatePersonNameField)
  @Label('姓名')
  @NameField
  name = '';

  /**
   * 性别。
   *
   * @type {String}
   */
  @Normalizable
  @Validatable(validatePersonGenderField)
  @Type(Gender)
  @Label('性别')
  gender = '';

  // birthday 属性继承自 WithBirthday

  /**
   * 所属类别基本信息。
   *
   * @type {Info}
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('类别')
  @Nullable
  category = null;

  /**
   * 所属机构基本信息。
   *
   * @type {Info}
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('所属机构')
  organization = null;

  /**
   * 所属部门基本信息。
   *
   * @type {Info}
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('所属部门')
  @Nullable
  department = null;

  /**
   * 联系方式。
   *
   * @type {Contact}
   */
  @Validatable
  @Normalizable
  @Type(Contact)
  @Label('联系方式')
  @Nullable
  contact = null;

  /**
   * 照片，存储相对路径或者URL。
   *
   * @type {String}
   */
  @Normalizable
  @Label('照片')
  @Nullable
  photo = '';

  /**
   * 描述。
   *
   * @type {String}
   */
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';

  /**
   * 身份证明证件。
   *
   * @type {Credential}
   */
  @Normalizable
  @Validatable
  @Type(Credential)
  @Label('身份证明证件')
  @Nullable
  credential = null;

  /**
   * 执业资格证。
   *
   * @type {Credential}
   */
  @Normalizable
  @Validatable
  @Type(Credential)
  @Label('执业资格证')
  @Nullable
  practising_certificate = null;

  /**
   * 职称资格证。
   *
   * @type {Credential}
   */
  @Normalizable
  @Validatable
  @Type(Credential)
  @Label('职称资格证')
  @Nullable
  title_certificate = null;

  /**
   * 执业类别。
   *
   * @type {String}
   */
  @Normalizable
  @Label('执业类别')
  @Nullable
  practising_type = '';

  /**
   * 执业范围。
   *
   * @type {String}
   */
  @Normalizable
  @Label('执业范围')
  @Nullable
  practising_scope = '';

  /**
   * 职称。
   *
   * @type {String}
   */
  @Normalizable
  @Label('职称')
  @Nullable
  job_title = '';

  /**
   * 此对象的状态。
   *
   * @type {String}
   */
  @Normalizable
  @Validatable
  @Type(State)
  @Label('状态')
  state = '';

  /**
   * 备注。
   *
   * @type {String}
   */
  @Normalizable
  @Label('备注')
  @Nullable
  comment = '';

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   *
   * @type {String}
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
   *
   * @type {String}
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
   *
   * @type {String}
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('标记删除时间')
  @Nullable
  delete_time = '';
}

export default Employee;
