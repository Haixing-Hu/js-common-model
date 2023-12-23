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
import PaymentChannel from './PaymentChannel';
import PaymentMode from './PaymentMode';
import Environment from '../system/Environment';
import ErrorInfo from '../system/ErrorInfo';

/**
 * 此模型表示支付信息。
 *
 * @author 胡海星
 */
@Model
class Payment {
  /**
   * 内部ID，全局唯一，亦作为内部流水号。
   */
  id = '';

  /**
   * 类型：付款或退款。
   */
  type = '';

  /**
   * 所属的订单的ID。
   */
  order_id = '';

  /**
   * 所属的交易的ID。
   */
  transaction_id = '';

  /**
   * 支付系统供应商的App的基本信息。
   */
  @Type(Info)
  provider_app = null;

  /**
   * 支付渠道。
   */
  @Type(PaymentChannel)
  channel = null;

  /**
   * 支付模式。
   */
  @Type(PaymentMode)
  model = null;

  /**
   * 支付交易流水号，由支付平台内部生成。
   */
  number = '';

  /**
   * 支付渠道交易流水号，由第三方支付系统（支付宝、微信、银联、银行等）提供。
   */
  channel_number = '';

  /**
   * 第三方支付的回复。
   */
  channel_replay = '';

  /**
   * 货币单位。
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
   * 实付金额 = 应支付总金额 - 支付折扣
   *
   * 如支付失败实付金额为0。
   */
  paid = 0;

  /**
   * 支付手续费，必须大于等于0，保留四位小数。
   *
   * 此手续费是指付款者需要支付的手续费。
   */
  cost = 0;

  /**
   * 支付发生时客户端环境。
   */
  @Type(Environment)
  environment = null;

  /**
   * 支付是否成功。
   */
  success = false;

  /**
   * 支付失败时的错误信息。
   */
  @Type(ErrorInfo)
  error = null;

  /**
   * 支付发起时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  create_time = '';

  /**
   * 支付完成时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  complete_time = '';
}

export default Payment;
