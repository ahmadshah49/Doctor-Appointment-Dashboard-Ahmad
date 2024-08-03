"use client";
import ProfileInput from "../profileInput/ProfileInput";
import { useProfile } from "./useProfile";

const Profile = () => {
  const {
    companyName,
    email,
    id,
    name,
    handleSubmit,
    setCompanyName,
    setEmail,
    setId,
    setName,
  } = useProfile();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ProfileInput
          htmlFor="id"
          id="id"
          label="Id"
          name="id"
          type="text"
          value={id}
          required
          onChange={(e) => setId(e)}
          hidden
          readonly
        />

        <ProfileInput
          htmlFor="name"
          id="name"
          label="Name"
          name="name"
          type="name"
          value={name}
          required
          onChange={(e) => setName(e)}
        />

        <ProfileInput
          htmlFor="companyName"
          id="companyName"
          label="Company Name"
          name="companyName"
          type="companyName"
          value={companyName}
          required
          onChange={(e) => setCompanyName(e)}
        />
        <ProfileInput
          htmlFor="email"
          id="email"
          label="Email"
          name="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e)}
        />

        <button
          type="submit"
          className="bg-primary/70 transition-all  py-3 px-6 my-10 hover:bg-primary flex items-center justify-center  text-white rounded-lg font-semibold text-center"
        >
          Change
        </button>
      </form>
    </div>
  );
};
export default Profile;
