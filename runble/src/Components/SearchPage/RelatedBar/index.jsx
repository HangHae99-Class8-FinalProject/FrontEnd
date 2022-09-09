import React, { useCallback } from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";
import useQueryDebounce from "../../../Hooks/useQueryDebounce";

const RelatedBar = ({
  searchTag,
  setSearchTag,
  setSearchValue,
  onCloseRelatedBar
}) => {
  const debounceSearch = useQueryDebounce(searchTag, 500);

  const getRelated = async () => {
    const { data } = await instance.get(
      `http://54.167.169.43/api/post/autoSearch/?hashtag=${debounceSearch}`
    );
    return data;
  };

  const { data: related } = useQuery(debounceSearch, getRelated, {
    enabled: !!debounceSearch
  });

  const onChangeSearch = list => {
    setSearchTag(list);
    setSearchValue(list);
    onCloseRelatedBar();
  };

  return (
    <>
      {related?.map((list, idx) => {
        return (
          <div onClick={() => onChangeSearch(list)} key={idx}>
            {list}
          </div>
        );
      })}
    </>
  );
};

export default RelatedBar;
