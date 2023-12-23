////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { validateIntegerField } from '@haixing_hu/common-validator';
import {
  Label,
  Model,
  Normalizable,
  Validatable,
} from '@haixing_hu/common-decorator';

/**
 * 此模型表示对象所关联的所有者的信息。
 *
 * @author 胡海星
 */
@Model
class Owner {
  /**
   * 实体对象的类型的名字。
   */
  @Normalizable
  @Label('类型')
  type = '';

  /**
   * 实体对象的唯一标识。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 实体对象的属性的名称。
   */
  @Normalizable
  @Label('属性')
  property = '';
}

export default Owner;
