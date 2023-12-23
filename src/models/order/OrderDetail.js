////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type, ElementType } from '@haixing_hu/common-decorator';
import Order from './Order';
import Return from './Return';
import Transaction from '../settlement/Transaction';

/**
 * 此模型表示订单信息详情
 *
 * @author 胡海星
 */
@Model
class OrderDetail {
  /**
   * 对应的订单的ID。
   */
  id = '';

  /**
   * 对应的订单记录。
   */
  @Type(Order)
  order = null;

  /**
   * 对应的交易记录列表。
   */
  @ElementType(Transaction)
  transactions = null;

  /**
   * 对应的退货记录列表。
   */
  @ElementType(Return)
  returns = null;

  /**
   * 获取对应的{@link ClientOrder}对象数组。
   *
   * @return {Array}
   *     对应的{@link ClientOrder}对象数组。
   */
  getClientOrders() {
    let result = [];
    if (this.order !== null) {
      result = this.order.getClientOrders();
    }
    const transactions = this.transactions;
    for (let i = 0; i < transactions.length; ++i) {
      const tx = transactions[i];
      for (let j = 0; j < result.length; ++j) {
        tx.updateClientOrder(result[j]);
      }
    }
    const returns = this.returns;
    for (let i = 0; i < returns.length; ++i) {
      const ret = returns[i];
      for (let j = 0; j < result.length; ++j) {
        ret.updateClientOrder(result[j]);
      }
    }
    return result;
  }
}

export default OrderDetail;
