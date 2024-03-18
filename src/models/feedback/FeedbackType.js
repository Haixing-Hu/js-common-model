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
 * 此枚举表示用户反馈的类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class FeedbackType {
  /**
   * 投诉
   */
  static COMPLAINT = '投诉';

  /**
   * 举报
   */
  static REPORT = '举报';

  /**
   * 建议
   */
  static SUGGESTION = '建议';
}

export default FeedbackType;
