////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model } from '@haixing_hu/common-decorator';

/**
 * 此模型表示简单的字符串键值对。
 *
 * @author 胡海星
 */
@Model
class KeyValuePair {
  /**
   * 主键。
   */
  key = '';

  /**
   * 取值。
   */
  value = '';
}

export default KeyValuePair;
