import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import NavBar from '~/components/NavBar';

import { Container, MeetupsList } from './styles';
import MeetupBox from '~/components/MeetupBox';
import { subscriptionsRequest } from '~/store/modules/subscriptions/actions';

function Subscription() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.subscriptions.meetups);

  useEffect(() => {
    dispatch(subscriptionsRequest());
  }, []); // eslint-disable-line

  function handleCancelSubscription(id) {
    console.tron.log(id);
  }

  return (
    <Background>
      <Container>
        <NavBar />
        <MeetupsList
          data={meetups}
          keyExtractor={item => String(item.id)}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <MeetupBox
              subscription
              meetup={item.meetup}
              onPressButton={() => handleCancelSubscription(item.id)}
              style={{ marginBottom: 20 }}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={25} color={tintColor} />
  ),
};

export default Subscription;
