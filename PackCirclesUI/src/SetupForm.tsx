import { useState } from 'react';

interface SetupFormProps {
  formData: any;
  onChange: (field: string, value: number) => void;
  onCalculate: () => void;
}

export default function SetupForm({ formData, onChange, onCalculate }: SetupFormProps) {
  // 1. Maintain a separate local state variable for the active unit string selection
  const [selectedUnit, setSelectedUnit] = useState<string>("mm");

  const availableUnits = ["mm", "cm", "m", "in", "ft"];

  const fields = [
    { label: "Circle size Ø:", key: "circleSize" },
    { label: "Circles quantity:", key: "quantity", customUnit: "pc(s)" }, // Exception row unit
    { label: "Space:", key: "space" },
    { label: "Sheet width:", key: "sheetWidth" },
    { label: "Sheet height:", key: "sheetHeight" },
    { label: "Sheet margin:", key: "sheetMargin" },
  ];

  // Handles Up and Down arrow key navigation with wrapping/looping
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
    const totalFields = fields.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % totalFields;
      const nextInput = document.querySelector(`[data-index="${nextIndex}"]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
    
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = currentIndex === 0 ? totalFields - 1 : currentIndex - 1;
      const prevInput = document.querySelector(`[data-index="${prevIndex}"]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '6px', border: '1px solid #dee2e6' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Setup</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {fields.map((field, index) => (
          <div key={field.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '14px', color: '#495057' }}>{field.label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="number"
                data-index={index}
                value={formData[field.key]}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => onChange(field.key, Number(e.target.value))}
                style={{ width: '80px', padding: '4px 8px', textAlign: 'right', border: '1px solid #ced4da', borderRadius: '4px' }}
              />
              
              {/* 2. CONDITIONAL RENDERING FOR UNIT DISPLAY CONTROLS */}
              {field.key === "circleSize" ? (
                // Row 1: Render the dropdown with a fixed width to match the span column alignment
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  style={{ 
                    width: '45px', // <-- FIXED WIDTH
                    padding: '3px 2px', 
                    fontSize: '12px', 
                    border: '1px solid #ced4da', 
                    borderRadius: '4px', 
                    background: 'white', 
                    color: '#495057', 
                    cursor: 'pointer' 
                  }}
                >
                  {availableUnits.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              ) : (
                // Other Rows: Display static text using the same matching width space block
                <span style={{ 
                  fontSize: '12px', 
                  width: '45px', // <-- MATCHING FIXED WIDTH
                  textAlign: 'left', // Aligns unit text nicely next to the input fields
                  color: '#6c757d',
                  display: 'inline-block' // Forces the span to respect the width property definition
                }}>
                  {field.customUnit ? field.customUnit : selectedUnit}
                </span>
              )}

            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onCalculate}
        style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Calculate Cuts
      </button>
    </div>
  );
}
