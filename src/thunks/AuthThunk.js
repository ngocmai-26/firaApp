import React, { useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  logout,
  setAccount,
  setAuthFetching,
  setErrors,
  setLogged,
  setRefresh,
  setUser,
} from "../slices/AuthSlice";
import { API, AUTH_KEY_NAME } from "../constants/api";
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast";
import {
  delaySync,
  loadTokenFromStorage,
  setToken,
} from "../services/AuthService";
import { getHeaders } from "../services/ApiService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FBStorageService } from "../services/firebase/StorageService";

export const login = createAsyncThunk(
  "Đăng Nhập",
  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setAuthFetching(true));
      await delaySync(1);
      const resp = await fetch(`${API.uri}/public/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const dataJson = await resp.json();
      dispatch(setAuthFetching(false));

      if (resp.status >= 300) {
        if (!dataJson?.valid) {
          dispatch(setErrors(dataJson?.data));
          return rejectWithValue("something error");
        }
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        });
        dispatch(setErrors({}));
        return rejectWithValue("something error");
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: "Đăng nhập thành công",
      });

      setToken(dataJson?.data?.token);

      await AsyncStorage.setItem("user", JSON.stringify(dataJson?.data?.user));
      await AsyncStorage.setItem("auth_user", JSON.stringify(loginData));

      dispatch(setAccount(dataJson?.data));
      dispatch(setUser(dataJson?.data?.user));
      dispatch(setLogged(true));
      dispatch(setRefresh({ refresh: true, uri: "home" }));
    } catch (e) {
      console.log("e", e);  
    }
  }
);
export const loginWithAuthToken = createAsyncThunk(
  "Đăng Nhập",
  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setAuthFetching(true));
      await delaySync(1);
      const resp = await fetch(`${API.uri}/public/auth/login-with-token`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const dataJson = await resp.json();
      dispatch(setAuthFetching(false));

      if (resp.status >= 300) {
        if (!dataJson?.valid) {
          dispatch(setErrors(dataJson?.data));
          return rejectWithValue("something error");
        }
      
        dispatch(setErrors({}));
        return rejectWithValue("something error");
      }
      setToken(dataJson?.data?.token);
      await AsyncStorage.setItem("user", JSON.stringify(dataJson?.data?.user));
      await AsyncStorage.setItem("auth", JSON.stringify(loginData));
      dispatch(setUser(dataJson?.data?.user));
      dispatch(setAccount(dataJson?.data));
      dispatch(setLogged(true));
      dispatch(setRefresh("home"));
    } catch (e) {
      console.log("e", e);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (regData, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/public/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: regData.username,
          password: regData.password,
          confirmPassword: regData.confirmPassword,
        }),
      });
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        if (!dataJson?.valid) {
          Toast.show({
            type: TOAST_ERROR,
            text1: dataJson?.data,
          });
          return rejectWithValue("something error");
        }

        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        });

        return rejectWithValue("something error");
      }

      Toast.show({
        type: TOAST_SUCCESS,
        text1: "Đăng ký thành công",
      });

      return dataJson;
    } catch (e) {
      console.log("e", e);
    }
  }
);

export const createNewUser = createAsyncThunk(
  "create-new-user",
  async (newUserData, { rejectWithValue, dispatch }) => {
    try {
      await delaySync(1);
      const avatarUrl = await FBStorageService.uploadFile(newUserData.avatar);

      const token = await loadTokenFromStorage();
      if (!token) {
        // dispatch(setAuthFetching(true));
        Toast.show({
          type: TOAST_ERROR,
          text1: "Phiên bản hết hạn vui lòng đăng nhập lại",
        });
        rejectWithValue();
      }
      const resp = await fetch(`${API.uri}/users`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({ ...newUserData, avatar: avatarUrl }),
      });

      // dispatch(setAuthFetching(false));
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        if (!dataJson?.valid) {
          dispatch(setErrors(jsonData?.data));
          return rejectWithValue();
        }
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        });
        return rejectWithValue();
      }

      Toast.show({
        type: TOAST_SUCCESS,
        text1: "Tạo người dùng thành công",
      });

      await AsyncStorage.setItem("user", JSON.stringify(dataJson?.data));
      dispatch(setUser(dataJson?.data));
      dispatch(setRefresh("/"));
    } catch (e) {
      // dispatch(setAuthFetching(true));
      console.log("e", e);
    }
  }
);

export const confirmAccount = createAsyncThunk(
  "verify-email",
  async (confirmData, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(`${API.uri}/public/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(confirmData),
      });
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        });
        return rejectWithValue("something error");
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: "Xác nhận thành công",
      });

      dispatch(setRefresh(true));
      return dataJson;
    } catch (e) {
      console.log("e", e);
    }
  }
);

export const requestNewCode = createAsyncThunk(
  "request-new-code",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(
        `${API.uri}/public/auth/request-new-code?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        });
        return rejectWithValue("something error");
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: "Đã gửi mã mới",
      });
    } catch (e) {
      console.log("e", e);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgot-password",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(
        `${API.uri}/public/auth/forgot-password/${email}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        });
        return rejectWithValue("something error");
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: "Đã gửi mã mới",
      });
    } catch (e) {
      console.log("e", e);
    }
  }
);

export const confirmForgotPassword = createAsyncThunk(
  "confirm-forgot-password",
  async (confirmData, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(
        `${API.uri}/public/auth/confirm-forgot-password/${confirmData?.email}/${confirmData?.code}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const dataJson = await resp.json();
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        });
        return rejectWithValue("something error");
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: "Xác nhận thành công",
      });

      return dataJson;
    } catch (e) {
      console.log("e", e);
    }
  }
);

export const changePasswordAuth = createAsyncThunk(
  '/forgot-password',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("data", data)
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/public/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      const dataJson = await resp.json()
      if (resp.status >= 300) {
     
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson.message[0],
        })
        return rejectWithValue('something error')
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Đổi mật khẩu thành công',
      })
      dispatch(logout())
    } catch (e) {
      console.log(e)
    }
  },
)
