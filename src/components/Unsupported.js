import React from 'react';
import styled from 'styled-components';


const Unsupported = (props) => {
  return (
    <Container>
      <Heading>Unsupported File Format</Heading>
      <Text>This file with extension <u>{props.extension}</u> cannot be displayed in browsers*</Text>
    </Container>
  )
}

export default Unsupported;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffdbd0;
  height: 100%;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`;


const Heading = styled.p`
  font-size: 30px;
  line-height: 100%;
  font-weight: bold;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 100%;
  margin-top: 10px;
`;

