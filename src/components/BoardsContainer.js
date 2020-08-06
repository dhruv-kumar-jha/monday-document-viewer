import React, { Component } from 'react';
import styled from 'styled-components';


const findFiles = (data) => {
  const files = data.filter( item => {
    return item.type === 'file'
  });
  const response = [];
  files.map( file => {
    const res = JSON.parse(file.value);
    if ( res && res.files && res.files.length > 0 ) {
      res.files.map( resFile => {
        response.push({
          assetId: resFile.assetId,
          name: resFile.name
        });
      });
    }
  });

  return response;
}


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
                const files = findFiles(item.column_values)
                return (
                  <BoardItem key={ item.id }>
                    <div>{ item.name }</div>

                    { files && files[0] && files[0].file != '' &&
                    <FilesContainer>
                      { files.map( (file, index) => {
                        return (
                          <File onClick={ () => { props.onClick({ ...file, title: item.name }) } } key={index}>{ file.name }</File>
                        )
                      }) }
                    </FilesContainer>
                    }

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
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 16px;

  &:hover {
    border-color: #0085ff;
  }
`;




const FilesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const File = styled.div`
  background: #333;
  color: #fff;
  font-size: 12px;
  line-height: 100%;
  border-radius: 10px;
  margin-right: 5px;
  font-weight: normal;
  padding: 5px 10px;
  cursor: pointer;


  &:hover {
    background: #ff0000;
  }
`;


