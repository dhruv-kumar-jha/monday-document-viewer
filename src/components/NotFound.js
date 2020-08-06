import React from 'react';
import styled from 'styled-components';


const NotFound = (props) => {
  return (
    <Container>
      <Heading>File Not Found</Heading>
      <Text>This file <u>{props.file}</u> you're looking for doesn't exist or you might not have permissions to access it.</Text>
    </Container>
  )
}

export default NotFound;


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
  max-width: 80%;
`;

