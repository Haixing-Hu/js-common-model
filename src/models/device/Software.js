////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  Label,
  Model,
  Normalizable, Nullable,
  Validatable,
} from '@haixing_hu/common-decorator';
import {
  validateIntegerField,
} from '@haixing_hu/common-validator';

/**
 * 此模型表示软件信息。
 */
@Model
class Software {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 代码，全局不可重复，一旦设置不能更改。
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 名称。
   */
  @Normalizable
  @Label('名称')
  name = '';

  /**
   * 平台。
   */
  @Normalizable
  @Label('平台')
  platform = '';

  /**
   * 版本。
   */
  @Normalizable
  @Label('版本')
  version = '';

  /**
   * 构建号。
   */
  @Normalizable
  @Label('构建号')
  @Nullable
  build = '';

  /**
   * 补丁。
   */
  @Normalizable
  @Label('补丁')
  @Nullable
  patch = '';

  /**
   * 内部代号。
   */
  @Normalizable
  @Label('内部代号')
  @Nullable
  code_name = '';

  /**
   * 制造商。
   */
  @Normalizable
  @Label('制造商')
  @Nullable
  manufacturer = '';

  /**
   * 描述。
   */
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';
}

export default Software;
