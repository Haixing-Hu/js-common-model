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
 * 此枚举表示媒体类型。
 *
 * @author 胡海星
 */
@Enum
class MediaType {
  static IMAGE = '图片';

  static MUSIC = '音乐';

  static RECORD = '录音';

  static AUDIO = '音频';

  static VIDEO = '视频';
}

export default MediaType;
