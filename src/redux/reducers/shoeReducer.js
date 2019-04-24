const shoeReducer = (state = [], action) => {
    //console.log(action.type);
    switch (action.type) {
        case 'SET_SHOE':
            return action.payload;
        default:
            return state;
    }
}

export default shoeReducer;