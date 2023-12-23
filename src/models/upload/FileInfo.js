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
 * 此模型表示存储在服务器上的文件的元信息。
 *
 * @author 胡海星
 */
@Model
class FileInfo {
  /**
   * 文件存储位置的URL，可以是绝对地址或相对地址。
   */
  path = '';

  /**
   * 文件格式。
   */
  format = '';

  /**
   * 文件的Content-Type。
   */
  content_type = '';

  /**
   * 文件大小，单位为字节。
   */
  size = 0;

  /**
   * （图像或视频）文件的宽度，单位为像素。
   */
  width = 0;

  /**
   * （图像或视频）文件的高度，单位为像素。
   */
  height = 0;

  /**
   * 视频或音频文件的长度，单位为秒。
   */
  duration = 0;

  /**
   * 图像、视频或音频文件的压缩质量，100%为无损压缩。
   */
  quality = 0;
}

export default FileInfo;
