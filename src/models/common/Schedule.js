////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  validateTimestampField,
} from '@haixing_hu/common-validator';
import {
  ElementType,
  Label,
  Model,
  Normalizable,
  Nullable,
  Validatable,
} from '@haixing_hu/common-decorator';
import { normalizeTimestamp } from '@haixing_hu/common-normalizer';

/**
 * 此模型表示定期执行的任务计划。
 * <p>
 * 此对象使用 Spring 框架的 crontab 表达式来指定计划执行的时间点，其语法规则参见：
 * <a href="https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/support/CronExpression.html">CronExpression</a></p>
 *
 * @author 胡海星
 * @see <a href="https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/support/CronExpression.html">CronExpression</a>
 * @see <a href="https://www.baeldung.com/cron-expressions">A Guide To Cron Expressions</a>
 */
@Model
class Schedule {
  /**
   * 计划开始时间，UTC时区，精度为秒。
   * <p>
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   * <p>
   * 为{@code null}或{@code ''}则表示不作限制。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('计划开始时间')
  @Nullable
  start_time = '';

  /**
   * 计划结束时间，UTC时区，精度为秒。
   * <p>
   * 该属性值为UTC时间戳，以ISO-8601时间戳的形式表示为字符串，其格式为
   * `"uuuu-MM-dd[[' ']['T']HH:mm[':'ss[.SSS]]][' ']['Z'][Z][z]"`。
   * <p>
   * 为{@code null}或{@code ''}则表示不作限制。
   */
  @Normalizable(normalizeTimestamp)
  @Validatable(validateTimestampField)
  @Label('计划结束时间')
  @Nullable
  end_time = '';

  /**
   * 用于计算计划执行时间点的 crontab 表达式列表。
   * <p>
   * 为{@code null}或{@code []}则表示不作限制。
   */
  @Normalizable
  @ElementType(String)
  @Label('crontab表达式')
  @Nullable
  crontabs = [];
}

export default Schedule;
