////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type } from '@haixing_hu/common-decorator';
import DateRange from '../common/DateRange';
import TimeRange from '../common/TimeRange';
import Packing from './Packing';

/**
 * 此模型表示配送需求。
 *
 * @author 胡海星
 */
@Model
class ShippingDemand {
  /**
   * 允许的配送日期类型。
   */
  day_type = '';

  /**
   * 允许的配送日期范围。
   */
  @Type(DateRange)
  date_range = null;

  /**
   * 允许的配送时间范围。
   */
  @Type(TimeRange)
  time_range = null;

  /**
   * 配送的包装要求。
   */
  @Type(Packing)
  packing = null;

  /**
   * 其他配送要求留言备注。
   */
  comment = '';
}

export default ShippingDemand;
