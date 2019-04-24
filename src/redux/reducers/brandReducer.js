const brandReducer = (state = [], action) => {
    //console.log(action.type);
    switch (action.type) {
        case 'SET_BRAND':
            return action.payload;
        default:
            return state;
    }
}

export default brandReducer;