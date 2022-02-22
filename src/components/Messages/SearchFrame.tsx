import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../features/auth/modalSlice";
import { onChangeKeyword } from "../../features/chat/searchFriendsSlice";

interface SearchFrameProps {
  onGetKeyword: (keyword: string) => void;
}

const SearchFrame = ({ onGetKeyword }: SearchFrameProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const dispatch = useDispatch();
  const handleSearchFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    dispatch(onChangeKeyword(key));
    setKeyword(key);
  };
  return (
    <form className="search__frame">
      <i className="fas fa-search seach__start"></i>
      <input type="text" value={keyword} onChange={handleSearchFriends} />
      <i className="fas fa-random search__end"></i>
    </form>
  );
};

export default SearchFrame;
