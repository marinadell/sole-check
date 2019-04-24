const colorReducer = (state = [], action) => {
    //console.log(action.type);
    switch (action.type) {
        case 'SET_COLOR':
            return action.payload;
        default:
            return state;
    }
}

export default colorReducer;