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
 * 此枚举表示附件类型。
 *
 * @author 胡海星
 */
@Enum
class MediaType {
  static IMAGE = '图片';

  static DOCUMENT = '文档';

  static AUDIO = '音频';

  static VIDEO = '视频';

  static VCARD = '名片';

  static LOCATION = '地理位置';

  static EXTERNAL_IMAGE = '外部图像';

  static EXTERNAL_AUDIO = '外部音频';

  static EXTERNAL_VIDEO = '外部视频';
}

export default MediaType;
