import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import ToastContainer from "./components/ToastContainer";
import AdUnits from "./components/AdUnits";
import { ToastProvider } from "./context/ToastContext";
import "./styles/global.css";
import "./styles/Redesign.css";

const Home = lazy(() => import("./pages/Home"));
const Send = lazy(() => import("./pages/Send"));
const Receive = lazy(() => import("./pages/Receive"));
const MyFiles = lazy(() => import("./pages/MyFiles"));
const CodeHistory = lazy(() => import("./pages/CodeHistory"));
const CodeShare = lazy(() => import("./pages/CodeShare"));
const CodeReceive = lazy(() => import("./components/CodeReceive"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const SharingGuide = lazy(() => import("./pages/SharingGuide"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));


function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <ToastContainer />

          <Suspense fallback={<div className="route-loading">Loading...</div>}>
            <main className="app-main">
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
                <Route path="/guide" element={<SharingGuide />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Suspense>
          <CookieConsent />
          <AdUnits />
          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
