const collectionReducer = (state = [], action) => {
    //console.log(action.type);
    switch (action.type) {
        case 'SET_COLLECTION':
            return action.payload;
        default:
            return state;
    }
}

export default collectionReducer;