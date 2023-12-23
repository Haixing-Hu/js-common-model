////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model } from '@haixing_hu/common-decorator';

/**
 * 默认分页大小。
 *
 * @author 胡海星
 */
const DEFAULT_PAGE_SIZE = 10;

/**
 * 表示分页请求选项。
 *
 * @author 胡海星
 */
@Model
class PageRequest {
  /**
   * 所请求的分页的索引号，从0开始编号。
   */
  page_index = 0;

  /**
   * 所请求的分页的大小，即每页记录数。
   */
  page_size = DEFAULT_PAGE_SIZE;

  /**
   * 构造一个{@link PageRequest}对象。
   *
   * @param {Number} pageIndex
   *     所请求的分页索引。
   * @param {Number} pageSize
   *     所请求的分页每页大小。
   */
  constructor(pageIndex = 0, pageSize = DEFAULT_PAGE_SIZE) {
    this.page_index = pageIndex;
    this.page_size = pageSize;
  }
}

export default PageRequest;
