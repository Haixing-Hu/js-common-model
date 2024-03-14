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
 * 此枚举表示移动数据网络类型。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class DataNetworkType {
  static GPRS = 'GPRS 联通2G';

  static CDMA = 'CDMA 电信2G';

  static EDGE = 'EDGE 移动2G';

  static ONE_X_RTT = 'CDMA2000 1xRTT 2G';

  static IDEN = 'IDEN 2G';

  static GSM = 'GSM 2G';

  static TD_SCDMA = 'TD-SCDMA 移动3G';

  static CDMA2000 = 'CDMA2000 电信3G';

  static EVDO_A = 'EVDO-A 电信3.5G';

  static UMTS = 'WCDMA 联通3G';

  static EVDO_0 = 'EVDO-0 3G';

  static HSDPA = 'HSDPA 3.5G';

  static HSUPA = 'HSUPA 3.5G';

  static HSPA = 'HSPA 3G';

  static EVDO_B = 'EVDO-B 3G';

  static EHRPD = 'EHRPD 3G';

  static HSPAP = 'HSPAP 3G';

  static IWLAN = 'IWLAN 3G';

  static LTE = 'LTE 4G';

  static NR = 'NR 5G';

  static UNKNOWN = 'UNKNOWN';
}

export default DataNetworkType;
