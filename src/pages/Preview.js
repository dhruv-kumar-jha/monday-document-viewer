import React from 'react';
import styled from 'styled-components';
import App from '../App';



const Preview = (props) => {

  const { data, exitPreview, assets } = props;
  const asset = assets.find( item => item.id == data.assetId );

  return (
    <Container>

      <Board>
        <BoardTitle>{ data.title }</BoardTitle>
        <ExitPreview onClick={ exitPreview }>Exit Preview</ExitPreview>
      </Board>

      <DocumentPreview>
        <App url={ asset.public_url } extension={ asset.file_extension } />
      </DocumentPreview>

    </Container>
  )

}

export default Preview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  height: 100%;
  overflow: auto;
  background: #fff;
`;

const Board = styled.div`
  margin: 50px 100px;
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`;

const BoardTitle = styled.p`
  font-size: 20px;
  line-height; 100%;
  font-weight: bold;
  color: #000;
`;

const ExitPreview = styled.div`
  font-size: 14px;
  background: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #ff0000;
  }
`;



const DocumentPreview = styled.div`
  margin-top: 40px;
  background: #fff;
  margin: 50px 100px;
`;



