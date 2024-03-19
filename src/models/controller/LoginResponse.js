////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  ElementType, Model,
  Normalizable,
  Type,
  Validatable,
} from '@haixing_hu/common-decorator';
import User from '../person/User';
import Token from '../common/Token';

@Model
class LoginResponse {
  /**
   * 用户信息。
   *
   * @type {User}
   */
  @Normalizable
  @Validatable
  @Type(User)
  user = null;

  /**
   * 用户的访问令牌。
   *
   * @type {Token}
   */
  @Normalizable
  @Validatable
  @Type(Token)
  token = null;

  /**
   * 用户的权限列表。
   *
   * @type {String[]}
   */
  @Normalizable
  @Validatable
  @ElementType(String)
  privileges = [];

  /**
   * 用户的角色列表。
   * @type {String[]}
   */
  @Normalizable
  @Validatable
  @ElementType(String)
  roles = [];
}

export default LoginResponse;
