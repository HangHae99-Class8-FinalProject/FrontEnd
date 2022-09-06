import React from "react";

const SearchedUser = ({ users }) => {
  return (
    <>
      {users?.map(user => {
        return <div>{user}</div>;
      })}
    </>
  );
};

export default SearchedUser;
