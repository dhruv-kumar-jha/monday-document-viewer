import React, { Component } from 'react';
import App from './App';
import styled from 'styled-components';
import mondaySdk from "monday-sdk-js";

import Loading from './components/Loading';
import BoardsContainer from './components/BoardsContainer';


const monday = mondaySdk();



class Monday extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      settings: null,
      boards: null,
    }

  }

  componentDidMount() {
    monday.listen("settings", res => {
      this.setState({ settings: res.data });
      if ( ! res.data.document || ! res.data.title ) {
        this.setState({ loading: false });
      } else {
        monday.listen("context", res => {
          this.setState({ context: res.data });
          monday.api(
            `
query ($boardIds: [Int]) {
  boards( ids: $boardIds ) {
    name
    id
    items {
      name
      id
      created_at
      column_values {
        id
        text
        title
      }
    }
  }
}            `,
            {
              variables: { boardIds: res.data.boardIds }
            }
          ).then(res => {
            this.setState({ boards: res.data.boards, loading: false });
          });
        });
      }
    });


  }








  render() {

    console.log("this.state", this.state);

    if ( this.state.loading || this.state.settings === null ) {
      return <Loading text="Loading, Please wait..." />
    }

    if ( ! this.state.settings.document || ! this.state.settings.title ) {
      return (
        <Container>
          <Inner>
            <Text>Before you can start seeing the document preview, Please select the appropriate columns first by clicking on the <u>settings</u> panel.</Text>
            <Text style={{ marginTop: 20 }}>Please select the column fields first.</Text>
          </Inner>
        </Container>
      )
    }

    return (
      <BoardsContainer boards={this.state.boards} />
    )

  }

}



export default Monday;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  height: 100%;
  overflow: auto;
  background: #e5f4ff;
`;

const Inner = styled.div`
  width: 500px;
  max-width: 70%;
  padding: 100px;
  margin: 0 auto;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 100%;
  margin-top: 10px;
`;






/*
    monday.listen("context", res => {
      this.setState({ context: res.data });
      monday.api(`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1) { name column_values { title text } } } }`,
        { variables: { boardIds: this.state.context.boardIds } }
      ).then(res => {
        this.setState({ boardData: res.data, loadingBoard: false });

        // let's get the file url and title
        const urlFieldName = Object.keys(this.state.settings.document)[0] || null;
        const titleFieldName = Object.keys(this.state.settings.title)[0] || null;

        const board = res.data.boards[0];
        if ( board ) {
          console.log("board",board);
          const items = board.items[0].column_values;
          console.log("items",items);
          // const file = board.items.find( item => {
          //   console.log("item",item);
          // });
        }

        this.setState({ urlFieldName: urlFieldName, titleFieldName: titleFieldName });
      });
    });


*/

