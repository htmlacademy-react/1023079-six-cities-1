import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationsStatus, NameSpace } from '../../consts';
import { checkAuthAction, loginAction } from '../api-actions';
import { dropToken } from '../../token';

type UserProcessInitialStateType = {
  authorizationStatus: string;
  error: string | null;
}

const initialState: UserProcessInitialStateType = {
  authorizationStatus: AuthorizationsStatus.Unknown,
  error: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.authorizationStatus = AuthorizationsStatus.NoAuth;
      dropToken();
      localStorage.removeItem('user');
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationsStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationsStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationsStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationsStatus.NoAuth;
      });
  },
});

export const {logoutAction, setError} = userProcess.actions;
