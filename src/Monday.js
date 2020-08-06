import React, { Component } from 'react';
import styled from 'styled-components';
import mondaySdk from "monday-sdk-js";

import Loading from './components/Loading';
import BoardsContainer from './components/BoardsContainer';
import Preview from './pages/Preview';


const monday = mondaySdk();



const getAssetsIds = (boards) => {
  const assets = [];
  boards.map( board => {
    board.items.map( item => {
      item.column_values.filter( data => {
        if ( data.type == "file" ) {
          const parsed = JSON.parse(data.value);
          if ( parsed && parsed.files && parsed.files.length > 0 ) {
            parsed.files && parsed.files.map( asset => {
              assets.push(asset.assetId);
            });
          }
        }
      });
    })
  });
  return assets;
}



class Monday extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      boards: null,
      assets: null,
      selected: null,
    }
    this.previewFile = this.previewFile.bind(this);
    this.exitPreview = this.exitPreview.bind(this);
  }


  componentDidMount() {
    monday.listen("context", res => {
      this.setState({ context: res.data });
      console.log("res.data.boardIds", res.data.boardIds);
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
                  type
                  value
                  text
                  title
                }
              }
            }
          }
        `,
        {
          variables: { boardIds: res.data.boardIds }
        }
      ).then(res => {
        this.setState({ boards: res.data.boards });
        const assetIds = getAssetsIds(res.data.boards);
        monday.api(
          `
            query ( $assetIds: [Int]! ) {
              assets( ids: $assetIds ) {
                id
                name
                url
                public_url
                url_thumbnail
                file_extension
              }
            }
          `,
          {
            variables: { assetIds: assetIds }
          }
        ).then( res => {
          this.setState({ assets: res.data.assets, loading: false });
        });
      });
    });
  }



  previewFile(data) {
    this.setState({ selected: data });
  }

  exitPreview() {
    this.setState({ selected: null });
  }




  render() {

    console.log("this.state", this.state);

    if ( this.state.loading ) {
      return <Loading text="Loading, Please wait..." />
    }

    // if ( ! this.state.settings.document ) {
    //   return (
    //     <Container>
    //       <Inner>
    //         <Text>Before you can start seeing the document preview, Please select the appropriate columns first by clicking on the <u>settings</u> panel.</Text>
    //         <Text style={{ marginTop: 20 }}>Please select the column fields first.</Text>
    //       </Inner>
    //     </Container>
    //   )
    // }

    if ( this.state.selected ) {
      return <Preview data={ this.state.selected } exitPreview={ this.exitPreview } assets={ this.state.assets } />
    }

    return (
      <BoardsContainer boards={this.state.boards} onClick={ this.previewFile } />
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

  componentDidMount() {
    monday.listen("settings", res => {
      this.setState({ settings: res.data });
      if ( ! res.data.document ) {
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
                      type
                      value
                      text
                      title
                    }
                  }
                }
              }
            `,
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


*/

