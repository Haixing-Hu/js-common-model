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
 * 此枚举表示交易类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class TransactionType {
  static BUY = '购买';

  static REFUND = '退款';
}

export default TransactionType;
