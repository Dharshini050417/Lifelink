import React, { useState } from "react";
import jsPDF from "jspdf";

const GenerateReportButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async () => {
    const name = prompt("Enter your name:");
    if (!name) return;

    setIsGenerating(true);

    try {
      const response = await fetch(
        "https://floral-mode-046e.dharshinilohi.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Generate a well-structured mental wellness report for ${name}.`,
          }),
          mode: "cors",
        }
      );

      const data = await response.json();
      const reportContent = data.response || "Could not generate the report.";
      generatePDF(name, reportContent);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDF = (name, content) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Mental Wellness Report for ${name}`, 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 20, 40);

    doc.save(`Mental_Wellness_Report_${name}.pdf`);
  };

  return (
    <button className="send-button" onClick={generateReport} disabled={isGenerating}>
      {isGenerating ? "Generating..." : "Generate Report"}
    </button>
  );
};

export default GenerateReportButton;
