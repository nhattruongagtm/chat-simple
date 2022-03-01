import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router";
import { getFriends, MESSAGES_DOC } from "./api/chat";
import { getUserByID } from "./api/firestore";
import "./App.scss";
import { db } from "./config/firebase";
import { updateMyId } from "./features/auth/signUpSlice";
import { requestLoadMessageItemSuccess } from "./features/chat/chatSlice";
import { updateWidth } from "./features/global/deviceSlice";
import useGetUser from "./hooks/useGetUser";
import { User } from "./models/auth";
import { ChatData, ChatList, ChatListData } from "./models/chat";
import LoginPage from "./pages/Auth/LoginPage";
import { SignUpPage } from "./pages/Auth/SignUpPage";
import MainScreen from "./pages/Home/MainScreen";

export const DeviceWithContext = React.createContext<number>(0);
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const user = useGetUser();
  useEffect(() => {
    const wrapper = document.querySelector("#wrapper");
    window.addEventListener("resize", () => {
      if (wrapper) {
        dispatch(updateWidth(wrapper.clientWidth));
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(updateMyId(user));
    }
  }, [user]);

  useEffect(() => {
    let isCancel = false;
    const displayAllMessages = async () => {
      try {
        if (user && path) {
          const ref = doc(db, MESSAGES_DOC, path);
          const partner: User[] = [];
          // dispatch(updateChatID(params.friendID));
          onSnapshot(ref, async (doc) => {
            if (doc.exists()) {
              const data = doc.data() as ChatList;

              const {
                messages,
                id,
                images,
                isActive,
                members,
                status,
                type,
                name,
              } = data;

              if (Number(members.length) === 2) {
                const idPartner = members.filter(
                  (item) => item.id !== user.uid
                )[0];
                if (idPartner) {
                  const friend = await getUserByID(idPartner.id);
                  friend && partner.push(friend);
                }
              } else {
                // to do

                members
                  .filter((item) => item.id !== user.uid)
                  .forEach(async (item) => {
                    const friend = await getUserByID(item.id);
                    friend && partner.push(friend);
                  });
              }

              const rs: ChatData[] = [];
              for (let i = 0; i < messages.length; i++) {
                const friend = await getUserByID(messages[i].ownID);

                if (friend) {
                  const msg: ChatData = {
                    data: messages[i],
                    friend: friend,
                  };

                  rs.push(msg);
                }
              }
              const friends: User[] = [];
              for (let i = 0; i < members.length; i++) {
                const friend = await getUserByID(members[i].id);

                if (friend) {
                  friend.password = "***************";
                  friends.push(friend);
                }
              }

              const newData: ChatListData = {
                avatar:
                  type === 0 && partner.length === 1
                    ? [partner[0].photoUrl]
                    : [...getFriends(partner)],
                name:
                  partner.length > 1 && name
                    ? name
                    : `${partner[0].firstName} ${partner[0].lastName}`,
                id: doc.id,
                images: images,
                members: members,
                isActive: isActive,
                status: status,
                type: type,
                friends: friends,
                messages: rs,
              };

              dispatch(requestLoadMessageItemSuccess(newData));
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    // if (!isCancel) {
    displayAllMessages();
    // }
    return () => {
      isCancel = true;
    };
  }, [path, user]);

  return (
    <div className="screen">
      <div className="wrapper" id="wrapper">
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/me">
            <MainScreen />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default App;
