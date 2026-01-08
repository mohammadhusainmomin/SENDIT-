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
import About from "./pages/About";
import Features from "./pages/Features";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";


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
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
