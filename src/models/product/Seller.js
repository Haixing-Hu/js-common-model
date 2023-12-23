////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model } from '@haixing_hu/common-decorator';

/**
 * 此模型表示商品供应商。
 *
 * @author 胡海星
 */
@Model
class Seller {
  /**
   * ID。
   */
  id = '';

  /**
   * 编码。
   */
  code = '';

  /**
   * 名称。
   */
  name = '';

  /**
   * 联系电话号码。
   */
  phone = '';

  /**
   * 联系手机号码。
   */
  mobile = '';

  /**
   * 电子邮件地址。
   */
  email = '';

  /**
   * 网址。
   */
  url = '';
}

export default Seller;
