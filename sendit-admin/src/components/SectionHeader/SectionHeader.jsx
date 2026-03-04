import "./SectionHeader.css";

function SectionHeader({ title, count, countLabel }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {count !== undefined && <p className="section-count">{countLabel}: {count}</p>}
    </div>
  );
}

export default SectionHeader;
