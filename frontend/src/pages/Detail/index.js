import React from 'react';

function Detail({ match }) {
  return <h1>{match.params.id}</h1>;
}

export default Detail;
