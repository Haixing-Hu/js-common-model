////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Model } from '@haixing_hu/common-decorator';

/**
 * 表示分页列表操作返回的页面。
 *
 * @author 胡海星
 */
@Model
class Page {
  /**
   * 符合查询条件的记录总数目。
   */
  total_count = 0;

  /**
   * 符合查询条件的分页总数目。
   */
  total_pages = 0;

  /**
   * 当前分页的索引号，从0开始编号。
   */
  page_index = 0;

  /**
   * 当前分页的大小，即每页记录数。
   */
  page_size = 0;

  /**
   * 当前分页的记录集合。
   */
  content = [];
}

export default Page;
