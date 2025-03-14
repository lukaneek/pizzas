import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "/components/login.jsx";
import Register from "/components/register";
import Home from "/components/home";
import Order from "/components/order";
import Account from "/components/account";
import { useState } from "react";
import ProtectedRoutes from "/utils/protectedRoutes";
import PreviousOrders from "../components/previousOrders";

function App() {
  const [email, setEmail] = useState();

  const saveEmail = (email) => {
    setEmail(email);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${import.meta.env.VITE_PATH}/`} element={<Login saveEmail={saveEmail} />} />
        <Route path={`${import.meta.env.VITE_PATH}/register`} element={<Register saveEmail={saveEmail} />} />
        <Route element={<ProtectedRoutes email={email} />}>
          <Route path={`${import.meta.env.VITE_PATH}/home`} element={<Home email={email} saveEmail={saveEmail}/>} />
          <Route path={`${import.meta.env.VITE_PATH}/order`} element={<Order email={email} saveEmail={saveEmail}/>} />
          <Route path={`${import.meta.env.VITE_PATH}/previousorders`} element={<PreviousOrders email={email} saveEmail={saveEmail}/>} />
          <Route path={`${import.meta.env.VITE_PATH}/account`} element={<Account email={email} saveEmail={saveEmail}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
