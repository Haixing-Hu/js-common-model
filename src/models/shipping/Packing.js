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
 * 此枚举表示货物的包装方式。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class Packing {
  static NORMAL = '正常打包';

  static REINFORCEMENT = '普通加固';

  static WOODEN_FRAME = '打木架';
}

export default Packing;
