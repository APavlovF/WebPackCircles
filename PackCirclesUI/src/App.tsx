export interface Circle {
  x: number;
  y: number;
  diameter: number;
  isFilled: boolean;
}

interface PackResult {
  sheetsNeeded: number;
  quantityPerSheet: number;
  lastSheetCircles: number;
  fillPercentage: number;
  isBestCut: boolean;
}

interface PackResponse {
  rectangularCircles: Circle[];
  rectangularResult: PackResult;
  triangularCircles: Circle[];
  triangularResult: PackResult;
}

import { useState } from 'react';
import SetupForm from './SetupForm';
import ResultsPanel from './ResultsPanel';
import CanvasPreview from './CanvasPreview';

export default function App() {
  // 1. Local state matching your SetupData C# DTO
  const [formData, setFormData] = useState({
    circleSize: 25,
    quantity: 50,
    space: 2,
    sheetWidth: 110,
    sheetHeight: 110,
    sheetMargin: 2
  });

  // 2. States to hold your backend calculation results
  const [results, setResults] = useState<PackResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 3. The Core Network Request
  const executeCalculation = async () => {
    setLoading(true);
    try {
      // Send the request using the native Fetch API
      const API_BASE_URL = "https://webpackcircles.onrender.com/";
	  const response = await fetch(`${API_BASE_URL}/api/circlepositions`, {
        method: 'POST', // Matches your [HttpPost] attribute
        headers: {
          'Content-Type': 'application/json', // Tells C# [FromBody] to expect JSON
        },
        body: JSON.stringify(formData) // Serializes the object into a raw JSON string
      });

      if (!response.ok) {
        // Automatically catches 400 Bad Request, 500 Errors, etc.
        const errorText = await response.text();
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      // Deserializes the JSON response back into a typed JavaScript Object
      const data: PackResponse = await response.json();
      
      // Save data into state (this forces the UI to re-render with new data)
      setResults(data);

    } catch (err: any) {
      console.error("Connection Failed:", err);
      alert(`Error communicating with backend: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Provide blank fallback defaults if data hasn't arrived yet
  const defaultMetrics = { sheetsNeeded: 0, quantityPerSheet: 0, lastSheetCircles: 0, fillPercentage: 0 };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '30px' }}>
        
        {/* Left Column: Form Setup & Summary Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SetupForm formData={formData} onChange={handleInputChange} onCalculate={executeCalculation} />
          
          {loading && <p style={{ color: '#0056b3', fontWeight: 'bold' }}>Calculating layouts...</p>}

          <ResultsPanel 
            title="Rectangular Cut Details" 
            headerColor={results?.rectangularResult.isBestCut ? "#28a745" : "#3b5998"}  
            data={results ? results.rectangularResult : defaultMetrics} 
          />
          <ResultsPanel 
            title="Triangular Cut Details" 
            headerColor={results?.triangularResult.isBestCut ? "#28a745" : "#4b3b98"}
            data={results ? results.triangularResult : defaultMetrics} 
          />
        </div>

        {/* Right Column: Dynamic Visual Canvas Drawing Boards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
          <CanvasPreview 
            title="Rectangular Cut Preview" 
            width={formData.sheetWidth} 
            height={formData.sheetHeight} 
            circles={results ? results.rectangularCircles : []} 
          />
          <CanvasPreview 
            title="Triangular Cut Preview" 
            width={formData.sheetWidth} 
            height={formData.sheetHeight} 
            circles={results ? results.triangularCircles : []} 
          />
        </div>

      </div>
    </div>
  );
}
