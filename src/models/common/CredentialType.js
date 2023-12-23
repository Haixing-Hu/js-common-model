////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Enum } from '@haixing_hu/common-decorator';

/**
 * 此枚举表示证件类型。
 *
 * @author 胡海星
 */
@Enum
class CredentialType {
  static IDENTITY_CARD = '身份证';

  static PASSPORT = '护照';

  static OFFICER_CARD = '中国人民解放军军官证';

  static POLICE_CARD = '中国人民武装警察警官证';

  // static HONGKONG_PASSPORT = '香港特区护照/身份证明';

  // static MACAO_PASSPORT = '澳门特区护照/身份证明';

  static TAIWAN_RETURN_PERMIT = '台湾居民来往大陆通行证';

  static FOREIGNER_PERMANENT_RESIDENCE_PERMIT = '外国人永久居住证';

  // static HONGKONG_MACAO_TAIWAN_RESIDENCE_PERMIT = '港澳台居住证';

  static OTHER = '其他证件';

  /**
   * 默认的证件类型枚举。
   *
   * 注意这里不能用static property定义，因为解析到此处时枚举子尚未被装饰器
   * `@Enum`定义。因此只能用getter动态返回枚举子。
   */
  static get DEFAULT() {
    return CredentialType.IDENTITY_CARD;
  }
}

export default CredentialType;
