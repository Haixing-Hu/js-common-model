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
 * 此枚举表示订单状态。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class OrderStatus {
  static EXPIRED = '订单已超时';

  static SUBMITTED = '订单已提交';

  static ACCEPTED = '订单已受理';

  static REJECTED = '订单已驳回';

  static PAID_FAIL = '支付失败';

  static PAID_SUCCESS = '支付成功';

  static SEND = '订单已发货';

  static RECEIVED = '订单已签收';

  static COMPLETED = '订单已完成';

  static CANCELLED = '订单已取消';
}

export default OrderStatus;
