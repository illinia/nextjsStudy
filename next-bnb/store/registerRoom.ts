import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingtype: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingtype: null,
  roomType: null,
  isSetUpForGuest: null,
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingtype = null;
      }
      state.buildingtype = action.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
