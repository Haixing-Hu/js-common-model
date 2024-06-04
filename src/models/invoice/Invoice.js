////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  HasLogger,
  Log,
} from '@haixing_hu/logging';
import {
  validateAlphaNumberField,
  validateFloatField,
  validateIntegerField,
  validateTimestampField,
} from '@haixing_hu/common-validator';
import {
  Label,
  ElementType,
  Model,
  Normalizable,
  Nullable,
  Type,
  ValidationResult,
  Validatable,
} from '@haixing_hu/common-decorator';
import {
  floatEqual,
  round,
  stringToMoney,
} from '@haixing_hu/common-util';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';
import InvoiceSource from './InvoiceSource';
import SelfCareItem from '../claim/SelfCareItem';
import InvoiceStatus from './InvoiceStatus';

/**
 * 此模型表示就诊记录关联的发票。
 *
 * @author 胡海星
 */
@Model
@HasLogger
class Invoice {
  /**
   * 唯一标识，系统自动生成。
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 所属理赔单ID。
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('理赔单ID')
  @Nullable
  claim_id = '';

  /**
   * 所属就诊记录ID
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('就诊记录ID')
  @Nullable
  claim_medical_id = '';

  /**
   * 关联附件ID
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('关联附件ID')
  attachment_id = '';

  /**
   * 发票号
   */
  @Validatable(validateAlphaNumberField)
  @Normalizable
  @Label('发票号')
  number = '';

  /**
   * 起付线金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('起付线金额')
  deductible = 0;

  /**
   * 总金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('总金额')
  amount = 0;

  /**
   * 个人自付金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('个人自付金额')
  self_paid_amount = 0;

  /**
   * 个人自理金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('个人自理金额')
  self_care_amount = 0;

  /**
   * 统筹基金金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('统筹基金金额')
  fund_paid_amount = 0;

  /**
   * 大病救助金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('大病救助金额')
  serious_illness_amount = 0;

  /**
   * 大病保险金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('大病保险金额')
  serious_illness_insurance_amount = 0;

  /**
   * 不予报销费用
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('不予报销费用')
  no_reimbursement_amount = 0;

  /**
   * 无效费用金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('无效费用金额')
  invalid_amount = 0;

  /**
   * 乙类自理金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('乙类自理金额')
  class_b_self_care_amount = 0;

  /**
   * 自费金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('自费金额')
  self_amount = 0;

  /**
   * 民政补助金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('民政补助金额')
  civil_affair_subsidy_amount = 0;

  /**
   * 医保范围内费用
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('医保范围内费用')
  @Nullable
  medicare_amount = 0;

  /**
   * 赔付基数金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('赔付基数金额')
  @Nullable
  claim_base = 0;

  /**
   * 赔付金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('赔付金额')
  @Nullable
  claim_amount = 0;

  /**
   * 发票来源
   */
  @Validatable
  @Normalizable
  @Type(InvoiceSource)
  @Label('发票来源')
  source = InvoiceSource.ENTERPRISE_CLAIM_INVOICE_MANUAL;

  /**
   * 乙类自理项目列表
   */
  @Validatable(validateFloatField)
  @Normalizable
  @ElementType(SelfCareItem)
  @Label('乙类自理项目列表')
  self_care_items = null;

  /**
   * 上一位操作者姓名
   */
  @Validatable(validateFloatField)
  @Normalizable
  @Label('上一位操作者姓名')
  @Nullable
  operator_name = '';

  /**
   * 状态
   */
  @Validatable
  @Normalizable
  @Type(InvoiceStatus)
  @Label('状态')
  @Nullable
  status = '';

  /**
   * 创建时间
   */
  @Validatable(validateTimestampField)
  @Normalizable(normalizeTimestamp)
  @Label('创建时间')
  @Nullable
  create_time = '';

  /**
   * 自动计算出自费金额。
   *
   * 自费 = 总费用 - 个人自付 - 个人自理 - 统筹金额 - 大病救助 - 大病保险 - 民政补助
   */
  @Log
  calculateSelfAmount() {
    const selfAmount = this.__calculateExpectedSelfAmount();
    this.logger.debug('Invoice.calculateSelfAmount: selfAmount = {0}', selfAmount);
    this.self_amount = selfAmount;
  }

  __calculateExpectedSelfAmount() {
    this.logger.debug('Invoice.__calculateExpectedSelfAmount');
    const amount = stringToMoney(this.amount);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: amount = {0}', amount);
    const selfPaidAmount = stringToMoney(this.self_paid_amount);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: selfPaidAmount = {0}', selfPaidAmount);
    const selfCareAmount = stringToMoney(this.self_care_amount);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: selfCareAmount = {0}', selfCareAmount);
    const fundPaidAmount = stringToMoney(this.fund_paid_amount);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: fundPaidAmount = {0}', fundPaidAmount);
    const seriousIllnessAmount = stringToMoney(this.serious_illness_amount);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: seriousIllnessAmount = {0}', seriousIllnessAmount);
    const seriousIllnessInsuranceAmount = stringToMoney(this.serious_illness_insurance_amount);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: seriousIllnessInsuranceAmount = {0}', seriousIllnessInsuranceAmount);
    const civilAffairSubsidyAmount = stringToMoney(this.civil_affair_subsidy_amount);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: civilAffairSubsidyAmount = {0}', civilAffairSubsidyAmount);
    const selfAmount = amount - selfPaidAmount - selfCareAmount
                              - fundPaidAmount - seriousIllnessAmount
                              - seriousIllnessInsuranceAmount
                              - civilAffairSubsidyAmount;
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: selfAmount = {0}', selfAmount);
    // 注意要四舍五入以避免浮点计算精度误差
    const result = round(selfAmount, 2);
    this.logger.debug('Invoice.__calculateExpectedSelfAmount: result = {0}', result);
    return result;
  }

  /**
   * 自动计算出乙类自理项目金额。
   *
   * 乙类自理项目金额 = sum( 乙类自理项目.金额 * 乙类自理项目.比例 )， 其中比例为
   * 0和1的乙类自理项目不计入累加。
   */
  @Log
  calculateSecondClassSelfCareAmount() {
    const items = this.self_care_items;
    this.logger.debug('Invoice.calculateSecondClassSelfCareAmount: items = {0}', items);
    if (!Array.isArray(items)) {
      this.class_b_self_care_amount = 0;
    } else {
      let result = items.reduce((sum, e) => {
        this.logger.debug('sum = {0}, item = {1}', sum, e);
        if (e === null || floatEqual(e.ratio, 0) || floatEqual(e.ratio, 1)) {
          this.logger.debug('Ignore the item {0}', e);
          return sum; // 不累加比例为0或1的自理项目
        } else {
          const amount = stringToMoney(e.amount);
          const ratio = stringToMoney(e.ratio);
          const product = amount * ratio;
          this.logger.debug(
            'amount={0}, ratio={1}, amount * ratio={2}, item={3}',
            amount,
            ratio,
            product,
            e,
          );
          return sum + product;
        }
      }, 0);
      // 对结果要四舍五入保留两位小数
      result = round(result, 2);
      this.class_b_self_care_amount = result;
    }
    this.logger.debug('Invoice.calculateSecondClassSelfCareAmount: result = {0}',
      this.class_b_self_care_amount);
  }

  /**
   * 检查指定的{@link Invoice}对象的业务逻辑是否正确。
   *
   * @param {Invoice} invoice
   *     待检查的{@link Invoice}对象。
   * @param {MedicalRecord} record
   *     该{@link Invoice}对象所属的诊疗记录{@link MedicalRecord}对象。
   * @return {ValidationResult}
   *     返回验证结果。
   */
  @Log
  static check(invoice, record) {
    if (invoice === undefined || invoice === null) {
      return new ValidationResult(false, '请设置发票信息');
    }
    const medicalCategory = record.medical_category;
    this.logger.debug('Invoice.check: medicalCategory = {0}', medicalCategory);
    // 对于门诊，个人自付 不能小于 乙类自理
    if (medicalCategory.isClinic()) {
      this.logger.debug('Invoice.check: medicalCategory is clinic.');
      this.logger.debug('Invoice.check: self_paid_amount = {0}', invoice.self_paid_amount);
      this.logger.debug('Invoice.check: class_b_self_care_amount = {0}', invoice.class_b_self_care_amount);
      const selfPaidAmount = stringToMoney(invoice.self_paid_amount);
      const secondClassSelfCareAmount = stringToMoney(invoice.class_b_self_care_amount);
      if (selfPaidAmount < secondClassSelfCareAmount) {
        return new ValidationResult(false, '录入数据有误：门诊发票个人自付需大于乙类自理');
      }
    }
    // 对于住院，个人自理 > 无效费用，不予报销费用≥乙类自理（乙类自理为0）+个人自理
    if (medicalCategory.isInHospital()) {
      this.logger.debug('Invoice.check: medicalCategory is in-hospital.');
      const selfCareAmount = stringToMoney(invoice.self_care_amount);
      this.logger.debug('Invoice.check: self_care_amount = {0}', selfCareAmount);
      const invalidAmount = stringToMoney(invoice.invalid_amount);
      this.logger.debug('Invoice.check: invalid_amount = {0}', invalidAmount);
      if ((selfCareAmount < invalidAmount) || floatEqual(selfCareAmount, invalidAmount)) {
        return new ValidationResult(false, '录入数据有误：住院发票个人自理 > 无效费用');
      }
      const noReimbursementAmount = stringToMoney(invoice.no_reimbursement_amount);
      this.logger.debug('Invoice.check: no_reimbursement_amount = {0}', noReimbursementAmount);
      const classBSelfCareAmount = stringToMoney(invoice.class_b_self_care_amount);
      this.logger.debug('Invoice.check: class_b_self_care_amount = {0}', classBSelfCareAmount);
      if (!floatEqual(classBSelfCareAmount, 0)) {
        return new ValidationResult(false, '录入数据有误：住院发票乙类自理应该为0');
      }
      if (noReimbursementAmount < selfCareAmount
          && (!floatEqual(noReimbursementAmount, selfCareAmount))) {
        return new ValidationResult(false, '录入数据有误：住院发票不予报销费用 ≥ 乙类自理（乙类自理为0）+ 个人自理');
      }
    }
    // 自费 = 总费用 - 个人自付 - 个人自理 - 统筹金额 - 大病救助 - 大病保险 - 民政补助
    const expectedSelfAmount = invoice.__calculateExpectedSelfAmount();
    const selfAmount = stringToMoney(invoice.self_amount);
    if (!floatEqual(selfAmount, expectedSelfAmount)) {
      return new ValidationResult(false,
        '录入数据有误：自费 = 总费用 - 个人自付 - 个人自理 - 统筹金额 - 大病救助 - 大病保险 - 民政补助');
    }
    // 自费金额 不能小于零
    if (selfAmount < 0 && (!floatEqual(selfAmount, 0))) {
      return new ValidationResult(false,
        '录入数据有误：自费金额不能为负数，自费 = 总费用 - 个人自付 - 个人自理 - 统筹金额 - 大病救助 - 大病保险 - 民政补助');
    }
    // 统筹支付+大病救助+大病保险+民政补助+个人自理+个人自付≤总费用
    const fundPaidAmount = stringToMoney(invoice.fund_paid_amount);
    this.logger.debug('Invoice.check: fund_paid_amount = {0}', fundPaidAmount);
    const seriousIllnesssAmount = stringToMoney(invoice.serious_illness_amount);
    this.logger.debug('Invoice.check: serious_illness_amount = {0}', seriousIllnesssAmount);
    const seriousIllnessInsuranceAmount = stringToMoney(invoice.serious_illness_insurance_amount);
    this.logger.debug('Invoice.check: serious_illness_insurance_amount = {0}', seriousIllnessInsuranceAmount);
    const civilAffairSubsidyAmount = stringToMoney(invoice.civil_affair_subsidy_amount);
    this.logger.debug('Invoice.check: civil_affair_subsidy_amount = {0}', civilAffairSubsidyAmount);
    const selfCareAmount = stringToMoney(invoice.self_care_amount);
    this.logger.debug('Invoice.check: self_care_amount = {0}', selfCareAmount);
    const selfPaidAmount = stringToMoney(invoice.self_paid_amount);
    this.logger.debug('Invoice.check: self_paid_amount = {0}', selfPaidAmount);
    const amount = stringToMoney(invoice.amount);
    this.logger.debug('Invoice.check: amount = {0}', amount);
    const total = fundPaidAmount
                + seriousIllnesssAmount
                + seriousIllnessInsuranceAmount
                + civilAffairSubsidyAmount
                + selfCareAmount
                + selfPaidAmount;
    this.logger.debug('Invoice.check: total = {0}', total);
    if (total > amount && (!floatEqual(total, amount))) {
      return new ValidationResult(false,
        '录入数据有误：自费金额不能为负数，统筹支付 + 大病救助 + 大病保险 + 民政补助 + 个人自理 + 个人自付 ≤ 总费用');
    }
    return new ValidationResult(true);
  }
}

export default Invoice;
