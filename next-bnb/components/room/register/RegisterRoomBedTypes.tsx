import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { bedTypes } from "../../../lib/staticData";
import palette from "../../../style/palette";
import { BedType } from "../../../types/room";
import Button from "../../common/Button";
import Selector from "../../common/Selector";
import Counter from "../../common/Counter";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  list-style: none;
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }
  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 16px;
    color: ${palette.gray_76};
    max-width: 240px;
    word-break: keep-all;
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>([]);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  const toggleOpened = () => setOpened(!opened);

  const onChangeBedTypeCount = (value: number, type: BedType) => {
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    );
  };
  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}??? ??????</p>
          <p className="register-room-bed-type-bedroom-counts">
            ?????? {totalBedsCount}???
          </p>
        </div>
        <Button onClick={toggleOpened} width="161px">
          {opened && "??????"}
          {!opened &&
            (totalBedsCount === 0 ? "?????? ????????????" : "?????? ????????????")}
        </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) => onChangeBedTypeCount(value, type)}
              />
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            defaultValue="?????? ?????? ??????"
            value="?????? ?????? ??????"
            disabledOptions={["?????? ?????? ??????"]}
            useValidation={false}
            onChange={(e) =>
              setActivedBedOptions([
                ...activedBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;
