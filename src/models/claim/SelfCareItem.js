////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  validateFloatField,
  ValidationResult,
} from '@haixing_hu/common-validator';
import {
  Model,
  Validatable,
  Normalizable,
  Label,
} from '@haixing_hu/common-decorator';
import { stringToMoney } from '@haixing_hu/common-util';

/**
 * 表示乙类自理项目。
 *
 * @author 胡海星
 */
@Model
class SelfCareItem {
  /**
   * 自理项目名称
   */
  @Validatable
  @Normalizable
  @Label('自理项目名称')
  name = '';

  /**
   * 自理项目金额
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('自理项目金额')
  amount = 0;

  /**
   * 自理项目比例
   */
  @Validatable(validateFloatField)
  @Normalizable(stringToMoney)
  @Label('自理项目比例')
  ratio = 0;

  /**
   * 检查指定的{@link SelfCareItem}对象的业务逻辑的合法性。
   *
   * @param {SelfCareItem} item
   *     待检查的{@link SelfCareItem}对象。
   * @return {ValidationResult}
   *     返回验证结果。
   */
  static check(item) {
    if (item === undefined || item === null) {
      return new ValidationResult(false, '请设置自理项目信息');
    }
    const amount = stringToMoney(item.amount);
    if (amount < 0) {
      return new ValidationResult(false, '自理项目金额不能为负数');
    }
    const ratio = stringToMoney(item.ratio);
    if (ratio < 0 || ratio > 1) {
      return new ValidationResult(false, '自理项目比例必须介于0(包括)和1(包括)之间');
    }
    return new ValidationResult(true);
  }
}

export default SelfCareItem;
