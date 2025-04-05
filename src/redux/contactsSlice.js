import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { selectFilterByName } from "./filtersSlice";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    buildReducers(builder, fetchContacts, (state, action) => {
      state.items = action.payload;
    });

    buildReducers(builder, addContact, (state, action) => {
      state.items.push(action.payload);
    });

    buildReducers(builder, deleteContact, (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload.id
      );
    });
  },
});

function buildReducers(builder, operation, reducerFunc) {
  builder
    .addCase(operation.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(operation.fulfilled, (state, action) => {
      state.isLoading = false;
      reducerFunc(state, action);
    })
    .addCase(operation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
}

export const selectContacts = (state) => state.contacts.items;
export const selectContactsLoading = (state) => state.isLoading;
export const selectContactsError = (state) => state.error;

export const selectContactsFiltered = createSelector(
  [selectContacts, selectFilterByName],
  (contacts, filterValue) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValue)
    );
  }
);

export default slice.reducer;
