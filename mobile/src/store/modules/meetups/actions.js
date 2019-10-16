export function meetupsRequest() {
  return {
    type: '@meetups/MEETUPS_REQUEST',
  };
}

export function meetupsSuccess(meetups) {
  return {
    type: '@meetups/MEETUPS_SUCCESS',
    payload: { meetups },
  };
}

export function meetupsFailure() {
  return {
    type: '@meetups/MEETUPS_FAILURE',
  };
}

export function meetupCancelRequest(id) {
  return {
    type: '@meetups/MEETUPS_CANCEL_REQUEST',
    payload: { id },
  };
}

export function meetupSubscribeRequest(data) {
  return {
    type: '@meetups/MEETUP_SUBSCRIBE_REQUEST',
    payload: { data },
  };
}

export function meetupSubscribeSuccess(meetup) {
  return {
    type: '@meetups/MEETUP_SUBSCRIBE_SUCCESS',
    payload: { meetup },
  };
}
