////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { trimUppercaseString } from '@haixing_hu/common-util';
import {
  validateEmailField,
  validateMobileField,
  validatePhoneField,
  validateUrlField,
} from '@haixing_hu/common-validator';
import {
  Model,
  Type,
  Normalizable,
  Validatable,
  Label,
  Nullable,
} from '@haixing_hu/common-decorator';
import Address from './Address';

/**
 * 此模型表示联系方式。
 *
 * @author 胡海星
 */
@Model
class Contact {
  /**
   * 固定电话号码。
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validatePhoneField)
  @Label('固定电话号码')
  @Nullable
  phone = '';

  /**
   * 手机号码。
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validateMobileField)
  @Label('手机号码')
  @Nullable
  mobile = '';

  /**
   * 电子邮件地址。
   */
  @Normalizable
  @Validatable(validateEmailField)
  @Label('电子邮件地址')
  @Nullable
  email = '';

  /**
   * 网址 URL。
   */
  @Normalizable
  @Validatable(validateUrlField)
  @Label('网址')
  @Nullable
  url = '';

  /**
   * 联系地址。
   */
  @Normalizable
  @Validatable
  @Type(Address)
  @Label('联系地址')
  @Nullable
  address = null;
}

export default Contact;
