import React, { useMemo } from "react";
import styled from "styled-components";
import palette from "../../../style/palette";
import { useSelector } from "../../../store";
import { isEmpty } from "lodash";
import RegisterRoomCheckStep from "./RegisterRoomCheckStep";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomSubmitFooter from "./RegisterRoomSubmitFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector((state) => state.registerRoom);

  const isBuildingTypeActived = useMemo(() => {
    const { largeBuildingType, buildingType, roomType, isSetUpForGuest } =
      registerRoom;
    if (
      !largeBuildingType ||
      !buildingType ||
      !roomType ||
      isSetUpForGuest === null
    ) {
      return false;
    }
    return true;
  }, []);

  const isRoomTypeActived = useMemo(() => {
    const {
      maximumGuestCount,
      bedroomCount,
      bedCount,
      bedList,
      publicBedList,
    } = registerRoom;
    if (
      !isBuildingTypeActived ||
      !maximumGuestCount ||
      !bedroomCount ||
      !bedCount
    ) {
      return false;
    }
    return true;
  }, []);

  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || !bathroomCount || bathroomType === null) {
      return false;
    }
    return true;
  }, []);

  const isLocationActived = useMemo(() => {
    const {
      latitude,
      longitude,
      country,
      city,
      district,
      streetAddress,
      detailAddress,
      postcode,
    } = registerRoom;
    if (
      !isBathroomActived ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  const isAmentitiesActived = useMemo(() => {
    const { amentities } = registerRoom;

    if (!isLocationActived) {
      return false;
    }
    return true;
  }, []);

  const isConviniencesActived = useMemo(() => {
    if (!isAmentitiesActived) {
      return false;
    }
    return true;
  }, []);

  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConviniencesActived || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotoActived || !description) {
      return false;
    }
    return true;
  }, []);

  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActived || !title) {
      return false;
    }
    return true;
  }, []);

  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActived || !price) {
      return false;
    }
    return true;
  }, []);

  const isDateActived = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActived || !startDate || !endDate) {
      return false;
    }
    return true;
  }, []);

  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) {
      return "building";
    }
    if (!isRoomTypeActived) {
      return "bedrooms";
    }
    if (!isBathroomActived) {
      return "bathroom";
    }
    if (!isLocationActived) {
      return "location";
    }
    if (!isAmentitiesActived) {
      return "amentities";
    }
    if (!isConviniencesActived) {
      return "conviniences";
    }
    if (!isPhotoActived) {
      return "photo";
    }
    if (!isDescriptionActived) {
      return "description";
    }
    if (!isTitleActived) {
      return "title";
    }
    if (!isPriceActived) {
      return "price";
    }
    if (!isDateActived) {
      return "date";
    }
    return "";
  }, []);

  return (
    <Container>
      <p className="register-room-checklist-info">
        ????????? ????????? ??? ????????? ????????? ????????? ??? ????????????.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step="?????? ??????"
          href="/room/register/building"
          disabled={!isBuildingTypeActived}
          inProgress={stepInProgress === "building"}
        />
        <RegisterRoomCheckStep
          step="?????? ??????"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === "bedrooms"}
        />
        <RegisterRoomCheckStep
          step="??????"
          href="/room/register/bathroom"
          disabled={!isBathroomActived}
          inProgress={stepInProgress === "bathroom"}
        />
        <RegisterRoomCheckStep
          step="??????"
          href="/room/register/location"
          disabled={!isLocationActived}
          inProgress={stepInProgress === "location"}
        />
        <RegisterRoomCheckStep
          step="?????? ??????"
          href="/room/register/amentities"
          disabled={!isAmentitiesActived}
          inProgress={stepInProgress === "amentities"}
        />
        <RegisterRoomCheckStep
          step="?????? ??????"
          href="/room/register/conviniences"
          disabled={!isConviniencesActived}
          inProgress={stepInProgress === "conviniences"}
        />
        <RegisterRoomCheckStep
          step="??????"
          href="/room/register/photo"
          disabled={!isPhotoActived}
          inProgress={stepInProgress === "photo"}
        />
        <RegisterRoomCheckStep
          step="??????"
          href="/room/register/description"
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === "description"}
        />
        <RegisterRoomCheckStep
          step="??????"
          href="/room/register/title"
          disabled={!isTitleActived}
          inProgress={stepInProgress === "title"}
        />
        <RegisterRoomCheckStep
          step="??????"
          href="/room/register/price"
          disabled={!isPriceActived}
          inProgress={stepInProgress === "price"}
        />
        <RegisterRoomCheckStep
          step="?????? ??????"
          href="/room/register/date"
          disabled={!isDateActived}
          inProgress={stepInProgress === "date"}
        />
      </ul>
      {isDateActived ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter
          prevHref="/room/register/date"
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
};

export default RegisterRoomChecklist;
