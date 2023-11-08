import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

const initialState = {
  selectedOfferId: -1,
  isSortsOpen: false
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers:{
    toggleSorts: (state) => {
      state.isSortsOpen = !state.isSortsOpen;
    },
    setSelectedOfferId: (state, action: PayloadAction<number>) =>{
      state.selectedOfferId = action.payload;
    }
  }
});

export const {toggleSorts, setSelectedOfferId} = appProcess.actions;
