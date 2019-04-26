import React, {Component} from 'react';
var Dropzone = require('react-dropzone');
var axios = require('axios');

class AddSneakerImg extends Component{
  onDrop (files) {
    let file = files[0];

    axios.get('/api/aws/images', {
      filename: file.name,
      filetype: file.type
    })
    .then(function (result) {
      var signedUrl = result.data.signedUrl;
      
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };

    return axios.put(signedUrl, file, options);
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  render() {
    return (
      <Dropzone onDrop={ this.onDrop } size={ 150 }>
        <div>
          Drop some files here!
        </div>
      </Dropzone>
    );
  }
};

export default AddSneakerImg
