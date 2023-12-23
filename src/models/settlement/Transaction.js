////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type } from '@haixing_hu/common-decorator';
import Currency from '../common/Currency';
import Info from '../common/Info';
import ReturnIssuer from '../order/ReturnIssuer';
import Participant from '../payment/Participant';
import Payment from '../payment/Payment';
import Environment from '../system/Environment';
import TransactionType from './TransactionType';
import TransactionStatus from './TransactionStatus';
import InvoiceStatus from '../invoice/InvoiceStatus';

/**
 * 此模型表示交易记录
 *
 * @author 胡海星
 */
@Model
class Transaction {
  /**
   * 内部ID，全局唯一，亦作为内部流水号。
   */
  id = '';

  /**
   * 交易类型：购买、退款等。
   */
  @Type(TransactionType)
  type = '';

  /**
   * 退款易所对应的原始付款交易记录的ID。
   *
   * 若此交易不是退款交易则此字段为空。
   */
  origin_id = '';

  /**
   * 交易状态。
   */
  @Type(TransactionStatus)
  status = null;

  /**
   * 发起交易的App的基本信息。
   */
  @Type(Info)
  app = null;

  /**
   * 交易发起的来源的基本信息。
   */
  @Type(Info)
  source = null;

  /**
   * 订单所属类别的基本信息。
   */
  @Type(Info)
  category = null;

  /**
   * 订单ID。
   */
  order_id = '';

  /**
   * 退货记录ID。
   */
  return_id = '';

  /**
   * 退货发起方
   */
  @Type(ReturnIssuer)
  return_issuer = null;

  /**
   * 货币单位
   */
  @Type(Currency)
  currency = Currency.CNY.value;

  /**
   * 应支付总金额，必须大于等于0，保留4位小数。
   */
  payable = 0;

  /**
   * 支付折扣，必须大于等于0，保留4位小数。
   */
  discount = 0;

  /**
   * 实付金额，必须大于等于0，保留4位小数。
   *
   * 实付金额 = 应付金额 - 支付折扣
   *
   * 如支付失败实付金额为0。
   */
  paid = 0;

  /**
   * 收款方信息。
   */
  @Type(Participant)
  payee = null;

  /**
   * 付款方信息。
   */
  @Type(Participant)
  payer = null;

  /**
   * 支付信息。
   */
  @Type(Payment)
  payment = null;

  /**
   * 此交易的失效时间，在此时间内未完成支付则此交易失效。
   */
  expired_time = '';

  /**
   * 此交易的完成时间。
   */
  complete_time = '';

  /**
   * 此交易的发票开具状态。
   */
  @Type(InvoiceStatus)
  invoice_status = null;

  /**
   * 交易发生时客户端环境。
   */
  @Type(Environment)
  environment = null;

  /**
   * 交易备注。
   */
  comment = '';

  /**
   * 此交易的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  create_time = '';

  /**
    * 此交易的最后一次修改时间。
    *
    * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
    * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
    */
  modify_time = '';

  /**
    * 此交易的标记删除时间。
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
    if (clientOrder.order_id === this.order_id) {
      clientOrder.transaction_id = this.id;
      switch (this.type) {
        case 'BUY':
          clientOrder.paid += this.paid;
          if (this.payment !== null) {
            const payment = this.payment;
            clientOrder.pay_channel = payment.channel;
            clientOrder.pay_mode = payment.mode;
            clientOrder.pay_number = payment.number;
            clientOrder.pay_channel_number = payment.channel_number;
            clientOrder.pay_create_time = payment.create_time;
          }
          break;
        case 'REFUND':
        case 'RETURN_AND_REFUND':
          clientOrder.paid -= this.paid;
          if (this.payment !== null) {
            const payment = this.payment;
            clientOrder.refund_channel = payment.channel;
            clientOrder.refund_mode = payment.mode;
            clientOrder.refund_number = payment.number;
            clientOrder.refund_channel_number = payment.channel_number;
          }
          break;
        default:
          break;
      }
    }
  }
}

export default Transaction;
