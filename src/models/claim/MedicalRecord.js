////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dayjs from 'dayjs';
import {
  validateIntegerField,
  validateDateField,
  validateTimestampField,
} from '@haixing_hu/common-validator';
import {
  Model,
  Type,
  ElementType,
  Validatable,
  Normalizable,
  Label,
  Nullable,
} from '@haixing_hu/common-decorator';
import DictEntry from '../common/DictEntry';
import MedicalCategory from './MedicalCategory';
import Invoice from '../invoice/Invoice';
import normalizeDate from '../../normalizers/normalize-date';
import normalizeInteger from '../../normalizers/normalize-integer';
import normalizeTimestamp from '../../normalizers/normalize-timestamp';

/**
 * 此模型表示理赔申请单关联的诊疗记录。
 *
 * FIXME: `treatment_start_date`和`treatment_end_date`应该合并为一个`DateRange`对象，
 * 从而更好地实现 normalize() 和 validate() 方法。
 *
 * @author 胡海星
 */
@Model
class MedicalRecord {
  /**
   * 唯一标识，系统自动生成。
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('ID')
  @Nullable
  id = '';

  /**
   * 所属理赔申请单ID。
   */
  @Validatable(validateIntegerField)
  @Normalizable
  @Label('理赔申请单ID')
  @Nullable
  claim_id = '';

  /**
   * 就诊开始日期。
   */
  @Validatable(validateDateField)
  @Normalizable(normalizeDate)
  @Label('就诊开始日期')
  @Nullable
  treatment_start_date = '';

  /**
   * 就诊结束日期。
   */
  @Validatable(validateDateField)
  @Normalizable(normalizeDate)
  @Label('就诊结束日期')
  @Nullable
  treatment_end_date = '';

  /**
   * 医疗类别。
   */
  @Validatable
  @Normalizable
  @Label('医疗类别')
  @Type(MedicalCategory)
  medical_category = new MedicalCategory();

  /**
   * 就诊医院。
   */
  @Validatable
  @Normalizable
  @Label('就诊医院')
  @Type(DictEntry)
  hospital = new DictEntry();

  /**
   * 主要疾病。
   */
  @Validatable
  @Normalizable
  @Label('主要疾病')
  @Type(DictEntry)
  disease = new DictEntry();

  /**
   * 主要疾病。
   */
  @Validatable(validateIntegerField)
  @Normalizable(normalizeInteger)
  @Label('医院级别')
  hospital_level = 0;

  /**
   * 上一个操作者姓名。
   */
  @Validatable
  @Normalizable
  @Label('操作者姓名')
  @Nullable
  operator_name = '';

  /**
   * 状态。
   *
   * FIXME：此字段应该是个枚举类型。
   */
  @Validatable
  @Normalizable
  @Label('状态')
  @Nullable
  status = '';

  /**
   * 包含的发票数据。
   */
  @Validatable
  @Normalizable
  @ElementType(Invoice)
  @Label('发票')
  invoices = [];

  /**
   * 创建时间
   */
  @Validatable(validateTimestampField)
  @Normalizable(normalizeTimestamp)
  @Label('创建时间')
  @Nullable
  create_time = '';

  /**
   * 该记录是否正在被编辑（临时状态，不应提交到服务器）
   */
  editing = false;

  /**
   * 根据日期时间范围设置此对象的 treatment_start_date, treatment_end_date 属性。
   *
   * @param {Array} dateRange
   *     表示日期时间范围的数组，该数组长度为2，元素为 Date 对象。
   * @return {MedicalRecord}
   *     此对象本身。
   */
  setTreatmentDateRange(dateRange) {
    if (dateRange === undefined || dateRange === null) {
      this.treatment_start_date = '';
      this.treatment_end_date = '';
      return this;
    }
    if ((!Array.isArray(dateRange)) || (dateRange.length !== 2)) {
      throw new TypeError('The dateRange argument must be a Date array of length 2');
    }
    this.treatment_start_date = normalizeDate(dateRange[0]);
    this.treatment_end_date = normalizeDate(dateRange[1]);
    return this;
  }

  /**
   * 根据此对象的 treatment_start_date, treatment_end_date 属性，返回一个日期时
   * 间范围数组。
   *
   * @return
   *     表示日期时间范围的数组，该数组长度为2，元素为 Date 对象；如果此对象的
   *     treatment_start_date 和 treatment_end_date 都没有设置或都为空，则返回
   *     null；如果其中一个非空，则返回一个 Date 数组，对应的空元素为 null。
   */
  getTreatmentDateRange() {
    if (this.treatment_start_date && this.treatment_end_date) {
      const start = dayjs(this.treatment_start_date).toDate();
      const end = dayjs(this.treatment_end_date).toDate();
      return [start, end];
    } else if (this.treatment_start_date) {
      const start = dayjs(this.treatment_start_date).toDate();
      return [start, null];
    } else if (this.treatment_end_date) {
      const end = dayjs(this.treatment_end_date).toDate();
      return [null, end];
    } else {
      return null;
    }
  }
}

export default MedicalRecord;
