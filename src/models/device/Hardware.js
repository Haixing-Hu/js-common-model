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
  Validatable,
} from '@haixing_hu/common-decorator';
import {
  validateIntegerField,
} from '@haixing_hu/common-validator';
import SimCard from './SimCard';

/**
 * 此模型表示设备的硬件信息。
 */
@Model
class Hardware {
  /**
   * 唯一标识，系统自动生成。
   */
  @Normalizable
  @Validatable(validateIntegerField)
  @Label('ID')
  id = '';

  /**
   * 设备的硬件名称，通常是制造商分配的一个特定的硬件名称。
   */
  @Normalizable
  @Label('名称')
  @Nullable
  name = '';

  /**
   * 设备型号名称。
   */
  @Normalizable
  @Label('型号')
  @Nullable
  model = '';

  /**
   * 设备品牌名称。
   */
  @Normalizable
  @Label('品牌')
  @Nullable
  brand = '';

  /**
   * 设备硬件制造商名称。
   */
  @Normalizable
  @Label('制造商')
  @Nullable
  manufacturer = '';

  /**
   * 设备硬件产品的整体名称。
   */
  @Normalizable
  @Label('产品')
  @Nullable
  product = '';

  /**
   * 设备固件版本的人类可读描述。
   */
  @Normalizable
  @Label('固件')
  @Nullable
  firmware = '';

  /**
   * 设备主板名称。
   */
  @Normalizable
  @Label('主板')
  @Nullable
  board = '';

  /**
   * 描述设备硬件的通用名称，如处理器型号。
   */
  @Normalizable
  @Label('硬件')
  @Nullable
  hardware = '';

  /**
   * 描述。
   */
  @Normalizable
  @ElementType(String)
  @Label('二进制接口')
  @Nullable
  supported_abis = [];

  /**
   * 所有非虚拟以太网卡的MAC地址列表，按照字典序从小到大排序。
   */
  @Normalizable
  @ElementType(String)
  @Label('以太网卡MAC地址')
  @Nullable
  ethernet_mac_addresses = [];

  /**
   * 所有非虚拟Wi-Fi网卡的MAC地址列表，按照字典序从小到大排序。
   */
  @Normalizable
  @ElementType(String)
  @Label('Wi-Fi卡MAC地址')
  @Nullable
  wifi_mac_addresses = [];

  /**
   * 设备所有SIM卡的信息列表。
   */
  @Normalizable
  @ElementType(SimCard)
  @Label('SIM卡')
  @Nullable
  sim_cards = [];

  /**
   * 设备硬件序列号。
   */
  @Normalizable
  @Label('序列号')
  @Nullable
  serial = '';

  /**
   * 硬件设备唯一ID。
   */
  @Normalizable
  @Label('UDID')
  udid = '';
}

export default Hardware;
