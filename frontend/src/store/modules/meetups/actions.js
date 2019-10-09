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

export function meetupUpdateRequest(data) {
  return {
    type: '@meetups/MEETUP_UPDATE_REQUEST',
    payload: { data },
  };
}

export function meetupUpdateSuccess(meetup) {
  return {
    type: '@meetups/MEETUP_UPDATE_SUCCESS',
    payload: { meetup },
  };
}

export function meetupCreateRequest(data) {
  return {
    type: '@meetups/MEETUP_CREATE_REQUEST',
    payload: { data },
  };
}

export function meetupCreateSuccess(meetup) {
  return {
    type: '@meetups/MEETUP_CREATE_SUCCESS',
    payload: { meetup },
  };
}
