import { Routes, Route } from "react-router-dom";
import SignUp from "./user/signUp";
import SignIn from "./auth/signIn";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Profile from "./user/profile";
import EditProfile from "./user/EditProfile";
const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/edit/:userId" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
