import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import "./styles/global.css";
import "./styles/CodeShare.css";
import MyFiles from "./pages/MyFiles";
import CodeHistory from "./components/CodeHistory";
import CodeShare from "./pages/CodeShare";
import CodeReceive from "./components/CodeReceive";


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
            <Route path="/code/send" element={<CodeShare />} />
        <Route path="/code/receive" element={<CodeReceive />} />
        <Route path="/code/history" element={<CodeHistory />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
