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
 * 此枚举表示理赔申请单状态。
 *
 * @author 胡海星
 */
@Enum
class ClaimStatus {
  static NOT_SUBMITTED = '未提交';

  static CLAIM_APPLICATION_WAIT_AUDIT = '待审核索赔申请书';

  static CLAIM_APPLICATION_AUDITED = '索赔申请书审核通过';

  static TEMPORARY_SAVED = '暂存待处理';

  static SYSTEM_AUDITED = '系统审核通过';

  static SYSTEM_REJECTED = '系统驳回';

  static WAIT_INSURANCE_COMPANY_AUDITED = '待保司审核';

  static INSURANCE_COMPANY_ACCEPTED = '保司受理中';

  static INSURANCE_COMPANY_REJECTED = '保司驳回';

  static INSURANCE_COMPANY_COMPLETED = '保司已结案';

  static INSURANCE_COMPANY_ANNUL_OR_REFUSED = '保司案件注销/拒赔';

  static CANCELED = '已取消';
}

export default ClaimStatus;
