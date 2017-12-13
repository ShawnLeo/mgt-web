/**
 * Created by Shawn on 2017/6/23.
 */

// const PLATFORM_GATEWAY = 'platform-gateway';

import {fetch} from './fetch';

// 登陆
export const login = (data, codeEvents) => fetch('/login', {
  reqParams: data,
  codeEvents: codeEvents
}, 'POST');

// export const userList = (data, body) => fetch(PLATFORM_SYS + '/user/page', {
//   reqParams: data,
//   reqBody: body
// }, 'POST');
