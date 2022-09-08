import * as types from "../constants";

const initialState = {
  accounts: [],
  isLoading: false,
  selectedRows: [],
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_ACCOUNT:
      return {
        ...state,
        accounts: actions.payload,
        isLoading: false,
      };
    case types.GET_LIST_ACCOUNT_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: actions.payload,
      };
    default:
      return state;
  }
}
