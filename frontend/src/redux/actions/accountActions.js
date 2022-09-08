import * as types from "../constants";
import AccountApi from "../../api/AccountApi";

const listAccountAction = (accounts) => {
  return {
    type: types.GET_LIST_ACCOUNT,
    payload: accounts,
  };
};

export const getListAccountAction = () => {
  return async (dispatch) => {
    try {
      const json = await AccountApi.getAll();
      const accounts = json.content;
      console.log(accounts);
      dispatch(listAccountAction(accounts));
    } catch (error) {
      console.log(error);
    }
  };
};

export function updateSelectedRowsAction(selectedRows) {
  return {
    type: types.GET_LIST_ACCOUNT_SELECTED_ROWS,
    payload: selectedRows,
  };
}
