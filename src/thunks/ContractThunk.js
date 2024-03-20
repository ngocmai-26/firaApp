import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadTokenFromStorage } from "../services/AuthService";
import { API } from "../constants/api";
import { getHeaders } from "../services/ApiService";
import { TOAST_SUCCESS } from "../constants/toast";
import { searchContactAsync } from "./SearchThunk";
import { setAddContactRequest, setAllContact, setContactRequest } from "../slices/ContactSlice";
import Toast from "react-native-toast-message";


export const sendAddContactRequest = createAsyncThunk(
  "/contact/add",
  async (data, { dispatch, rejectWithValue, getState }) => {
    try {
      
      const token = await loadTokenFromStorage()
      const { searchContent } = getState().searchReducer;

      const resp = await fetch(`${API.uri}/contacts`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      const jsonData = await resp.json();
      if (resp.status > 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData?.message[0],
        })
        rejectWithValue();
      }
      if (resp.status == 200) {
        Toast.show({
          type: TOAST_SUCCESS,
          text1: "Gửi yêu cầu thành công",
        })
        dispatch(searchContactAsync(searchContent));
        dispatch(getAllAddContactRequestByUser(data.from));
      }

      return;
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: "Có lỗi xảy ra khi gửi yêu cầu",
      })
      console.log("error", e);
    }
  }
);
export const getAllContactByUser = createAsyncThunk(
  "/contacts/get-by-user",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/contacts/${userId}`, {
        method: "GET",
        headers: getHeaders(token),
      });
      const jsonData = await resp.json();
      if (resp.status > 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData?.message[0],
        })
        return rejectWithValue();
      }
      if (resp.status == 200) {
        dispatch(setAllContact(jsonData?.data?.content));
      }
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: "Có lỗi xảy ra khi gửi yêu cầu",
      })
    }
  }
);
export const getAllAddContactRequestByUser = createAsyncThunk(
  "/contacts/get-all-add-request-by-user",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/contacts/requests/${userId}`, {
        method: "GET",
        headers: getHeaders(token),
      });
      const jsonData = await resp.json();
      if (resp.status > 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData,
        })
        return rejectWithValue();
      }
      
      if (resp.status == 200) {
        dispatch(setAddContactRequest(jsonData?.data?.content));
      }
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: "Có lỗi xảy ra khi gửi yêu cầu",
      })
    }
  }
);
export const getAllAddContactRequestByUserRelate = createAsyncThunk(
  "/contacts/get-all-add-request-by-user",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(
        `${API.uri}/contacts/requests/related/${userId}`,
        {
          method: "GET",
          headers: getHeaders(token),
        }
      );
      const jsonData = await resp.json();
      if (resp.status > 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData,
        })
        return rejectWithValue();
      }
      if (resp.status == 200) {
        dispatch(setContactRequest(jsonData?.data?.content));
      }
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: "Có lỗi xảy ra khi gửi yêu cầu",
      })
    }
  }
);
export const responseContact = createAsyncThunk(
  "/contacts/resp-contact-request",
  async (data, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer;
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/contacts/response`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      if (resp.status > 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData,
        })
        return rejectWithValue();
      }
      if (resp.status == 200) {
        dispatch(getAllContactByUser(user?.id));
        dispatch(getAllAddContactRequestByUserRelate(user?.id));
      }
    } catch (e) {
        Toast.show({
          type: TOAST_ERROR,
          text1: "Có lỗi xảy ra khi gửi yêu cầu",
        })
    }
  }
);
export const destroyContactRequest = createAsyncThunk(
  "/contacts/destroy-contact-request",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer;
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/contacts/request/delete/${id}`, {
        method: "DELETE",
        headers: getHeaders(token),
      });

      if (resp.status == 200) {
        dispatch(getAllContactByUser(user?.id));
        dispatch(getAllAddContactRequestByUserRelate(user?.id));
        dispatch(getAllAddContactRequestByUser(user?.id));
        Toast.show({
          type: TOAST_SUCCESS,
          text1: "Đã hủy lời mời",
        })
      }
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: "Có lỗi xảy ra khi gửi yêu cầu",
      })
    }
  }
);
