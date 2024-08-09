"use client";

import { updateUser } from "@/app/redux/slices/updateUserSlice";
import { fetchCurrentUser } from "@/app/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useProfile = () => {
  const disPatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    disPatch(fetchCurrentUser());
  }, [disPatch]);

  const [id, setId] = useState(user?.id || "");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [companyName, setCompanyName] = useState(user?.companyName || "");

  const setStateData = useEffect(() => {
    if (user) {
      setId(user.id || "");
      setName(user.name || "");
      setEmail(user.email || "");
      setCompanyName(user.companyName || "");
    }
  }, [user]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      email,
      companyName,
      id,
    };

    disPatch(updateUser(data));
    toast.success("Data Updated!");
  };
  return {
    id,
    name,
    email,
    companyName,
    setCompanyName,
    setEmail,
    setId,
    setName,
    handleSubmit,
    setStateData,
  };
};
