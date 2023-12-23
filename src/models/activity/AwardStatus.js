////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import { Enum } from '@haixing_hu/common-decorator';

/**
 * 此枚举表示奖品状态。
 *
 * @author 胡海星
 */
@Enum
class AwardStatus {
  static RECEIVED = '已领取';

  static UNRECEIVED = '未领取';

  static EXPIRED = '已过期';

  /**
   * 获取指定奖品状态。
   *
   * @param {Award} award
   *     指定的奖品对象。
   * @returns {AwardStatus}
   *     该奖品目前的状态。
   */
  get(award) {
    if (award.receive_time) {
      return AwardStatus.RECEIVED;
    } else {
      // 时间比较精度只需要精确到秒
      const now = dayjs().unix();
      const end = dayjs(award.activity.end_time).unix();
      if (now < end) {
        return AwardStatus.UNRECEIVED;
      } else {
        return AwardStatus.EXPIRED;
      }
    }
  }
}

export default AwardStatus;
