import axios from 'axios';
import { connect } from 'react-redux';
import { Component } from 'react';

class sendFile extends Component {
    
    toServer(file) {
        const data = new FormData();
        data.append('file', file);
        axios.post('/api/aws/images', data, { headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': file.type,
        }})
        .then(response => {
            console.log('successfully uploaded to the S3: ', response);
            let action = {type: 'SEND_ID', payload: response.data.id};
            console.log(action);
            this.props.dispatch(action);  
        })
        .catch(error => {
            console.log('error uploading file: ', error);
        });
    }
}

export default connect()(sendFile);


// export const sendFileAndTextToServer = (file, text) => {
//     const data = new FormData();
//     data.append('file', file);
//     console.log({text});
    
//     for(const [key, value] of Object.entries(text)){
//         data.append(key, value);
//     }
//     axios.post('/api/aws/images', data, { headers: {
//         'accept': 'application/json',
//         'Accept-Language': 'en-US,en;q=0.8',
//         'Content-Type': file.type,
//     }})
//     .then(response => {
//         console.log('successfully uploaded to the S3: ', response);
//     })
//     .catch(error => {
//         console.log('error uploading file: ', error);
//     })
// }

  
  // this allows us to use <App /> in index.js