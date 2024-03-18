////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Enum } from '@haixing_hu/common-decorator';

/**
 * 此枚举表示对反馈的操作。
 * <p>
 * 详细的状态转换规则，如下面的 PlantUML 图所示：
 * <code><pre>
 * @startuml
 * [*] --&gt; SUBMITTED
 * SUBMITTED --&gt; WITHDRAWN : USER_WITHDRAW
 * SUBMITTED --&gt; UNDER_REVIEW : ADMIN_REVIEW
 * REOPENED --&gt; UNDER_REVIEW : ADMIN_REVIEW
 * UNDER_REVIEW --&gt; PROCESSING : ADMIN_ACCEPT
 * UNDER_REVIEW --&gt; REJECTED : ADMIN_REJECT
 * PROCESSING --&gt; RESOLVED : ADMIN_RESOLVE
 * RESOLVED --&gt; CLOSED : USER_APPROVE
 * REJECTED --&gt; CLOSED : USER_APPROVE
 * RESOLVED --&gt; DISAPPROVED : USER_DISAPPROVE
 * REJECTED --&gt; DISAPPROVED : USER_DISAPPROVE
 * DISAPPROVED --&gt; REOPENED : ADMIN_REOPEN
 * CLOSED --&gt; [*]
 * WITHDRAWN --&gt; [*]
 * @enduml
 * </pre></code>
 * <p>
 * 渲染后的UML图如下所示：
 * <p>
 * <img src="https://www.plantuml.com/plantuml/png/ZT71Zi8W40RWEq_1UPE-m1usPM6Yc1O8Gzk3CSP4R-f1w_kBO4UYXtfh__dofzEfh-FkCjvEHxR-sV2g-kFO_RSw152Cdb8-wB1KNWo6__8EmM-duCrrHiMXXrx34AbGhJRFL-R1EZ1Vm7AMiFDM0g8s2w92Id3XatfOWGoW2EQ05HMPeMtwakM0qU2XP6CHrBIoSB4aajmuGueMfJ7dBqTHsJPBYsdIz4DfYHIm_4s9nBiokXqbzU6yZrU_0m00"/>
 *
 * @author 胡海星
 * @enum
 */
@Enum
class FeedbackAction {
  /**
   * 用户操作：撤回反馈
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#SUBMITTED} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#WITHDRAWN} 状态。
   */
  static USER_WITHDRAW = '用户撤回';

  /**
   * 用户操作：认可反馈处理结果
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#RESOLVED} 或 {@link FeedbackStatus#REJECTED} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#CLOSED} 状态。
   */
  static USER_APPROVE = '用户认可';

  /**
   * 用户操作：不认可反馈处理结果
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#RESOLVED} 或 {@link FeedbackStatus#REJECTED} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#DISAPPROVED} 状态。
   */
  static USER_DISAPPROVE = '用户不认可';

  /**
   * 管理员操作：审核反馈
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#SUBMITTED} 或 {@link FeedbackStatus#REOPENED} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#UNDER_REVIEW} 状态。
   */
  static ADMIN_REVIEW = '管理员审核';

  /**
   * 管理员操作：接受反馈
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#UNDER_REVIEW} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#PROCESSING} 状态。
   */
  static ADMIN_ACCEPT = '管理员接受';

  /**
   * 管理员操作：拒绝反馈
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#UNDER_REVIEW} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#REJECTED} 状态。
   */
  static ADMIN_REJECT = '管理员拒绝';

  /**
   * 管理员操作：解决反馈
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#PROCESSING} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#RESOLVED} 状态。
   */
  static ADMIN_RESOLVE = '管理员解决';

  /**
   * 管理员操作：重新开启反馈处理流程
   * <p>
   * 此操作前，反馈应处于 {@link FeedbackStatus#DISAPPROVED} 状态。
   * 此操作后，反馈应处于 {@link FeedbackStatus#REOPENED} 状态。
   */
  static ADMIN_REOPEN = '管理员重新开启';
}

export default FeedbackAction;
