import React, { Component } from 'react';
import styled from 'styled-components';


const BoardsContainer = (props) => {
  console.log("BoardsContainer::props",props);
  const { boards } = props;

  return (
    <Container>

      { boards && boards.length > 0 && boards.map( board => {
        return (
          <Board key={board.id}>
            <BoardTitle>{ board.name }</BoardTitle>

            <div style={{ marginTop: 20 }}>
              { board.items && board.items.length > 0 && board.items.map( item => {
                return (
                  <BoardItem key={ item.id }>
                    { item.name }
                  </BoardItem>
                )
              }) }
            </div>

          </Board>
        )
      }) }

    </Container>
  )

}

export default BoardsContainer;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  height: 100%;
  overflow: auto;
  background: #fff;
`;

const Board = styled.div`
  margin-bottom: 40px;
  margin: 50px 100px;
`;

const BoardTitle = styled.p`
  font-size: 20px;
  line-height; 100%;
  font-weight: bold;
  color: #000;
`;

const BoardItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    border-color: #0085ff;
  }
`;

const Button = styled.button`
  background: #000;
  font-size: 14px;
  padding: 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 4px;

  &:hover {
    background: #ff0000;
  }

`;




