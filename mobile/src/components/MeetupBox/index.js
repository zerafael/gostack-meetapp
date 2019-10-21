import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Image,
  Info,
  Title,
  TextInfo,
  Text,
  MeetupButton,
} from './styles';

function MeetupBox({ style, meetup }) {
  const dateFormatted = useMemo(() =>
    format(parseISO(meetup.date), "dd 'de' MMMM, 'às' H'h'", { locale: pt })
  );
  return (
    <Container style={style}>
      <Image
        source={{ uri: 'https://camunda.com/img/events/meetup-example.jpg' }}
      />
      <Info>
        <Title>{meetup.title}</Title>
        <TextInfo>
          <Icon name="event" size={16} color="#999" />
          <Text>{dateFormatted}</Text>
        </TextInfo>
        <TextInfo>
          <Icon name="room" size={16} color="#999" />
          <Text>{meetup.location}</Text>
        </TextInfo>
        <TextInfo>
          <Icon name="person" size={16} color="#999" />
          <Text>{`Organizador: ${meetup.organizer.name}`}</Text>
        </TextInfo>

        <MeetupButton>Realizar inscrição</MeetupButton>
      </Info>
    </Container>
  );
}

export default MeetupBox;
