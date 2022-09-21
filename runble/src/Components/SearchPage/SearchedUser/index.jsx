import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchedUser = ({ searhValue }) => {
  const navigate = useNavigate();

  console.log(searhValue);
  const getSearchUser = async () => {
    const { data } = await instance.get(`/api/user/search?nickname=${searhValue}`);
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
          <SearchUserWrap key={user.nickname} onClick={() => navUserPage(user.nickname)}>
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
  padding: 1.2rem 1.6rem;
  width: 100%;
  height: 8.437rem;
  & img {
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    transform: rotate(-0.36deg);
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem;
    margin-left: 1.85rem;
    height: 2.2rem;
  }
`;
