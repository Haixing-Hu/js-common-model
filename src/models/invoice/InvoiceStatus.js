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
 * 此枚举表示开发票状态。
 *
 * @author 胡海星
 */
@Enum
class InvoiceStatus {
  static NO_INVOICE = '无发票';

  static NOT_REQUIRED = '不需要';

  static NOT_PRINTED = '尚未开具';

  static PRINTED = '已开具';

  static REPRINTED = '已重开';

  static INVALID = '已作废';
}

export default InvoiceStatus;
