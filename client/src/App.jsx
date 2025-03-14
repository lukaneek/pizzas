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
  const [email, setEmail] = useState("");

  const saveEmail = (email) => {
    setEmail(email);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login saveEmail={saveEmail} />} />
        <Route path="/register" element={<Register saveEmail={saveEmail} />} />
        <Route element={<ProtectedRoutes email={email} />}>
          <Route path="/home" element={<Home email={email}/>} />
          <Route path="/order" element={<Order email={email}/>} />
          <Route path="/previousorders" element={<PreviousOrders email={email}/>} />
          <Route path="/account" element={<Account email={email}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
