////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model } from '@haixing_hu/common-decorator';
import DictEntry from '../common/DictEntry';

/**
 * 表示医疗类别字典项。
 *
 * @author 胡海星
 */
@Model
class MedicalCategory extends DictEntry {
  /**
   * 判定此医疗类别是否属于门诊。
   *
   * 注意：目前的临时解决方法是，判断医疗类别的名称(name)中是否包含“住院”二字，
   * 如果包含则是住院类别，否则是门诊类别。
   *
   * @return
   *     此医疗类别是否属于门诊。
   */
  isClinic() {
    return (!this.name) || (!this.name.includes('住院'));
  }

  /**
   * 判定此就诊记录是否属于住院。
   *
   * 注意：目前的临时解决方法是，判断医疗类别的名称(name)中是否包含“住院”二字，
   * 如果包含则是住院类别，否则是门诊类别。
   *
   * @return
   *     此医疗类别是否属于住院。
   */
  isInHospital() {
    return this.name && this.name.includes('住院');
  }

  /**
   * 判定此医疗类别是否适用于指定的出险人类别。
   *
   * @param {String} insuredType
   *     出险人类别枚举值。
   * @return
   *     若此医疗类别是否适用于指定的出险人类别则返回true；否则返回false。
   */
  applicable(insuredType) {
    switch (insuredType) {
      case 'IN_SERVICE':        //  在职
      case 'RETIRED':           //  退休
      case 'RESIGNED':          //  退职
      case 'OVER_SEVENTY':      //  70岁以上
        return this.name && this.name.endsWith('(Z)');
      case 'CHILD_DONOR_GENUS': //  子女供属
      case 'DONOR_GENUS':       //  供属
        return this.name && this.name.endsWith('(G)');
      case 'ONLY_CHILD':        //  独生子女<=16
        return this.name && this.name.endsWith('(D)');
      default:
        return false;
    }
  }
}

export default MedicalCategory;
