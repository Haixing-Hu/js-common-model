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
 * 此枚举表示反馈的处理状态。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class FeedbackStatus {
  /**
   * 反馈已提交
   */
  static SUBMITTED = '已提交';

  /**
   * 反馈正在被审核中
   */
  static UNDER_REVIEW = '审核中';

  /**
   * 反馈已被接受，正在处理中
   */
  static PROCESSING = '处理中';

  /**
   * 反馈因为某些原因已被拒绝
   */
  static REJECTED = '已拒绝';

  /**
   * 反馈已被解决，等待用户确认和评价
   */
  static RESOLVED = '已解决';

  /**
   * 用户不认可反馈的处理结果
   */
  static DISAPPROVED = '不认可';

  /**
   * 反馈已处理完毕并且获得用户认可，反馈关闭
   */
  static CLOSED = '已关闭';

  /**
   * 反馈已被重新打开
   */
  static REOPENED = '已重新打开';

  /**
   * 反馈已被用户或操作员撤回
   */
  static WITHDRAWN = '已撤回';
}

export default FeedbackStatus;
