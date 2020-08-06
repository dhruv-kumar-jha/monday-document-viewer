import React from 'react';
import styled from 'styled-components';


const Loading = (props) => {
  return (
    <LoadingContainer>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <LoadingText>{ props.text || 'Loading, Please wait...' }</LoadingText>
    </LoadingContainer>
  )
}

export default Loading;


const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
`;

