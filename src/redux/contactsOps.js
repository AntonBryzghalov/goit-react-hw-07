import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const genericErrorMessage =
  "There was an error. Try to update page a bit later";

const mockAPI = axios.create({
  baseURL: "https://67eeb553c11d5ff4bf7aa7cb.mockapi.io",
});

export const fetchContacts = generateThunk("contacts/fetchAll", () => {
  return mockAPI.get("/contacts");
});

export const addContact = generateThunk("contacts/add", (contact) => {
  return mockAPI.post("/contacts", contact);
});

export const deleteContact = generateThunk("contacts/delete", (contactId) => {
  return mockAPI.delete(`/contacts/${contactId}`);
});

function generateThunk(name, requestFunc) {
  return createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const response = await requestFunc(arg);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });
}
