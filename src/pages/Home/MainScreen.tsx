import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchUser from "../../components/Modals/SearchUser";
import { requestLoadMessages } from "../../features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";
import { RootState } from "../../store";
import MainPage from "./MainPage";

type Props = {};

const MainScreen = (props: Props) => {
  const dispatch = useDispatch();
  const isDisplayLayer = useSelector((state: RootState) => state.modal.isDisplayLayer);
  const user = useGetUser();
  useEffect(()=>{
    let isCancel = false
  if(user && !isCancel){
      dispatch(requestLoadMessages(user.uid))
    }

    return () => {isCancel = true}
  },[user])
  return (
    <div className="main__screen">
      <MainPage />
      <div className={isDisplayLayer ? "layer-app layer-display": "layer-app"}></div>
      <SearchUser />
    </div>
  );
};

export default MainScreen;
