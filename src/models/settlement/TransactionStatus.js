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
 * 此枚举表示交易状态。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class TransactionStatus {
  static EXPIRED = '已失效';

  static SUBMITTED = '已提交';

  static FAIL = '失败';

  static SUCCESS = '成功';

  static CANCELLED = '已取消';
}

export default TransactionStatus;
