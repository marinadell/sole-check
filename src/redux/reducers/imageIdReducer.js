const imageIdReducer = (state = [], action) => {
    //console.log(action.type);
    switch (action.type) {
        case 'SEND_ID':
            return action.payload;
        default:
            return state;
    }
}

export default imageIdReducer;
