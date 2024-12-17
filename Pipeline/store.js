import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

// Создание слайса
const messageSlice = createSlice({
  name: 'message',
  initialState: { message: 'Hello, Redux' },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

const { actions, reducer } = messageSlice;

// Конфигурация хранилища
const makeStore = () =>
  configureStore({
    reducer: {
      message: reducer,
    },
  });

export const { setMessage } = actions;

export const wrapper = createWrapper(makeStore);
