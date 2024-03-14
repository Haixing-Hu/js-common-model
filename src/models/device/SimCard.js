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
  Normalizable,
  Nullable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import {
  trimUppercaseString,
} from '@haixing_hu/common-util';
import {
  validateIntegerField,
  validateMobileField,
} from '@haixing_hu/common-validator';
import DataNetworkType from './DataNetworkType';
import SimCardStatus from './SimCardStatus';
import Location from '../contact/Location';

/**
 * 此模型表示SIM卡信息。
 */
@Model
class SimCard {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * SIM卡的ICCID。
   */
  @Normalizable
  @Label('ICCID')
  @Nullable
  iccid = '';

  /**
   * SIM 卡槽的 IMEI 码。
   */
  @Normalizable
  @Label('IMEI')
  @Nullable
  imei = '';

  /**
   * SIM 卡槽的 MEID 。
   */
  @Normalizable
  @Label('MEID')
  @Nullable
  meid = '';

  /**
   * SIM卡的手机号码。
   */
  @Normalizable(trimUppercaseString)
  @Validatable(validateMobileField)
  @Label('手机号码')
  @Nullable
  phone = '';

  /**
   * 运营商名称。
   */
  @Normalizable
  @Label('运营商')
  @Nullable
  operator = '';

  /**
   * 运营商所属国家的编码。
   */
  @Normalizable
  @Label('国家')
  @Nullable
  country = '';

  /**
   * SIM卡当前所在地理位置。
   */
  @Normalizable
  @Validatable
  @Type(Location)
  @Label('位置')
  @Nullable
  location = null;

  /**
   * 制造商。
   */
  @Normalizable
  @Type(DataNetworkType)
  @Label('网络类型')
  @Nullable
  network_type = '';

  /**
   * 描述。
   */
  @Normalizable
  @Type(SimCardStatus)
  @Label('状态')
  @Nullable
  status = '';
}

export default SimCard;
