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
 * 此枚举表示退货原因。
 *
 * @author 胡海星
 * @enum
 */
@Enum
class ReturnReason {
  static NO_REASON = '无理由退货';

  static BUYER_INCAPABLE = '购买人不满足购买此商品的条件';

  static OUT_OF_STOCK = '商品缺货';

  static STOP_SELLING = '商品停售';

  static DISLIKE = '不喜欢此商品';

  static DONT_WANT = '不再想要此商品';

  static MISOPERATION = '误操作购买了此商品';

  static LACK_OF_PART = '缺件少件';

  static BROKEN_PRODUCT = '收货时发现破损/污渍/变形';

  static WRONG_PRODUCT = '卖家发错货';

  static EXPIRED_PRODUCT = '商品已过期';

  static QUALITY_PROBLEMS = '商品存在质量问题';

  static MISMATCH_DESCRIPTION = '商品描述与实物不符合';

  static TOO_EXPENSIVE = '买贵了';

  static IMITATION = '买到了赝品';

  static OTHER = '其他原因';
}

export default ReturnReason;
