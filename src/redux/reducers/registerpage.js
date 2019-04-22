const registerPage = (state = [], action) => {
    switch (action.type) {
      case 'NEW_USER':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default registerPage;