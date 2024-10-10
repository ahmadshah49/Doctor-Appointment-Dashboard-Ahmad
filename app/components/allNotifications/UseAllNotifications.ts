"use client";
import {
  deleteAllNotifications,
  deleteNotifications,
  getNotification,
} from "@/app/redux/slices/notificationsSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export const useAllNotifications = () => {
  const disPatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.notifications);
  const deleteNotification = (id: any) => {
    disPatch(deleteNotifications(id));
    disPatch(getNotification());
  };
  const deleteAllNotification = () => {
    disPatch(deleteAllNotifications());
    disPatch(getNotification());
  };
  useEffect(() => {
    disPatch(getNotification());
  }, [disPatch]);

  return { data, deleteNotification, deleteAllNotification };
};
