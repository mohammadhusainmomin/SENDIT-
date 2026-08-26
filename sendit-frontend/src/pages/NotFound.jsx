import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function NotFound() {
  return (
    <main className="notfound-page">
      <SEO
        title="Page Not Found | SendIt"
        description="The page you are looking for does not exist. Continue sharing files securely with SendIt."
        url="https://senditsystem.in/404"
      />
      <section className="notfound-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page may have moved, expired, or the URL is incorrect.</p>
        <div className="notfound-links">
          <Link to="/">Go Home</Link>
          <Link to="/send">Send File</Link>
          <Link to="/receive">Receive File</Link>
          <Link to="/faq">Help Center</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
