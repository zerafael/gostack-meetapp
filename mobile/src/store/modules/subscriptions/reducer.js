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
      case '@subscription/UNSUBSCRIBE_SUCCESS': {
        const { id } = action.payload;
        const { meetups } = draft;

        for (let i = 0; i < draft.meetups.length; i += 1) {
          if (meetups[i].id === id) {
            meetups.splice(i, 1);
          }
        }
        draft.meetups = meetups;
        break;
      }

      default:
    }
  });
}
