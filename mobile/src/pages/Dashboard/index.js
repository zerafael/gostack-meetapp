import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import NavBar from '~/components/NavBar';
import MeetupBox from '~/components/MeetupBox';

import api from '~/services/api';

import { Container, MeetupsList, DateView, DateText } from './styles';
import { subscribeRequest } from '~/store/modules/subscriptions/actions';

function Dashboard() {
  const dispatch = useDispatch();
  const meetupsSubscribed = useSelector(state => state.subscriptions.meetups);

  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups() {
    const response = await api.get('meetups', { params: { date, page } });

    // Verify meetups that was not subscribed by the user
    const meetupsWithouSub = response.data.filter(meetup => {
      for (let i = 0; i < meetupsSubscribed.length; i += 1) {
        if (meetupsSubscribed[i].meetup.id === meetup.id) {
          return false;
        }
      }
      return true;
    });

    setMeetups(page > 1 ? [...meetups, ...meetupsWithouSub] : meetupsWithouSub);

    if (response.data.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }

  function loadMoreMeetups() {
    setPage(page + 1);
    loadMeetups();
  }

  useEffect(() => {
    loadMeetups();
  }, [date, meetupsSubscribed]); // eslint-disable-line

  function handleNextDay() {
    setPage(1);
    setDate(addDays(date, 1));
  }

  function handlePrevDay() {
    setPage(1);
    setDate(subDays(date, 1));
  }

  function handleSubscription(id) {
    dispatch(subscribeRequest(id));
  }

  return (
    <Background>
      <Container>
        <NavBar />
        <MeetupsList
          data={meetups}
          ListHeaderComponent={() => (
            <DateView>
              <TouchableOpacity onPress={handlePrevDay}>
                <Icon name="keyboard-arrow-left" size={36} color="#fff" />
              </TouchableOpacity>
              <DateText>{dateFormatted}</DateText>
              <TouchableOpacity onPress={handleNextDay}>
                <Icon name="keyboard-arrow-right" size={36} color="#fff" />
              </TouchableOpacity>
            </DateView>
          )}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetupBox
              onPressButton={() => handleSubscription(item.id)}
              meetup={item}
              style={{ marginBottom: 20 }}
            />
          )}
          onEndReached={loadMoreMeetups}
          onEndReachedThreshold={0.1}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="person" size={25} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  title: 'Teste',
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

export default Dashboard;
