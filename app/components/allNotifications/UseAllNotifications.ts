"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import React, { useEffect } from "react";
import { getNotification } from "@/app/redux/slices/notificationsSlice";
export const useAllNotifications = () => {
  const disPatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    disPatch(getNotification());
  }, [disPatch]);

  return { data };
};
