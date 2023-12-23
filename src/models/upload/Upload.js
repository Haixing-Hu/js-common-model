////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type } from '@haixing_hu/common-decorator';
import AttachmentType from './AttachmentType';
import FileInfo from './FileInfo';

/**
 * 此模型表示一个上传的文件的元信息。
 *
 * @author 胡海星
 */
@Model
class Upload {
  /**
   * 唯一标识，系统自动生成。
   */
  id = '';

  /**
   * 附件类型。
   */
  @Type(AttachmentType)
  type = null;

  /**
   * 原始文件在服务器上的存储信息。
   */
  @Type(FileInfo)
  file = null;

  /**
   * 视频文件的截屏在服务器上的存储信息。
   */
  @Type(FileInfo)
  screenshot = null;

  /**
   * 图像/视频文件的小号缩略图在服务器上的存储信息。
   */
  @Type(FileInfo)
  small_thumbnail = null;

  /**
   * 图像/视频文件的大号缩略图在服务器上的存储信息。
   */
  @Type(FileInfo)
  large_thumbnail = null;

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  create_time = '';

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  delete_time = '';
}

export default Upload;
