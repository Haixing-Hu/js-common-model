////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  Validatable,
  Label,
  Model,
  Normalizable,
  Nullable,
  Type,
} from '@haixing_hu/common-decorator';
import Info from '../common/Info';
import Location from './Location';

/**
 * 此模型表示地址。
 *
 * @author 胡海星
 */
@Model
class Address {
  /**
   * 所属国家的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('国家')
  country = null;

  /**
   * 所属省份的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('省份')
  province = null;

  /**
   * 所属城市的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('城市')
  city = null;

  /**
   * 所属区县的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('区县')
  district = null;

  /**
   * 所属街道的基本信息。
   */
  @Normalizable
  @Validatable
  @Type(Info)
  @Label('街道')
  street = null;

  /**
   * 详细地址，门牌号码等。
   */
  @Normalizable
  @Label('详细地址')
  detail = '';

  /**
   * 邮政编码。
   */
  @Normalizable
  @Label('邮政编码')
  @Nullable
  postalcode = '';

  /**
   * 地理位置信息。
   */
  @Normalizable
  @Validatable
  @Type(Location)
  @Nullable
  location = null;

  /**
   * 将当前对象的地利位置坐标转换为地图的坐标位置。
   *
   * 地图的坐标位置通常用一个数组表示，数组第一个元素是精度，第二个元素是维度。
   *
   * @returns {Array}
   *     当前对象的地理位置坐标转换而来的地图的坐标位置；若当前对象没有指定地理
   *     位置坐标，返回{@code null}。
   */
  get position() {
    return (this.location ? [this.location.longitude, this.location.latitude] : null);
  }
}

export default Address;
