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
  validateIntegerField, validateTimestampField,
} from '@haixing_hu/common-validator';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';
import State from '../common/State';
import Person from '../person/Person';
import StatefulInfo from '../util/StatefulInfo';

/**
 * 此模型表示硬件设备的基本信息。
 *
 * @author 胡海星
 */
@Model
class DeviceInfo {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 编码，即设备硬件唯一ID(UDID)，全局不可重复，一旦设置不能更改。
   */
  @Normalizable
  @Label('编码')
  code = '';

  /**
   * 名称
   */
  @Normalizable
  @Label('名称')
  name = '';

  /**
   * 所属 App 的基本信息。
   */
  @Normalizable
  @Type(StatefulInfo)
  @Label('所属App')
  app = '';

  /**
   * 设备所有者信息。
   */
  @Normalizable
  @Type(Person)
  @Label('所有者')
  @Nullable
  owner = null;

  /**
   * 状态。
   */
  @Normalizable
  @Validatable
  @Type(State)
  @Label('状态')
  state = State.NORMAL;

  /**
   * 设备绑定时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('绑定时间')
  @Nullable
  binding_time = '';

  /**
   * 注册(激活)时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('注册时间')
  @Nullable
  register_time = '';

  /**
   * 对象的标记删除时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('标记删除时间')
  @Nullable
  delete_time = '';
}

export default DeviceInfo;
