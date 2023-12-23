////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type } from '@haixing_hu/common-decorator';
import State from '../common/State';
import Info from '../common/Info';
import Owner from '../common/Owner';
import Upload from './Upload';
import AttachmentType from './AttachmentType';

/**
 * 此枚举表示媒体类型。
 *
 * @author 胡海星
 */
@Model
class Attachment {
  /**
   * 唯一标识，系统自动生成。
   */
  id = '';

  /**
   * 该附件的所有者。
   */
  @Type(Owner)
  owner = null;

  /**
   * 附件类型。
   */
  @Type(AttachmentType)
  type = null;

  /**
   * 附件分类。
   */
  @Type(Info)
  category = null;

  /**
   * 该附件在所有者指定属性的附件列表中的索引。
   */
  index = 0;

  /**
   * 标题。
   */
  title = '';

  /**
   * 描述。
   */
  description = '';

  /**
   * 对应的上传文件。
   */
  @Type(Upload)
  upload = null;

  /**
   * 状态。
   */
  @Type(State)
  state = null;

  /**
   * 是否可见，默认为{@code true}
   */
  visible = true;

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  create_time = '';

  /**
   * 对象的最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  modify_time = '';

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  delete_time = '';
}

export default Attachment;
