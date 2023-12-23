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
  validateMobileField,
} from '@haixing_hu/common-validator';
import {
  Label,
  Model,
  Normalizable,
  Nullable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import { trimUppercaseString } from '@haixing_hu/common-util';
import Info from '../common/Info';
import Gender from '../person/Gender';
import Credential from '../common/Credential';
import mix from '../mixins/mix';
import WithBirthday from '../mixins/WithBirthday';
import validatePersonNameField from '../../validators/validate-person-name-field';
import validatePersonGenderField from '../../validators/validate-person-gender-field';

/**
 * 此模型表示员工的基本信息。
 *
 * @author 胡海星
 */
@Model
class EmployeeInfo extends mix(Object).with(WithBirthday) {
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
   * 关联用户的用户名，对应于 {@link User} 类的 username 属性。
   *
   * @type {String}
   */
  @Normalizable
  @Label('用户名')
  @Nullable
  username = '';

  /**
   * 姓名。
   *
   * @type {String}
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validatePersonNameField)
  @Label('姓名')
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
   * 身份证明证件。
   *
   * @type {Credential}
   */
  @Normalizable
  @Validatable
  @Type(Credential)
  @Label('身份证明证件')
  @Nullable
  credential = new Credential();

  /**
   * 手机号码
   *
   * @type {String}
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validateMobileField)
  @Label('手机号码')
  @Nullable
  mobile = '';

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
}

export default EmployeeInfo;
