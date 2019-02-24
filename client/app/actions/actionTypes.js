export const ASYNC = { request: 'REQUEST', success: 'SUCCESS', failure: 'FAILURE' };

function createAsyncActionType(baseActionType) {
  return Object.values(ASYNC).reduce((accumulator, asyncEvent) => {
    accumulator[asyncEvent] = `${baseActionType}:${asyncEvent}`;
    return accumulator;
  }, {});
}

export const TEST_REQUEST = createAsyncActionType('TEST_REQUEST');
