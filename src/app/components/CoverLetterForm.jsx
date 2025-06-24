"use client";

import { useState, useEffect } from "react";
import markdownIt from "markdown-it";
import { jsPDF } from "jspdf";

const md = markdownIt();

export function CoverLetterForm() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [template, setTemplate] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load Markdown template
  useEffect(() => {
    fetch("/cover_letter.md")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch cover_letter.md");
        return response.text();
      })
      .then((text) => setTemplate(text))
      .catch((error) => console.error("Error loading template:", error));
  }, []);

  // Justify text for PDF
  const justifyText = (doc, text, x, y, maxWidth, fontSize, lineSpacing) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    const justificationThreshold = maxWidth * 0.8;
    lines.forEach((line) => {
      if (y > 272) {
        doc.addPage();
        y = 25;
      }
      const words = line.trim().split(/\s+/);
      if (words.length <= 1) {
        doc.text(line, x, y);
      } else {
        const wordWidths = words.map((word) => doc.getTextWidth(word));
        const totalWordWidth = wordWidths.reduce(
          (sum, width) => sum + width,
          0
        );
        if (totalWordWidth >= justificationThreshold) {
          const spaceCount = words.length - 1;
          const spaceWidth = (maxWidth - totalWordWidth) / spaceCount;
          let currentX = x;
          words.forEach((word, i) => {
            doc.text(word, currentX, y);
            currentX += wordWidths[i] + spaceWidth;
          });
        } else {
          doc.text(line, x, y);
        }
      }
      y += lineSpacing;
    });
    return y;
  };

  // Handle form submission
  const handleUpdate = () => {
    const updatedContent = template
      .replaceAll("{{company}}", company || "Your Company")
      .replaceAll("{{position}}", position || "Your Position")
      .replaceAll(
        "{{companyAddress}}",
        companyAddress || "Your Company Address"
      )
      .replaceAll(
        "{{date}}",
        date ||
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
      );

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const margin = 25;
    const pageWidth = 210;
    const maxWidth = pageWidth - 2 * margin;
    doc.setFont(fontLoaded ? "Roboto" : "times", "normal");
    doc.setFontSize(12);
    justifyText(doc, updatedContent, margin, margin, maxWidth, 12, 5);
    doc.save("cover-letter.pdf");
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Cover Letter Updater
      </h1>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2" htmlFor="company">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter company name"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="position">
          Position
        </label>
        <input
          id="position"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter position"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="companyAddress">
          Company Address
        </label>
        <input
          id="companyAddress"
          type="text"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter company address"
        />
      </div>
      <button
        onClick={handleUpdate}
        disabled={isLoading}
        className={`w-full py-2 rounded-lg transition duration-200 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isLoading ? "Generating PDF..." : "Generate & Download PDF"}
      </button>
    </div>
  );
}
