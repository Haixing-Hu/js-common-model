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
 * 此枚举表示发票数据来源的类别。
 *
 * @author 胡海星
 */
@Enum
class InvoiceSource {
  static ENTERPRISE_CLAIM_INVOICE_MANUAL = '人工录入';

  static ENTERPRISE_CLAIM_INVOICE_YANGZI = '扬子数据';

  static ENTERPRISE_CLAIM_INVOICE_SBPT = '快赔数据';
}

export default InvoiceSource;
