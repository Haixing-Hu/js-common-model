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
 * 此枚举表示操作系统平台。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class Platform {
  static IOS = '苹果iOS系统';

  static IPAD_OS = '苹果iPadOS系统';

  static ANDROID = '谷歌Android系统';

  static WINDOWS_PHONE = '微软Windows Phone系统';

  static WINDOWS = '微软Windows桌面系统';

  static LINUX = 'Linux桌面系统';

  static MAC = 'Mac桌面系统';

  static WEB = 'Web页面';

  static UNKNOWN = '未知操作系统';
}

export default Platform;
