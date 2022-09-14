import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchedUser = ({ searhValue }) => {
  const navigate = useNavigate();

  console.log(searhValue);
  const getSearchUser = async () => {
    const { data } = await instance.get(
      `/api/user/search?nickname=${searhValue}`
    );
    return data;
  };

  const { data } = useQuery(["searchUser", searhValue], getSearchUser, {
    enabled: !!searhValue
  });

  const navUserPage = nickname => {
    navigate(`/user/${nickname}`);
  };

  console.log("user:", data);
  return (
    <>
      {data?.map(user => {
        return (
          <SearchUserWrap
            key={user.nickname}
            onClick={() => navUserPage(user.nickname)}
          >
            <img src={user.profile} />
            <div>{user.nickname}</div>
          </SearchUserWrap>
        );
      })}
    </>
  );
};

export default SearchedUser;

const SearchUserWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  height: 84.37px;
  & img {
    width: 60px;
    height: 60px;
    border-radius: 100px;
    transform: rotate(-0.36deg);
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin-left: 18.5px;
    height: 22px;
  }
`;
