import produce from 'immer';

const INITIAL_STATE = {
  meetups: [],
};

export default function subscriptions(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscriptions/SUBSCRIPTIONS_SUCCESS':
        draft.meetups = action.payload.meetups;
        break;
      case '@subscription/SUBSCRIBE_SUCCESS': {
        const { meetup } = action.payload;
        draft.meetups.push(meetup);
        break;
      }
      default:
    }
  });
}
