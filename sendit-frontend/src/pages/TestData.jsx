import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import SEO from "../components/SEO";
import { useToast } from "../context/ToastContext";
import "../styles/TestData.css";

const samples = [
  {
    language: "React JavaScript",
    extension: "jsx",
    code: `import React from "react";
export default function Welcome(){const [name,setName]=React.useState("SendIt");return <main><h1>Hello, {name}</h1><button onClick={()=>setName("there")}>Change name</button></main>}`,
  },
  {
    language: "Python",
    extension: "py",
    code: `def total(values):
    result=0
    for value in values:
        result+=value
    return result

print(total([3,5,8]))`,
  },
  {
    language: "C",
    extension: "c",
    code: `#include <stdio.h>
int main(){int values[]={2,4,6};int total=0;for(int i=0;i<3;i++){total+=values[i];}printf("Total: %d\\n",total);return 0;}`,
  },
  {
    language: "HTML",
    extension: "html",
    code: `<!doctype html>
<html><head><meta charset="utf-8"><title>Sample</title></head><body><main><h1>Plain HTML</h1><p>This is a raw code sample.</p></main></body></html>`,
  },
  {
    language: "Java",
    extension: "java",
    code: `public class Main{public static void main(String[] args){int[] values={2,4,6};int total=0;for(int value:values){total+=value;}System.out.println("Total: "+total);}}`,
  },
];

function TestData() {
  const [copiedLanguage, setCopiedLanguage] = useState("");
  const copiedTimeout = useRef(null);
  const { error } = useToast();

  useEffect(() => () => window.clearTimeout(copiedTimeout.current), []);

  const copySample = async (sample) => {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopiedLanguage(sample.language);
      window.clearTimeout(copiedTimeout.current);
      copiedTimeout.current = window.setTimeout(() => setCopiedLanguage(""), 1800);
    } catch {
      error(`Could not copy ${sample.language} code. Check clipboard permissions and try again.`);
    }
  };

  return (
    <div className="page-shell test-data-page">
      <SEO
        title="Code Test Data - SendIt"
        description="Plain React, Python, C, HTML and Java snippets for testing code display."
        url="https://senditsystem.in/testdata"
        robots="noindex, follow"
      />

      <section className="page-section">
        <header className="test-data-hero">
          <div>
            <span className="si-chip">Plain text samples</span>
            <h1 className="si-title">Code test data</h1>
            <p className="si-subtitle">
              Unformatted snippets in multiple languages for checking code sharing and display.
            </p>
          </div>
        </header>

        <div className="test-data-grid">
          {samples.map((sample) => (
            <article className="si-card test-data-card" key={sample.language}>
              <div className="test-data-card-heading">
                <div className="test-data-card-label">
                  <h2>{sample.language}</h2>
                  <span>.{sample.extension}</span>
                </div>
                <button
                  className={`test-data-copy-button ${copiedLanguage === sample.language ? "copied" : ""}`}
                  type="button"
                  onClick={() => copySample(sample)}
                  aria-label={`${copiedLanguage === sample.language ? "Copied" : "Copy"} ${sample.language} code`}
                  title={copiedLanguage === sample.language ? "Copied" : "Copy code"}
                >
                  {copiedLanguage === sample.language ? <FiCheck /> : <FiCopy />}
                  <span>{copiedLanguage === sample.language ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre><code>{sample.code}</code></pre>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TestData;
