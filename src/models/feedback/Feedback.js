////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  ElementType,
  Label,
  Model,
  Normalizable,
  Nullable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import {
  validateIntegerField,
  validateTimestampField,
} from '@haixing_hu/common-validator';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';
import User from '../person/User';
import Attachment from '../upload/Attachment';
import StatefulInfo from '../util/StatefulInfo';
import FeedbackStatus from './FeedbackStatus';
import FeedbackType from './FeedbackType';

/**
 * 此模型表示用户的反馈，包括反馈意见、投诉、举报等。
 *
 * @author 胡海星
 */
@Model
class Feedback {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 所属 App 的基本信息。
   */
  @Normalizable
  @Type(StatefulInfo)
  @Label('App')
  app = null;

  /**
   * 该反馈的类型
   */
  @Normalizable
  @Validatable
  @Type(FeedbackType)
  @Label('类型')
  type = null;

  /**
   * 反馈的具体类别，如服务问题、产品质量、人员素质等。
   */
  @Normalizable
  @Label('类别')
  category = '';

  /**
   * 提交者的信息。
   */
  @Normalizable
  @Type(User)
  @Label('提交者')
  submitter = null;

  /**
   * 反馈内容的文字描述。
   * <p>
   * 此属性和`record`属性至少有一个不为空。
   */
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';

  /**
   * 反馈内容的录音附件。
   * <p>
   * 此属性和`description`属性至少有一个不为空。
   */
  @Normalizable
  @Type(Attachment)
  @Label('录音')
  @Nullable
  record = null;

  /**
   * 此反馈的包含的附件，可以是图片、视频、语音等。
   */
  @Normalizable
  @ElementType(Attachment)
  @Label('附件')
  @Nullable
  attachments = null;

  /**
   * 反馈的状态。
   */
  @Normalizable
  @Type(FeedbackStatus)
  @Label('状态')
  status = null;

  /**
   * 备注，通常由管理人员填写。
   */
  @Normalizable
  @Label('备注')
  @Nullable
  comment = '';

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('创建时间')
  @Nullable
  create_time = '';

  /**
   * 对象的最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('最后一次修改时间')
  @Nullable
  modify_time = '';

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('标记删除时间')
  @Nullable
  delete_time = '';
}

export default Feedback;
