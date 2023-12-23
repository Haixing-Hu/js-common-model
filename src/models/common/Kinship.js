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
 * 此枚举表示参保者与投保人之间的关系。
 *
 * @author 胡海星
 */
@Enum
class Kinship {
  static SELF = '本人';

  static PARENT = '父母';

  static CHILD = '子女';

  static SPOUSE = '配偶';

  static OTHER = '其他';

  /**
   * 返回所有直系亲属的关系。
   *
   * @return
   *     所有直系亲属的关系。
   * @author 胡海星
   */
  static directs() {
    return [
      Kinship.SELF,
      Kinship.PARENT,
      Kinship.CHILD,
      Kinship.SPOUSE,
    ];
  }
}

export default Kinship;
