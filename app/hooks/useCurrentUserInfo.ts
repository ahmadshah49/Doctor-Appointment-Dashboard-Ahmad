import getCurrentUser from "../action/getCurrentUser";

export const useCurrentUserInfo = async () => {
  const currentUser = await getCurrentUser();

  const email = currentUser?.email;
  const name = currentUser?.name;
  const companyName = currentUser?.companyName;

  return { email, companyName, name };
};
