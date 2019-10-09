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
      case '@meetups/MEETUP_UPDATE_SUCCESS': {
        const { id } = action.payload;
        const index = draft.meetups.findIndex(m => m.id === id);

        draft.meetups.splice(index, 1);
        draft.meetups.push(action.payload.meetup);
        break;
      }
      case '@meetups/MEETUP_CREATE_SUCCESS':
        draft.meetups.push(action.payload.meetup);
        break;
      default:
    }
  });
}

export default meetups;
