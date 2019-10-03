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
