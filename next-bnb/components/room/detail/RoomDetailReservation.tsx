import React, { useState, useRef, useMemo } from "react";
import styled from "styled-components";
import DatePicker from "../../common/DatePicker";
import palette from "../../../style/palette";
import Button from "../../common/Button";
import { useSelector } from "../../../store";
import OutsideClickHandler from "react-outside-click-handler";
import Counter from "../../common/Counter";
import AuthModal from "../../auth/AuthModal";
import useModal from "../../../hooks/useModal";
import { differenceInDays } from "date-fns";
import { MakeReservationAPI } from "../../../lib/api/reservation";
import { useRouter } from "next/router";

const Container = styled.div`
  position: sticky;
  top: 128px;
  padding: 24px 24px 16px;
  width: 362px;
  height: fit-content;
  background-color: white;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;

  .room-detail-reservation-info {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .room-detail-reservation-inputs {
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid ${palette.gray_71};
    border-radius: 8px;

    .room-detail-reservation-date-inputs {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      border-bottom: 1px solid ${palette.gray_71};

      .room-detail-reservation-check-in {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 8px 0 0 0;
        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 8px 0 0 0;
          cursor: pointer;
          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
      .room-detail-reservation-check-out {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        right: 0;
        border-radius: 8px 0 0 0;
        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 0 8px 0 0;
          cursor: pointer;
          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
    }
    .room-detail-reservation-guests-count-wrapper {
      position: relative;
      .room-detail-reservation-guests-count {
        width: 100%;
        height: 56px;
        border-radius: 0 0 8px 8px;
        padding: 10px 12px;
        cursor: pointer;
        span {
          display: block;
          font-size: 10px;
          font-weight: 600;
          margin-bottom: 7px;
        }
        p {
          font-size: 14px;
          color: ${palette.gray_71};
        }
      }
      .room-detail-reservation-guests-popup {
        position: absolute;
        width: 100%;
        top: 60px;
        left: 0;
        padding: 16px;
        background-color: white;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
        cursor: default;

        .room-detail-reservation-guests-info {
          font-size: 14px;
          margin-top: 24px;
          color: ${palette.gray_71};
        }
      }
      .mb-24 {
        margin-bottom: 24px;
      }
    }
  }
  .room-detail-reservation-price-date {
    margin-top: 24px;
    margin-bottom: 16px;
    span {
      float: right;
    }
  }
  .room-detail-reservation-total-price {
    padding-top: 24px;
    border-top: 1px solid ${palette.gray_dd};
    font-size: 16px;
    font-weight: 800;
    span {
      float: right;
    }
  }
`;

const RoomDetailReservation: React.FC = () => {
  const room = useSelector((state) => state.room.detail);
  if (!room) {
    return null;
  }
  const price = useSelector((state) => state.room.detail?.price);
  const userId = useSelector((state) => state.user.id);

  const checkInRef = useRef<HTMLLabelElement>(null);
  const checkOutRef = useRef<HTMLLabelElement>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [guestCountPopupOpened, setGuestCountPopupOpened] = useState(false);

  const { openModal, ModalPortal, closeModal } = useModal();
  const router = useRouter();

  const onClickReservationButton = async () => {
    if (!userId) {
      openModal();
    } else if (checkInRef.current && !startDate) {
      checkInRef.current.focus();
    } else if (checkOutRef.current && !endDate) {
      checkOutRef.current.focus();
    } else {
      try {
        const body = {
          roomId: room.id,
          userId,
          checkInDate: startDate!.toISOString(),
          checkOutDate: endDate!.toISOString(),
          adultCount,
          childrenCount,
          infantsCount,
        };
        await MakeReservationAPI(body);
        alert("?????? ????????? ?????????????????????.");
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onClickReservation = async () => {
    if (!userId) {
      openModal();
    }
  };

  const getGuestCountText = useMemo(
    () =>
      `????????? ${adultCount + childrenCount}???${
        infantsCount ? `, ?????? ${infantsCount}???` : ""
      }`,
    [adultCount, childrenCount, infantsCount]
  );

  return (
    <Container>
      <p className="room-detail-reservation-info">
        ????????? ??????????????? ????????? ???????????????.
      </p>
      <div className="room-detail-reservation-inputs">
        <div className="room-detail-reservation-date-inputs">
          <div className="room-detail-reservation-check-in">
            <label ref={checkInRef}>
              ?????????
              <DatePicker
                placeholderText="????????????"
                popperPlacement="top-end"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date as Date);
                  console.log(date);
                }}
                openToDate={new Date()}
                selectsStart
                startDate={startDate as Date}
                endDate={new Date(endDate as Date)}
                disabledKeyboardNavigation
                minDate={new Date(room.startDate)}
                maxDate={new Date(room.endDate)}
              />
            </label>
          </div>
          <div className="room-detail-reservation-check-in">
            <label ref={checkOutRef}>
              ????????????
              <DatePicker
                placeholderText="????????????"
                popperPlacement="top-end"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date as Date);
                  console.log(endDate?.getDay());
                }}
                selectsEnd
                openToDate={new Date()}
                startDate={startDate as Date}
                endDate={new Date(endDate as Date)}
                disabledKeyboardNavigation
                minDate={new Date(startDate as Date)}
                maxDate={new Date(room.endDate)}
              />
            </label>
          </div>
        </div>
        <div className="room-detail-reservation-guests-count-wrapper">
          <OutsideClickHandler
            onOutsideClick={() => {
              setGuestCountPopupOpened(false);
            }}
          >
            <div
              role="presentation"
              onClick={() => setGuestCountPopupOpened(!guestCountPopupOpened)}
              className="room-detail-reservation-guests-count"
            >
              <span>??????</span>
              <p>{getGuestCountText}</p>
            </div>
            {guestCountPopupOpened && (
              <div className="room-detail-reservation-guests-popup">
                <div className="mb-24">
                  <Counter
                    label="??????"
                    description="??? 13??? ??????"
                    minValue={1}
                    value={adultCount}
                    onChange={(count) => setAdultCount(count)}
                  />
                </div>
                <div className="mb-24">
                  <Counter
                    label="?????????"
                    description="2~12???"
                    value={childrenCount}
                    onChange={(count) => setChildrenCount(count)}
                  />
                </div>
                <Counter
                  label="??????"
                  description="2??? ??????"
                  value={infantsCount}
                  onChange={(count) => setInfantsCount(count)}
                />
                <p className="room-detail-reservation-guests-info">
                  ?????? {room.maximumGuestCount}???. ????????? ?????? ????????? ????????????
                  ????????????.
                </p>
              </div>
            )}
          </OutsideClickHandler>
        </div>
      </div>
      <Button color="amaranth" width="100%" onClick={onClickReservationButton}>
        {startDate && endDate ? "????????????" : "?????? ?????? ?????? ??????"}
      </Button>
      {startDate && endDate && (
        <>
          <p className="room-detail-reservation-price-date">
            {price} X {differenceInDays(endDate, startDate)}???
            <span>{Number(price) * differenceInDays(endDate, startDate)}</span>
          </p>
          <p className="room-detail-reservation-total-price">
            ??? ??????
            <span>{Number(price) * differenceInDays(endDate, startDate)}</span>
          </p>
        </>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default RoomDetailReservation;
