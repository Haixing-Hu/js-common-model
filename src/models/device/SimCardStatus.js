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
 * 此枚举表示SIM卡的状态。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class SimCardStatus {
  static UNKNOWN = '未知';

  static ABSENT = '未插入';

  static PIN_REQUIRED = '被锁定，需PIN解锁';

  static PUK_REQUIRED = '被锁定，需PUK解锁';

  static NETWORK_LOCKED = '网络被锁定';

  static READY = '已就绪';

  static NOT_READY = '永久被禁用';

  static PERM_DISABLED = 'I/O错误';

  static CARD_IO_ERROR = '未插入';

  static CARD_RESTRICTED = '运营商受限';
}

export default SimCardStatus;
