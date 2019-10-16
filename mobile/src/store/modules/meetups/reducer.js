import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  meetups: [],
};

function meetups(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetups/MEETUPS_REQUEST':
        draft.loading = true;
        break;
      case '@meetups/MEETUPS_SUCCESS':
        draft.meetups = action.payload.meetups;
        draft.loading = false;
        break;
      case '@meetups/MEETUPS_FAILURE':
        draft.loading = false;
        break;
      case '@meetups/MEETUP_SUBSCRIBE_SUCCESS':
        draft.meetups.push(action.payload.meetup);
        break;
      default:
    }
  });
}

export default meetups;
