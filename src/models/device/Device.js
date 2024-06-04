////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  ElementType,
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
import Payload from '../common/Payload';
import State from '../common/State';
import Address from '../contact/Address';
import Location from '../contact/Location';
import Person from '../person/Person';
import User from '../person/User';
import StatefulInfo from '../util/StatefulInfo';
import Hardware from './Hardware';
import Software from './Software';

/**
 * 此模型表示硬件设备。
 *
 * @author 胡海星
 */
@Model
class Device {
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
   * 详细描述。
   */
  @Normalizable
  @Label('描述')
  @Nullable
  description = '';

  /**
   * 硬件信息。
   */
  @Normalizable
  @Type(Hardware)
  @Label('硬件信息')
  hardware = null;

  /**
   * 该设备运行的操作系统的信息。
   */
  @Normalizable
  @Type(Software)
  @Label('操作系统')
  operating_system = null;

  /**
   * 该设备运行的客户端应用的信息。
   */
  @Normalizable
  @ElementType(Software)
  @Label('软件')
  @Nullable
  softwares = [];

  /**
   * 设备当前所处的位置。
   */
  @Normalizable
  @Validatable
  @Type(Location)
  @Label('位置')
  @Nullable
  location = null;

  /**
   * 设备部署地址。
   */
  @Normalizable
  @Type(Address)
  @Label('部署地址')
  @Nullable
  deploy_address = '';

  /**
   * 设备当前公网IP地址。
   */
  @Normalizable
  @Label('IP地址')
  @Nullable
  ip_address = '';

  /**
   * 设备所有者信息。
   */
  @Normalizable
  @Type(Person)
  @Label('所有者')
  @Nullable
  owner = null;

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
   * 绑定设备操作的用户的信息。
   */
  @Normalizable
  @Type(User)
  @Label('所有者')
  @Nullable
  binder = null;

  /**
   * 状态。
   */
  @Normalizable
  @Validatable
  @Type(State)
  @Label('状态')
  state = State.NORMAL;

  /**
   * 额外参数。
   */
  @Normalizable
  @ElementType(Payload)
  @Label('额外参数')
  @Nullable
  payloads = [];

  /**
   * 备注。
   */
  @Normalizable
  @Label('备注')
  @Nullable
  comment = '';

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
   * 上次启动时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('上次启动时间')
  @Nullable
  last_startup_time = '';

  /**
   * 上次心跳连接时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('上次心跳连接时间')
  @Nullable
  last_heartbeat_time = '';

  /**
   * 对象的创建时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('创建时间')
  @Nullable
  create_time = '';

  /**
   * 对象的最后一次修改时间。
   *
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('最后一次修改时间')
  @Nullable
  modify_time = '';

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

export default Device;
