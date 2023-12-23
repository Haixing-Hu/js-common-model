////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, ElementType } from '@haixing_hu/common-decorator';
import KeyValuePair from '../common/KeyValuePair';

/**
 * 此模型表示错误信息。
 *
 * @author 胡海星
 */
@Model
class ErrorInfo {
  /**
   * 错误类型。
   */
  type = '';

  /**
   * 错误代码。
   */
  code = '';

  /**
   * 错误消息。
   */
  message = '';

  /**
   * 错误参数。
   */
  @ElementType(KeyValuePair)
  params = [];
}

export default ErrorInfo;
