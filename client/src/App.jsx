import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login";
import Register from "../components/register";
import Home from "../components/home";
import Order from "../components/order";
import Account from "../components/account";
import { useState } from "react";
import ProtectedRoutes from "../utils/protectedRoutes";
import PreviousOrders from "../components/previousOrders";

function App() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const saveUserId = (id) => {
    setUserId(id);
  }

  const saveEmail = (email) => {
    setEmail(email);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${import.meta.env.VITE_PATH}/`} element={<Login saveEmail={saveEmail} saveUserId={saveUserId} />} />
        <Route path={`${import.meta.env.VITE_PATH}/register`} element={<Register/>} />
        <Route element={<ProtectedRoutes userId={userId} />}>
          <Route path={`${import.meta.env.VITE_PATH}/home`} element={<Home email={email} userId={userId}/> } />
          <Route path={`${import.meta.env.VITE_PATH}/order`} element={<Order email={email} userId={userId}/>} />
          <Route path={`${import.meta.env.VITE_PATH}/previousorders`} element={<PreviousOrders email={email} userId={userId}/>} />
          <Route path={`${import.meta.env.VITE_PATH}/account`} element={<Account email={email} userId={userId}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
