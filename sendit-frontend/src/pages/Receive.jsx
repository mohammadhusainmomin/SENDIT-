import CodeInput from "../components/CodeInput";
import SEO from "../components/SEO";

function Receive() {
  return (
    <div className="page-shell">
      <SEO
        title="Receive Shared Files | SendIt Access Code Retrieval"
        description="Receive shared files with SendIt by entering the access code and downloading files through a clean secure retrieval flow."
        keywords="receive shared files, file retrieval with code, sendit receive files, secure file download"
        url="https://senditsystem.netlify.app/receive"
      />

      <section className="page-section">
        <div className="work-grid">
          <div className="work-main">
            <div>
              <span className="si-chip">Secure Retrieval</span>
              <h1 className="si-title" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Access Your Shared Files
              </h1>
              <p className="si-subtitle">
                Enter the 4-digit access code and retrieve the files your sender shared. If multiple files are available,
                the UI will show a clean download list.
              </p>
            </div>
            <CodeInput />
          </div>

          <aside className="work-sidebar">
            <div className="si-card" style={{ padding: "1.5rem" }}>
              <h3>How it works</h3>
              <div className="muted-list" style={{ marginTop: "1rem" }}>
                <div className="muted-list-item"><span className="si-chip">1</span><span>Get the sender's 4-digit code.</span></div>
                <div className="muted-list-item"><span className="si-chip">2</span><span>Enter the code in the input box.</span></div>
                <div className="muted-list-item"><span className="si-chip">3</span><span>Download one file or pick from the available list.</span></div>
              </div>
            </div>

            <div className="si-card" style={{ padding: "1.5rem" }}>
              <h3>Transfer notes</h3>
              <div className="muted-list" style={{ marginTop: "1rem" }}>
                <div className="muted-list-item">Guest access supported</div>
                <div className="muted-list-item">Codes expire based on sender settings</div>
                <div className="muted-list-item">Working with your current backend receive API</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Receive;
