"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext.js";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);

  const VerifyUser = async () => {
    const dataResult = await axios.post("/api/verify-user", { user: user });
    setUserDetail(dataResult.data.result);
    // console.log("Data Result:", dataResult);
  };

  useEffect(() => {
    user && VerifyUser();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;
