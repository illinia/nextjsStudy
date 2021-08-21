import { UserType } from "./user";

export type UserState = UserType & {
  isLogged: boolean;
};

export type CommonState = {
  validateMode: boolean;
};

import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import { AppType } from "next-server/dist/lib/utils";

export type NextPageCustom<P = {}, IP = P> = {
  (props: P): JSX.Element | null;
  defaultProps?: Partial<P>;
  displayName?: string;
  (ctx: nextPageProps): Promise<IP>;
};

interface nextPageProps {
  /**
   * Error object if encountered during rendering
   */
  err?:
    | (Error & {
        statusCode?: number;
      })
    | null;
  /**
   * `HTTP` request object.
   */
  req?: IncomingMessage;
  /**
   * `HTTP` response object.
   */
  res?: ServerResponse;
  /**
   * Path section of `URL`.
   */
  pathname: string;
  /**
   * Query string section of `URL` parsed as an object.
   */
  query: ParsedUrlQuery;
  /**
   * `String` of the actual path including query.
   */
  asPath?: string;
  /**
   * `Component` the tree of the App to use if needing to render separately
   */
  AppTree: AppType;

  // 커스텀 항목 추가
  store: any;
  isServer: boolean;
}

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public" | null;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
};

export type SearchRoomState = {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
};

export type RoomState = {
  rooms: RoomType[];
  detail: RoomType | null;
};
