const UPDATE_TITLE = 'UPDATE_TITLE';

export const updateTitle = (newTitle) => ({
  type: UPDATE_TITLE,
  title: newTitle,
});

const initialState = {
  title: 'Initial Title',
};

export default function titleReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
}
