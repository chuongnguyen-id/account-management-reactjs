import { createSelector } from "@reduxjs/toolkit";

// Selector
const accountSelector = (state) => state.account;

const selectListAccountSelector = createSelector(
  accountSelector,
  (state) => state.accounts
);

const selectSelectedRowsSelector = createSelector(
  accountSelector,
  (state) => state.selectedRows
);

// const selectPageSelector = createSelector(
//   accountSelector,
//   (state) => state.page
// );

// const selectSizeSelector = createSelector(
//   accountSelector,
//   (state) => state.size
// );

// const selectTotalElementSelector = createSelector(
//   accountSelector,
//   (state) => state.totalElement
// );

const selectLoadingSelector = createSelector(
  accountSelector,
  (state) => state.isLoading
);

// function
export const selectListAccounts = (state) => {
  return selectListAccountSelector(state);
};

export const selectSelectedRows = (state) => {
  return selectSelectedRowsSelector(state);
};

// export const selectPage = (state) => {
//   return selectPageSelector(state);
// };

// export const selectSize = (state) => {
//   return selectSizeSelector(state);
// };

// export const selectTotalElement = (state) => {
//   return selectTotalElementSelector(state);
// };

export const selectLoading = (state) => {
  return selectLoadingSelector(state);
};
