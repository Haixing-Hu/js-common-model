////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type, ElementType } from '@haixing_hu/common-decorator';
import Insurant from '../person/Insurant';
import Product from '../product/Product';
import Environment from '../system/Environment';
import Currency from '../common/Currency';

/**
 * 此模型表示退货记录。
 *
 * @author 胡海星
 */
@Model
class Return {
  /**
   * 内部ID，全局唯一，亦作为退货单流水号。
   */
  id = '';

  /**
   * 所属订单的ID。
   */
  order_id = '';

  /**
   * 所属订单项的ID。
   */
  order_item_id = '';

  /**
   * 所对应的退款交易记录的ID。
   */
  transaction_id = '';

  /**
   * 退货发起方。
   */
  issuer = '';

  /**
   * 所退换的货物。
   */
  @Type(Product)
  product = null;

  /**
   * 退货数量，必须大于等于0。
   */
  count = 0;

  /**
   * 货币单位。
   */
  @Type(Currency)
  currency = Currency.CNY.value;

  /**
   * 应退款总金额，必须大于等于0，保留四位小数。
   */
  refundable = 0;

  /**
   * 实际退款总金额，必须大于等于0，保留四位小数。
   *
   * 注意实际退款金额可能小于应退款金额，比如扣除信用卡手续费。
   */
  refunded = 0;

  /**
   * 退货单关联的顾客信息。
   *
   * 购买某些产品或服务时，例如保险、飞机票、船票等，需要提供产品或服务享用人的信息。
   */
  @ElementType(Insurant)
  clients = null;

  /**
   * 退货原因。
   */
  reason = null;

  /**
   * 退货备注。
   */
  comment = null;

  /**
   * 退货状态。
   */
  status = null;

  /**
   * 退货被商家拒绝的原因。
   */
  reject_reason = null;

  /**
   * 退货物流记录ID。
   */
  shipping_id = null;

  /**
   * 退货物流单单号。
   */
  shipping_number = null;

  /**
   * 发票开具状态。
   */
  invoice_status = null;

  /**
   * 退货申请提交时客户端环境。
   */
  @Type(Environment)
  environment = null;

  /**
   * 退货申请失效时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  expired_time = '';

  /**
   * 退款时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  refund_time = '';

  /**
   * 退货发货时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  ship_time = '';

  /**
   * 退货流程完成时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  complete_time = '';

  /**
   * 退货申请放弃时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  cancel_time = '';

  /**
   * 此记录创建时间，即退货申请提交时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  create_time = '';

  /**
   * 此记录最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  modify_time = '';

  /**
   * 此记录标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  delete_time = '';

  /**
   * 根据此对象更新指定的{@link ClientOrder}对象。
   *
   * @param {ClientOrder} clientOrder
   *     待更新的{@link ClientOrder}对象。
   */
  updateClientOrder(clientOrder) {
    if (clientOrder.order_id === this.order_id
        && clientOrder.order_item_id === this.order_item_id) {
      const clients = this.clients;
      if (clients) {
        for (let i = 0; i < clients.length; ++i) {
          const c = clients[i];
          if (c.id === clientOrder.id) {
            clientOrder.return_status = this.status;
            clientOrder.return_issuer = this.issuer;
            return;
          }
        }
      }
    }
  }
}

export default Return;
