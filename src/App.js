import React, { Component } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

// import all the components
import Loading from './components/Loading';
import Image from './components/Image';
import PDF from './components/PDF';
import CSV from './components/CSV';
import JSONData from './components/JSON';
import Excel from './components/Excel';
import Word from './components/Word';


import Unsupported from './components/Unsupported';
import NotFound from './components/NotFound';



class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      unsupported: null,
      notfound: null,

      file: this.props.url,
      fileType: null,
      extension: null,
    }
    this.processFile = this.processFile.bind(this);
  }


  componentDidMount() {
    this.processFile();
  }


  async processFile() {
    const unsupportedFormats = [ 'tiff' ];
    const images = [ 'jpg', 'png', 'gif', 'ico', 'svg', 'webp' ];
    // const url = this.state.file;
    const url = `https://cors-anywhere.herokuapp.com/${this.state.file}`;
    const extension = this.getExtension(url);

    // check if the file type can be rendered in browser or not
    if ( unsupportedFormats.includes(extension) ) {
      this.setState({ unsupported: true, extension: extension, loading: false });
      return;
    }

    // if image, our job is done
    if ( images.includes(extension) ) {
      this.setState({ fileType: 'image', extension: extension, loading: false });
      return;
    }

    // if ( extension === 'pdf' ) {
    //   this.setState({ fileType: 'pdf', extension: extension, loading: false });
    //   return;
    // }

    if ( extension === 'pdf' ) {
      const res = await fetch(url);
      const ab = await res.arrayBuffer();
      const data = new Uint8Array(ab);
      this.setState({ fileType: 'pdf', data: data, extension: extension, loading: false });
      return;
    }


    if ( extension === 'csv' ) {
      try {
        const data = await this.fetCSVData(url);
        this.setState({ fileType: 'csv', data: data, extension: extension, loading: false });
      } catch (error) {
        this.setState({ notfound: true, extension: extension, loading: false });
      }
      return;
    }

    if ( extension === 'json' ) {
      try {
        const data = await fetch(url);
        const dataJson = await data.json();
        this.setState({ fileType: 'json', data: dataJson, extension: extension, loading: false });
      } catch (error) {
        this.setState({ notfound: true, extension: extension, loading: false });
      }
      return;
    }

    if ( extension === 'xls' || extension === 'xlsx' ) {
      try {
        const res = await fetch(url);
        const ab = await res.arrayBuffer();
        const data = new Uint8Array(ab);
        this.setState({ fileType: 'excel', data: data, extension: extension, loading: false });
      } catch (error) {
        this.setState({ notfound: true, extension: extension, loading: false });
      }
      return;
    }

    if ( extension === 'doc' || extension === 'docx' ) {
      this.setState({ fileType: 'word', extension: extension, loading: false });
      return;
    }





    this.setState({ unsupported: true, extension: extension, loading: false });
  }



  getExtension(file) {
    if ( this.props.extension ) {
      return this.props.extension.substring(1);;
    }
    return file.split('.').pop();
  }

  async fetCSVData(url) {
    return new Promise( (resolve, reject) => {
      const data = [];
      Papa.parse(  url, {
        download: true,
        step: (results, parser) => {
          data.push(results.data);
        },
        complete: (results, file) => {
          resolve(data);
        },
        error: (error, file) => {
          reject(error);
        }
      });
    });
  }



  render() {

    if ( this.state.loading ) {
      return <Loading text="Loading..." />
    }

    if ( this.state.unsupported ) {
      return <Unsupported extension={this.state.extension} />
    }

    if ( this.state.notfound ) {
      return <NotFound file={this.state.file} />
    }


    const { fileType } = this.state;

    return (
      <Container>
        { fileType && fileType === 'image' &&
          <Image source={this.state.file} />
        }
        { fileType && fileType === 'pdf' &&
          <PDF data={this.state.data} source={this.state.file} />
        }
        { fileType && fileType === 'csv' &&
          <CSV data={this.state.data} />
        }
        { fileType && fileType === 'json' &&
          <JSONData data={this.state.data} />
        }
        { fileType && fileType === 'excel' &&
          <Excel data={this.state.data} />
        }
        { fileType && fileType === 'word' &&
          <Word source={this.state.file} />
        }
      </Container>
    )

  }

}


export default Application;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  height: 100%;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

/*
  background: #ccc;
*/

