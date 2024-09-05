import { Routes, Route } from "react-router-dom";
import SignUp from "./user/signUp";
import SignIn from "./auth/signIn";
import Home from "./core/Home";
const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
