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
 * 此枚举表示实体类型的状态。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class State {
  static INACTIVE = '未激活';

  static NORMAL = '正常';

  static LOCKED = '已锁定';

  static BLOCKED = '已屏蔽';

  static OBSOLETED = '已废弃';

  static DISABLED = '禁用';
}

export default State;
