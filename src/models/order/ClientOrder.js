////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import { Model, Type, ElementType } from '@haixing_hu/common-decorator';
import Currency from '../common/Currency';
import KeyValuePair from '../common/KeyValuePair';
import Insurant from '../person/Insurant';
import Product from '../product/Product';
import InvoiceStatus from '../invoice/InvoiceStatus';
import Buyer from './Buyer';
import OrderStatus from './OrderStatus';
import ReturnStatus from './ReturnStatus';
import ReturnIssuer from './ReturnIssuer';
import PaymentChannel from '../payment/PaymentChannel';
import PaymentMode from '../payment/PaymentMode';
import PaymentType from '../payment/PaymentType';

/**
 * 此模型表示参保者的订单详情。
 *
 * 注意，此对象所有表示时间的属性，保存的都是该时间符合ISO-8601的字符串表示。
 *
 * @author 胡海星
 */
@Model
class ClientOrder extends Insurant {
  /**
   * 最后一次修改时间。
   */
  modify_time = '';

  /**
   * 订单ID。
   */
  order_id = '';

  /**
   * 订单项ID。
   */
  order_item_id = '';

  /**
   * 对应的交易ID。
   */
  transaction_id = '';

  /**
   * 订单状态。
   */
  @Type(OrderStatus)
  order_status = null;

  /**
   * 退货状态。
   */
  @Type(ReturnStatus)
  return_status = null;

  /**
   * 退货发起方。
   */
  @Type(ReturnIssuer)
  return_issuer = null;

  /**
   * 发票状态。
   */
  @Type(InvoiceStatus)
  invoice_status = null;

  /**
   * 购买的产品。
   */
  @Type(Product)
  product = null;

  /**
   * 购买者。
   */
  @Type(Buyer)
  buyer = null;

  /**
   * 使用的货币。
   */
  @Type(Currency)
  currency = Currency.CNY;

  /**
   * 单价。
   */
  price = 0;

  /**
   * 计量单位。
   */
  unit = null;

  /**
   * 购买数量。
   */
  count = 0;

  /**
   * 应付款项。
   */
  paybale = 0;

  /**
   * 已付款项。
   */
  paid = 0;

  /**
   * 下单时间。
   */
  order_time = '';

  /**
   * 支付时间。
   */
  pay_time = '';

  /**
   * 退款时间。
   */
  refund_time = '';

  /**
   * 支付渠道。
   */
  @Type(PaymentChannel)
  pay_channel = null;

  /**
   * 支付方式。
   */
  @Type(PaymentMode)
  pay_mode = null;

  /**
   * 支付流水号。
   */
  pay_number = '';

  /**
   * 支付渠道流水号。
   */
  pay_channel_number = '';

  /**
   * 退款渠道。
   */
  @Type(PaymentChannel)
  refund_channel = null;

  /**
   * 退款方式。
   */
  @Type(PaymentMode)
  refund_mode = null;

  /**
   * 退款流水号。
   */
  refund_number = '';

  /**
   * 退款渠道流水号。
   */
  refund_channel_number = '';

  /**
   * 是否医保支付。
   */
  paid_by_medicare = false;

  /**
   * 存储额外信息，例如第三方订单号等。
   */
  @ElementType(KeyValuePair)
  payload = null;

  /**
   * 支付类型。
   */
  @Type(PaymentType)
  pay_type = null;

  /**
   * transaction 购买时创建时间？
   *
   * FIXME：有何用？
   */
  pay_create_time = '';

  /**
   * 判定此订单是否处于产品生效期。
   *
   * @return {Boolean}
   *     若此订单处于产品生效期则返回true；否则返回false。
   */
  isInEffect() {
    const product = this.product;
    if (!product || !product.valid_from || !product.valid_until) {
      return false;
    }
    // 时间比较精度只需要精确到秒
    const start = dayjs(product.valid_from).unix();
    const end = dayjs(product.valid_until).unix();
    const now = dayjs().unix();
    return start <= now && now <= end;
  }

  /**
   * 判定此订单的产品是否已过了有效期。
   *
   * @return {Boolean}
   *     若订单的产品是否已过了有效期则返回true；否则返回false。
   */
  isExpired() {
    const product = this.product;
    if (!product || !product.valid_from || !product.valid_until) {
      return false;
    }
    // 时间比较精度只需要精确到秒
    const end = dayjs(product.valid_until).unix();
    const now = dayjs().unix();
    return now > end;
  }

  /**
   * 获取此客户订单的状态。
   *
   * @return
   *     对此订单状态的中文描述，可直接展示给客户。
   */
  getStatus() {
    switch (this.return_status) {
      case ReturnStatus.SUBMITTED:    //  drop down
      case ReturnStatus.ACCEPTED:     //  drop down
      case ReturnStatus.REJECTED:
        return ReturnStatus[this.return_status].name;
      case ReturnStatus.REFUNDING:
        if (this.return_issuer === ReturnIssuer.MEDICARE) {
          return '个账支付垫付款退款中';        // 处理医保个账支付成功，退款进行中的情况
        }
        return ReturnStatus.REFUNDING.name;
      case ReturnStatus.REFUND_FAIL:
        return ReturnStatus.REFUNDING.name;   // 不向用户显示退款失败情况，公司内部处理
      case ReturnStatus.REFUND_SUCCESS:
        if (this.return_issuer === ReturnIssuer.MEDICARE) {
          return '个账支付成功，垫付款已退';      // 处理医保个账支付成功，已退款的情况
        }
        return ReturnStatus.REFUND_SUCCESS.name;
      default:
        break;    // 继续执行
    }
    switch (this.order_status) {
      case OrderStatus.EXPIRED:         //  drop down
      case OrderStatus.SUBMITTED:       //  drop down
      case OrderStatus.ACCEPTED:        //  drop down
      case OrderStatus.REJECTED:        //  drop down
      case OrderStatus.PAID_FAIL:       //  drop down
      case OrderStatus.SEND:            //  drop down
      case OrderStatus.RECEIVED:        //  drop down
      case OrderStatus.CANCELLED:
        return this.order_status.name;
      case OrderStatus.PAID_SUCCESS:    //  drop down
      case OrderStatus.COMPLETED:
        if (this.isInEffect()) {
          return '保障生效中';
        } else if (this.isExpired()) {
          return '保单已过期';
        }
        return this.order_status.name;
      default:
        return '未知';
    }
  }

  /**
   * 判断此客户订单的是否处于已参保状态。
   *
   * @return
   *     若此客户订单的处于已参保状态则返回true；否则返回false。
   */
  isInsured() {
    // 退款
    if (this.return_status) {
      switch (this.return_status) {
        case ReturnStatus.SUBMITTED:
        case ReturnStatus.ACCEPTED:
        case ReturnStatus.REFUNDING:
        case ReturnStatus.REFUND_SUCCESS:
          if (this.return_issuer === ReturnIssuer.MEDICARE) {
            return true;    // 医保个账支付退款，看做已参保
          } else {
            return false;
          }
        default:
          break;
      }
    }
    // 支付或者生效
    if (this.order_status) {
      switch (this.order_status) {
        case OrderStatus.PAID_SUCCESS:
        case OrderStatus.SEND:
        case OrderStatus.RECEIVED:
        case OrderStatus.COMPLETED:
          return true;
        default:
          return false;
      }
    }
    return false;
  }

  /**
   * 从一个 OrderItem 对象创建一个 ClientOrder 对象数组
   *
   * @param {Order} order
   *    一个 Order 对象
   * @param {OrderItem} item
   *    一个指定的 OrderItem 对象
   * @return
   *    对应的 ClientOrder 对象数组
   */
  static createArrayForItem(order, item) {
    const result = [];
    const clients = item.clients;
    if (clients) {
      for (let i = 0; i < clients.length; ++i) {
        const e = ClientOrder.create(clients[i]);
        e.product = Product.create(item.product);
        e.buyer = Buyer.create(order.buyer);
        e.order_id = order.id ?? null;
        e.order_item_id = item.id ?? null;
        e.order_status = order.status ?? null;
        e.order_time = order.create_time ?? null;
        e.pay_time = order.pay_time ?? null;
        e.invoice_status = order.invoice_status ?? null;
        // FIXME: 所有客户均分订单项金额，这是只针对本产品的临时方案
        e.price = item.price ?? 0;
        e.count = 1;
        e.paybale = item.price ?? 0;
        e.paid_by_medicare = order.isPaidByMedicare(); // 是否个账支付
        // 支付方式
        e.pay_type = order.pay_type ?? null;
        // 添加此客户订单项
        result.push(e);
      }
    }
    return result;
  }

  static filterListByCredential(list, credential) {
    const result = [];
    for (let i = 0; i < list.length; ++i) {
      const e = list[i];
      if ((e.credential !== null)
          && (credential != null)
          && (e.credential.type === credential.type)
          && (e.credential.number === credential.number)) {
        result.push(e);
      }
    }
    return result;
  }

  static filterListByMobile(list, mobile) {
    const result = [];
    for (let i = 0; i < list.length; ++i) {
      const e = list[i];
      if ((e.mobile !== null)
          && (mobile != null)
          && (e.mobile === mobile)) {
        result.push(e);
      }
    }
    return result;
  }

  static mergeList(a, b) {
    const ids = new Set();
    const result = [];
    for (let i = 0; i < a.length; ++i) {
      const e = a[i];
      const id = `${e.id}-${e.order_item_id}`;
      if (!ids.has(id)) {
        result.push(e);
        ids.add(id);
      }
    }
    for (let i = 0; i < b.length; ++i) {
      const e = b[i];
      const id = `${e.id}-${e.order_item_id}`;
      if (!ids.has(id)) {
        result.push(e);
        ids.add(id);
      }
    }
    return result;
  }
}

export default ClientOrder;
