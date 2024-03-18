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
import normalizeTimestamp from '../../normalizers/normalize-timestamp';
import User from '../person/User';
import Attachment from '../upload/Attachment';
import FeedbackAction from './FeedbackAction';
import FeedbackRating from './FeedbackRating';
import FeedbackStatus from './FeedbackStatus';

/**
 * 此模型表示用户的反馈的跟踪记录。
 *
 * @author 胡海星
 */
@Model
class FeedbackTrack {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 所属反馈的ID。
   *
   * @type {string}
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('所属反馈ID')
  feedback_id = '';

  /**
   * 进行的操作。
   */
  @Normalizable
  @Type(FeedbackAction)
  @Label('操作')
  action = null;

  /**
   * 提交者的信息。
   */
  @Normalizable
  @Type(User)
  @Label('提交者')
  submitter = null;

  /**
   * 反馈跟踪内容的文字描述。
   * <p>
   * 此属性和`record`属性至少有一个不为空。
   */
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';

  /**
   * 反馈跟踪内容的录音附件。
   * <p>
   * 此属性和`description`属性至少有一个不为空。
   */
  @Normalizable
  @Type(Attachment)
  @Label('录音')
  @Nullable
  record = null;

  /**
   * 此反馈跟踪的包含的附件，可以是图片、视频、语音等。
   */
  @Normalizable
  @ElementType(Attachment)
  @Label('附件')
  @Nullable
  attachments = null;

  /**
   * 此反馈跟踪记录对应的操作执行之前所属反馈的状态。
   */
  @Normalizable
  @Type(FeedbackStatus)
  @Label('操作前状态')
  statusBefore = null;

  /**
   * 此反馈跟踪记录对应的操作执行之后所属反馈的状态。
   */
  @Normalizable
  @Type(FeedbackStatus)
  @Label('操作后状态')
  statusAfter = null;

  /**
   * 用户的满意度评价。
   * <p>
   * 此字段仅当`action`为以下值时有效：
   * <ul>
   * <li>{@link FeedbackAction#USER_WITHDRAW}</li>
   * <li>{@link FeedbackAction#USER_APPROVE}</li>
   * <li> {@link FeedbackAction#USER_DISAPPROVE}</li>
   * </ul>
   */
  @Normalizable
  @Type(FeedbackRating)
  @Label('评价')
  rating = null;

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

export default FeedbackTrack;
