////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type, ElementType } from '@haixing_hu/common-decorator';
import Product from '../product/Product';
import Insurant from '../person/Insurant';

/**
 * 此模型表示订单分项
 *
 * @author 胡海星
 */
@Model
class OrderItem {
  /**
   * 订单项ID。
   */
  id = '';

  /**
   * 产品信息
   */
  @Type(Product)
  product = null;

  /**
   * 产品数量
   */
  count = 0;

  /**
   * 产品总价
   */
  total_price = 0;

  /**
   * 产品折扣
   */
  discount = 0;

  /**
   * 产品运费
   */
  shipping_cost = 0;

  /**
   * 应付金额
   */
  payable = 0;

  /**
   * 产品客户
   */
  @ElementType(Insurant)
  clients = null;
}

export default OrderItem;
