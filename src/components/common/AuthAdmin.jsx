import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthAdmin = ({ children }) => {
  const user = useSelector((state) => state.account.account);

  const isFinish = useSelector((state) => state.account.isFinishGetProfile);
  if (isFinish) {
    if (user && user.role === "admin") return children;
    else return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default AuthAdmin;
