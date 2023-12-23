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
 * 此枚举表示性别。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class Gender {
  static MALE = '男';

  static FEMALE = '女';
}

export default Gender;
