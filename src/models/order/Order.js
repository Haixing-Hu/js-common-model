////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, ElementType, Type } from '@haixing_hu/common-decorator';
import Currency from '../common/Currency';
import Info from '../common/Info';
import KeyValuePair from '../common/KeyValuePair';
import Seller from '../product/Seller';
import Buyer from './Buyer';
import OrderItem from './OrderItem';
import Consignee from './Consignee';
import ShippingDemand from '../shipping/ShippingDemand';
import ShippingMode from '../shipping/ShippingMode';
import ClientOrder from './ClientOrder';
import OrderStatus from './OrderStatus';
import PaymentType from '../payment/PaymentType';
import Environment from '../system/Environment';
import InvoiceStatus from '../invoice/InvoiceStatus';

const BUY_WITH_SOCIAL_SECURITY = 'buyWithSocialSecurity';

/**
 * 此模型表示订单。
 *
 * @author 胡海星
 */
@Model
class Order {
  /**
   * 订单ID。
   */
  id = '';

  /**
   * 所属用户ID。
   */
  user_id = '';

  /**
   * 所属App的基本信息。
   */
  @Type(Info)
  app = null;

  /**
   * 购买者。
   */
  @Type(Buyer)
  buyer = null;

  /**
   * 销售商。
   */
  @Type(Seller)
  seller = null;

  /**
   * 订单来源的基本信息。
   */
  @Type(Info)
  source = null;

  /**
   * 订单分类的基本信息。
   */
  @Type(Info)
  category = null;

  /**
   * 订单项列表。
   */
  @ElementType(OrderItem)
  items = null;

  /**
   * 订单支付类型。
   */
  @Type(PaymentType)
  pay_type = null;

  /**
   * 货币单位。
   */
  @Type(Currency)
  currency = Currency.CNY.value;

  /**
   * 订单总价，必须大于等于0，保留四位小数。
   *
   * 订单总价 = 订单分项总价之和
   *
   * 订单分项总价 = 订单分项单价 × 订单分项数量
   */
  total_price = 0;

  /**
   * 订单各项总运费，必须大于等于0，保留四位小数。
   *
   * 订单总运费 = 订单分项运费之和
   */
  total_shipping_cost = 0;

  /**
   * 订单各项总折扣，必须大于等于0，保留四位小数。
   *
   * 订单总折扣 = 订单分项折扣之和
   */
  total_discount = 0;

  /**
   * 订单整体折扣，必须大于等于0，保留四位小数。
   */
  discount = 0;

  /**
   * 订单整体折扣原因。
   */
  discount_reason = '';

  /**
   * 订单整体运费，必须大于等于0，保留四位小数。
   */
  shipping_cost = 0;

  /**
   * 应支付金额，必须大于0，保留四位小数。
   *
   * 应支付金额 = 订单总金额 + 订单各项总运费 + 订单整体运费 - 订单各项总折扣 - 订单整体折扣
   */
  payable = 0;

  /**
   * 配送方式。
   */
  @Type(ShippingMode)
  shipping_mode = null;

  /**
   * 收货人信息。
   */
  @Type(Consignee)
  consignee = null;

  /**
   * 配送要求。
   */
  @Type(ShippingDemand)
  shipping_demand = null;

  /**
   * 发货物流记录ID。
   */
  shipping_id = '';

  /**
   * 发货物流单单号。
   */
  shipping_number = '';

  /**
   * 订单备注。
   */
  comment = '';

  /**
   * 订单状态。
   */
  @Type(OrderStatus)
  status = null;

  /**
   * 订单失效时间。
   */
  expired_time = '';

  /**
   * 付款时间。
   */
  pay_time = '';

  /**
   * 发货时间。
   */
  ship_time = '';

  /**
   * 退款时间。
   */
  refund_time = '';

  /**
   * 完成时间。
   */
  complete_time = '';

  /**
   * 放弃时间。
   */
  cancel_time = '';

  /**
   * 发票开具状态。
   */
  @Type(InvoiceStatus)
  invoice_status = null;

  /**
   * 订单提交时客户端环境。
   */
  @Type(Environment)
  environment = null;

  /**
   * 订单的额外参数。
   */
  @ElementType(KeyValuePair)
  payload = null;

  /**
   * 订单推荐人ID。
   */
  refer_id = '';

  /**
   * 订单推荐人ID类型。
   */
  refer_type = '';

  /**
   * 创建时间，即提交时间。
   */
  create_time = '';

  /**
   * 最后一次修改时间。
   */
  modify_time = '';

  /**
   * 标记删除时间。
   */
  delete_time = '';

  /**
   * 测试该订单是否使用个账支付
   *
   * @return
   *     若该订单使用个账支付，则返回true；否则返回false.
   */
  isPaidByMedicare() {
    if (!Array.isArray(this.payload)) {
      return false;
    }
    const i = this.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
    if (i < 0) {
      return false;
    }
    return String(this.payload[i].value) === 'true';
  }

  /**
   * 设置该订单是否使用个账支付
   *
   * @param value
   *     若为true该设置订单使用个账支付，否则设置该订单不使用个账支付。
   */
  setPaidByMedicare(value) {
    const val = (String(value) === 'true');
    const item = { key: BUY_WITH_SOCIAL_SECURITY, value: val };
    if (Array.isArray(this.payload)) {
      const i = this.payload.findIndex((o) => o.key === BUY_WITH_SOCIAL_SECURITY);
      if (i < 0) {
        this.payload.push(item);
      } else {
        this.payload[i].value = value;
      }
    } else if (val) {
      this.payload = [item];
    }
  }

  /**
   * 测试指定用户是否是此订单的购买者
   *
   * @param {Buyer} user
   *    用户信息
   * @return {Boolean}
   *    若指定的用户是当前订单的购买者，则返回true；否则返回false。
   */
  isBuyer(user) {
    if (user && this.buyer) {
      const buyer = this.buyer;
      if (user.hasCredential() && buyer.hasCredential()) {
        return user.credential.equals(buyer.credential);
      } else if (user.hasMobile() && buyer.hasMobile()) {
        return user.mobile === buyer.mobile;
      }
    }
    return false;
  }

  /**
   * 测试指定设备是否是此订单的购买设备
   *
   * @param {String} udid
   *    指定设备的UDID
   * @return {Boolean}
   *    若指定的设备是当前订单的购买设备，则返回true；否则返回false。
   */
  isBuyerDevice(udid) {
    return (udid
          && this.environment
          && this.environment.udid
          && this.environment.udid === udid);
  }

  /**
   * 获取此对象对应的{@link ClientOrder}数组。
   *
   * @return {Array}
   *     此对象对应的{@link ClientOrder}数组。
   */
  getClientOrders() {
    const result = [];
    const items = this.items;
    if (items !== null) {
      for (let i = 0; i < items.length; ++i) {
        const orders = ClientOrder.createArrayForItem(this, items[i]);
        result.push(orders);
      }
    }
    return result;
  }
}

export {
  BUY_WITH_SOCIAL_SECURITY,
  Order,
};

export default Order;
