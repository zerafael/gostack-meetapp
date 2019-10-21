import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import NavBar from '~/components/NavBar';
import MeetupBox from '~/components/MeetupBox';

import api from '~/services/api';

import { Container, MeetupsList, DateView, DateText } from './styles';

function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups() {
    const response = await api.get('meetups', { params: { date, page } });

    setMeetups(page > 1 ? [...meetups, ...response.data] : response.data);

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
  }, [date]); // eslint-disable-line

  function handleNextDay() {
    setPage(1);
    setDate(addDays(date, 1));
  }

  function handlePrevDay() {
    setPage(1);
    setDate(subDays(date, 1));
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
            <MeetupBox meetup={item} style={{ marginBottom: 20 }} />
          )}
          onEndReached={loadMoreMeetups}
          // onEndReachedThreshold={0.1}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'Teste',
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={25} color={tintColor} />
  ),
};

export default Dashboard;
