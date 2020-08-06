import React from 'react';
import styled from 'styled-components';
import Table from './Table';


const CSVComponent = (props) => {

  if ( ! props.data ) {
    return (
      <Container>
        <Text>Either this CSV file is formatted badly or we're unable to parse it correctly.</Text>
      </Container>
    )
  }

  return (
    <Container>
      { props.data && props.data.length > 0 && <Table data={props.data} /> }
      { props.data && props.data.length <= 0 && <Text>This CSV file doesn't contain any data.</Text> }
    </Container>
  )

}

export default CSVComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: top;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 100%;
  margin-top: 10px;
  max-width: 80%;
`;


