import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import "./styles/global.css";
import MyFiles from "./pages/MyFiles";


function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/my-files" element={<MyFiles />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
