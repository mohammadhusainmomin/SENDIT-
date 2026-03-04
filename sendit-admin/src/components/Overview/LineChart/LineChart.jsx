import "./LineChart.css";

function LineChart({ data }) {
  if (!data || data.length === 0) return <div>No data available</div>;

  const maxValue = Math.max(...data.map((d) => d.total || 0), 1);

  return (
    <div className="line-chart">
      <div className="chart-lines">
        {data.map((item, index) => (
          <div
            key={index}
            className="chart-column"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="column-tooltip">
              <div className="tooltip-row">
                <span className="tooltip-label">Files:</span>
                <span className="tooltip-value">{item.files}</span>
              </div>
              <div className="tooltip-row">
                <span className="tooltip-label">Codes:</span>
                <span className="tooltip-value">{item.codes}</span>
              </div>
              <div className="tooltip-row tooltip-total">
                <span className="tooltip-label">Total:</span>
                <span className="tooltip-value">{item.total}</span>
              </div>
            </div>
            <div className="column-bars">
              <div
                className="bar bar-files"
                style={{ height: `${(item.files / maxValue) * 180}px` }}
                title={`Files: ${item.files}`}
              />
              <div
                className="bar bar-codes"
                style={{ height: `${(item.codes / maxValue) * 180}px` }}
                title={`Codes: ${item.codes}`}
              />
            </div>
            <span className="column-label">{item.month}</span>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <span className="legend-item-inline">
          <span className="legend-box files"></span>Files ({data.reduce((sum, d) => sum + (d.files || 0), 0)})
        </span>
        <span className="legend-item-inline">
          <span className="legend-box codes"></span>Codes ({data.reduce((sum, d) => sum + (d.codes || 0), 0)})
        </span>
      </div>
    </div>
  );
}

export default LineChart;
