////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import { Model, Type } from '@haixing_hu/common-decorator';
import Currency from '../common/Currency';
import Organization from '../organization/Organization';

/**
 * 此模型表示产品信息
 *
 * @author 胡海星
 */
@Model
class Product {
  /**
   * 产品ID。
   */
  id = '';

  /**
   * 产品名称。
   */
  name = '';

  /**
   * 产品代码。
   */
  code = '';

  /**
   * 产品规格。
   */
  specification = '';

  /**
   * 产品描述。
   */
  description = '';

  /**
   * 产品货币单位。
   */
  @Type(Currency)
  currency = Currency.CNY.value;

  /**
   * 产品单价。
   */
  price = 0.0;

  /**
   * 产品销售开始日期。
   */
  sale_from = '';

  /**
   * 产品销售结束日期。
   */
  sale_until = '';

  /**
   * 产品有效期开始日期。
   */
  valid_from = '';

  /**
   * 产品有效期结束日期。
   */
  valid_until = '';

  /**
   * 产品经销商。
   */
  @Type(Organization)
  seller = new Organization();

  isSaleBefore() {
    // 时间比较精度只需要精确到秒
    const start = dayjs(this.sale_from).unix();
    const now = dayjs().unix();
    return now < start;
  }

  isSaleOver() {
    // 时间比较精度只需要精确到秒
    const end = dayjs(this.sale_end).unix();
    const now = dayjs().unix();
    return now > end;
  }

  isSelling() {
    // 时间比较精度只需要精确到秒
    const start = dayjs(this.sale_from).unix();
    const end = dayjs(this.sale_until).unix();
    const now = dayjs().unix();
    return start <= now && now <= end;
  }
}

export default Product;
