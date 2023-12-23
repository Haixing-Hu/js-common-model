////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Label, Model } from '@haixing_hu/common-decorator';

/**
 * 此模型表示地理位置坐标。
 *
 * 经纬度坐标的表示方式通常有三种：
 * - `ddd.ddddd°` 用小数表示度，保留小数点后面5位
 * - `ddd°mm.mmm'` 用整数表示度，小数表示分，保留小数点后面3位
 * - `ddd°mm'ss"` 用整数表示度、分、秒
 *
 * 其中
 * - 1分 = 60秒
 * - 1度 = 60分
 *
 * @author 胡海星
 */
@Model
class Location {
  /**
   * 经度，采用小数形式表示，保留小数点后面5位
   */
  @Label('经度')
  longitude = 0;

  /**
   * 纬度，采用小数形式表示，保留小数点后面5位
   */
  @Label('纬度')
  latitude = 0;

  /**
   * 创建一个Location对象。
   *
   * @param {Number} longitude
   *     指定的经度。
   * @param {Number} latitude
   *     指定的维度。
   */
  constructor(longitude = 0, latitude = 0) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  /**
   * 将当前对象转换为地图的坐标位置。
   *
   * 地图的坐标位置通常用一个数组表示，数组第一个元素是精度，第二个元素是维度。
   *
   * @returns {Array}
   *     对象转换而来的地图的坐标位置。
   */
  get position() {
    return [this.longitude, this.latitude];
  }
}

/**
 * 经纬度坐标用小数形式表示时保留的小数点后位数。
 */
Location.PRECISION = 6;

export default Location;
