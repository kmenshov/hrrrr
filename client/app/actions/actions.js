/* eslint-disable import/prefer-default-export */

import { TEST_REQUEST } from './actionTypes';

export function testRequest(param) {
  return {
    type: TEST_REQUEST,
    param: `{"code":200,"message":"OK: ${param}"}`,
  };
}
