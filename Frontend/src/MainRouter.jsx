import { Routes, Route } from "react-router-dom";
import SignUp from "./user/signUp";
import SignIn from "./auth/signIn";
import Home from "./core/Home";
import Menu from "./core/Menu";
const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
