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
 * 此枚举表示退货退款状态。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class ReturnStatus {
  static SUBMITTED = '退款已提交';

  static ACCEPTED = '退款已受理';

  static REJECTED = '退款已驳回';

  static REFUNDING = '退款进行中';

  static REFUND_FAIL = '退款失败';

  static REFUND_SUCCESS = '退款成功';
}

export default ReturnStatus;
