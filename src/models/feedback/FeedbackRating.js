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
 * 此枚举表示用户的满意度评价。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class FeedbackRating {
  /**
   * 满意
   */
  static SATISFIED = '满意';

  /**
   * 一般
   */
  static NEUTRAL = '一般';

  /**
   * 不满意
   */
  static DISSATISFIED = '不满意';
}

export default FeedbackRating;
