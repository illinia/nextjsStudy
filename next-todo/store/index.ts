import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todo from "./todo";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state,
        ...action.payload,
      };
      if (state.count) nextState.count;
      return nextState;
    default: {
      return rootReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true,
  });
};

export const wrapper = createWrapper(initStore, { debug: true });
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
