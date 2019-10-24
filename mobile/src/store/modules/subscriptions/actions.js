export function subscriptionsRequest() {
  return {
    type: '@subscriptions/SUBSCRIPTIONS_REQUEST',
  };
}

export function subscriptionsSuccess(meetups) {
  return {
    type: '@subscriptions/SUBSCRIPTIONS_SUCCESS',
    payload: { meetups },
  };
}

export function subscribeRequest(id) {
  return {
    type: '@subscriptions/SUBSCRIBE_REQUEST',
    payload: { id },
  };
}

export function subscribeSuccess(meetup) {
  return {
    type: '@subscription/SUBSCRIBE_SUCCESS',
    payload: { meetup },
  };
}

export function subscribeFailure() {
  return {
    type: '@subscription/SUBSCRIBE_FAILURE',
  };
}
