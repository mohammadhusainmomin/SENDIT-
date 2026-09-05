import { Link } from "react-router-dom";

export default function Breadcrumbs({ current }) {
  return (
    <nav className="content-breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
