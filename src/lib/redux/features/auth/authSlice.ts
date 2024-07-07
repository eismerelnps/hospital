import { uiFinishLoading, uiSetLoading, uiSetNotification } from "@/lib/redux/slices/uiSlice";
import { Dispatch } from 'redux';
// import { RootState } from "../store";
// import { HTTP_METHODS } from "@/lib/interfaces/General/HTTP_METHODS.enum";
// import { addUser, editUser, resetUser } from "../slices/authSlice";
// import { CreateUserFormInterface } from "@/lib/interfaces/Users/CreateUserFormInterface";
// import { UI_LOADING_STATE } from "@/lib/interfaces/UI/UI_Loading_State-enum";
// import { NOTIFICATION_TYPE } from "@/lib/interfaces/UI/Notification/NotificationType.enum";
// import { IUser } from "@/lib/interfaces/Users/IUser";
import { useTranslations } from "next-intl";
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
  const response = await fetch(`${apiUrl}/${apiVersion}/auth/${url}`, {
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
// Async action to sign in as guest
export const startSignInAsGuest = (userData: { name: string, password: string }) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // dispatch(uiSetLoading(UI_LOADING_STATE.SIGN_GUEST));
    try {
      const data = await handleRequest('sign-in-as-guest', HTTP_METHODS.POST, { name: userData.name, password: userData.password });
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_GUEST));

      if (data && data.user) {
        dispatch(addUser(data.user));
        // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.SUCCESS, message: "Log in successfully" }));
        // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_GUEST));
        return data;
      } else {
        throw new Error('Unknown error');
      }

    } catch (error: any) {
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_GUEST));
      // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.ERROR, message: "Error updating" }));
    }
  };
};
// Async action to sign in as guest
export const startLoginOutAsGuest = (_id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    //dispatch(uiSetLoading(UI_LOADING_STATE.SIGN_GUEST));
    try {
      const data = await handleRequest('log-out-as-guest', HTTP_METHODS.DELETE, { _id: _id });
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_GUEST));

      if (data) {
        return data;
      } else {
        throw new Error('Unknown error');
      }

    } catch (error: any) {
      // dispatch(uiFinishLoading(UI_LOADING_STATE.SIGN_GUEST));
      // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.ERROR, message: "Error" }));
    }
  };
};

//UPDATE A USER INFO BY ID
export const startUpdatingUser = (userData: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // dispatch(uiSetLoading(UI_LOADING_STATE.UPDATE_USER_INFO));
    try {
      const data = await handleRequest(`${userData._id}`, HTTP_METHODS.PUT, userData);
      // dispatch(uiFinishLoading(UI_LOADING_STATE.UPDATE_USER_INFO));

      if (data && data.user) {
        dispatch(editUser(data.user));
        // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.SUCCESS, message: "Actualizado" }));
        // dispatch(uiFinishLoading(UI_LOADING_STATE.UPDATE_USER_INFO));
        return data;
      } else {
        throw new Error('Unknown error');
      }

    } catch (error: any) {
      // dispatch(uiFinishLoading(UI_LOADING_STATE.UPDATE_USER_INFO));
      // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.ERROR, message: "Error updating" }));
    }
  };
};
// Async action to login
export const startRecoveringPassword = (identifier: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // dispatch(uiSetLoading(UI_LOADING_STATE.FORGET_PASSWORD));
    try {
      const data = await handleRequest('forgot-password', HTTP_METHODS.POST, { identifier: identifier });
      // dispatch(uiFinishLoading(UI_LOADING_STATE.FORGET_PASSWORD));

      if (data && data.user) {
        dispatch(addUser(data.user));
        // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.SUCCESS, message: "Log in successfully" }));
        // dispatch(uiFinishLoading(UI_LOADING_STATE.FORGET_PASSWORD));
        return data.user;
      } else {
        throw new Error('Unknown error');
      }

    } catch (error: any) {
      // dispatch(uiFinishLoading(UI_LOADING_STATE.FORGET_PASSWORD));
      // dispatch(uiSetNotification({ type: NOTIFICATION_TYPE.ERROR, message: error.message }));
    }
  };
};

