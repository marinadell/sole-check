import axios from 'axios';

export const sendFileToServer = file => {
    const data = new FormData();
    data.append('file', file);
    axios.post('/api/aws/images', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
    }})
    .then(response => {
        console.log('successfully uploaded to the S3: ', response);
        window.location.reload();
    })
    .catch(error => {
        console.log('error uploading file: ', error);
    })
}

export const sendFileAndTextToServer = (file, text) => {
    const data = new FormData();
    data.append('file', file);
    console.log({text});
    
    for(const [key, value] of Object.entries(text)){
        data.append(key, value);
    }
    axios.post('/api/aws/images', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
    }})
    .then(response => {
        console.log('successfully uploaded to the S3: ', response);
        window.location.reload();
    })
    .catch(error => {
        console.log('error uploading file: ', error);
    })
}