import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";

const SearchedUser = ({ searhValue }) => {
  console.log(searhValue);
  const getSearchUser = async () => {
    const { data } = await instance.get(
      `/api/user/search?nickname=${searhValue}`
    );
    return data;
  };

  const { data } = useQuery("searchUser", getSearchUser, {
    enabled: !!searhValue
  });

  console.log("user:", data);
  return (
    <>
      {data?.map(user => {
        return (
          <>
            <img src={user.profile} />
            <div>{user.nickname}</div>
          </>
        );
      })}
      <div>유저검색</div>
    </>
  );
};

export default SearchedUser;
