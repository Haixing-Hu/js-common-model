////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model, Type } from '@haixing_hu/common-decorator';
import Location from '../contact/Location';
import Platform from './Platform';

/**
 * 此模型表示客户端环境
 *
 * @author 胡海星
 */
@Model
class Environment {
  /**
   * 客户端IP地址。
   */
  ip = '';

  /**
   * 客户端地理位置。
   */
  @Type(Location)
  location = null;

  /**
   * 客户端操作系统。
   */
  @Type(Platform)
  platform = null;

  /**
   * 客户端 UDID。
   */
  udid = '';

  /**
   * 客户端推送消息token。
   */
  push_token = '';
}

export default Environment;
