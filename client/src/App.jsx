import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "/components/login.jsx";
import Register from "/components/register";
import Home from "/components/home";
import Order from "/components/order";
import Account from "/components/account";
import { useState } from "react";
import ProtectedRoutes from "/utils/protectedRoutes";

function App() {
  const [email, setEmail] = useState("");

  const saveEmail = (email) => {
    console.log("in app: " + email);
    setEmail(email);
  }

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login saveEmail={saveEmail} />} />
        <Route path="/register" element={<Register saveEmail={saveEmail} />} />
        <Route element={<ProtectedRoutes email={email} />}>
          <Route path="/home" element={<Home email={email} saveEmail={saveEmail} />} />
          <Route path="/order" element={<Order email={email} saveEmail={saveEmail} />} />
          <Route path="/account" element={<Account email={email} saveEmail={saveEmail} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
