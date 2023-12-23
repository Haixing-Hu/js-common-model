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
 * 此枚举表示交易参与者类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class ParticipantType {
  static PERSON = '个人';

  static ORGANIZATION = '组织机构';
}

export default ParticipantType;
