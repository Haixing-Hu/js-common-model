////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Enum } from '@haixing_hu/common-decorator';

/**
 * 此枚举表示社交媒体类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class SocialNetwork {
  /**
   * 微信。
   */
  static WECHAT = '微信';

  /**
   * 新浪。
   */
  static SINA = '新浪';

  /**
   * 知乎。
   */
  static ZHIHU = '知乎';

  /**
   * 抖音。
   */
  static DOUYIN = '抖音';

  /**
   * bilibili B站。
   */
  static BILIBILI = 'B站';
}

export default SocialNetwork;
