import React, { useEffect, useState } from "react";
import { getUserByID } from "../api/firestore";
import { User } from "../models/auth";
import { getIDUser } from "../utils/auth";

const useGetUser = () => {
  const [user, setUser] = useState<User>();
  const token = getIDUser();
  useEffect(() => {
    const getUser = async () => {
      if (token) {
        const u = await getUserByID(token.user_id);
        if (u) {
          
          setUser(u);
        }
      }
    };
    getUser();
  }, []);
  return user;
};

export default useGetUser;
