import { uiFinishLoading, uiSetLoading, uiSetNotification } from "@/lib/redux/slices/uiSlice";
import { Dispatch } from 'redux';

import { RootState } from '../../store';
import { HTTP_METHODS } from '../../HTTP_METHODS.enum';
import { addUser, editUser } from '../../slices/authSlice';

//api url endpoints
const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || ''

const handleRequest = async (
  url: string = '',
  method: string = 'GET',
  body: any = undefined,
  headers: any = [],
) => {
  const response = await fetch(`http://127.0.0.1:8000/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};


// Async action to login
export const startUserLogin = (identifier: string, password: string, messages: { success: string, error: string }) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // dispatch(uiSetLoading(UI_LOADING_STATE.SIGN_IN));
    try {
      const data = await handleRequest('login', HTTP_METHODS.POST, { identifier: identifier, password: password });
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_IN));

      if (data && data.user) {
        dispatch(addUser(data.user));
        // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.SUCCESS, message: messages.success }));
        return data.user;
      } else {
        throw new Error('Unknown error');
      }

    } catch (error: any) {
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_IN));
      // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.ERROR, message: messages.error }));
    }
  };
};
// Async action to create a user
export const startCreatingUser = (userData: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // dispatch(uiSetLoading(UI_LOADING_STATE.SIGN_UP));
    try {
      const data = await handleRequest('create-user', HTTP_METHODS.POST, userData);
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_UP));

      if (data && data.user) {
        dispatch(addUser(data.user));
        // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.SUCCESS, message: "User created successfully" }));
        // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_UP));
        return data;
      } else {
        throw new Error('Unknown error');
      }

    } catch (error: any) {
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_UP));
      // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.ERROR, message: error.message }));
    }
  };
};


