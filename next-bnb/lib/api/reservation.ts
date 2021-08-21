import axios from ".";

type MakeReservationAPIBody = {
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
};

export const MakeReservationAPI = (body: MakeReservationAPIBody) =>
  axios.post("/api/reservations", body);
