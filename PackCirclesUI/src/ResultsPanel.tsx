interface LayoutResult {
  sheetsNeeded: number;
  quantityPerSheet: number;
  lastSheetCircles: number;
  fillPercentage: number;
}

interface ResultsPanelProps {
  title: string;
  headerColor: string;
  data: LayoutResult;
}

export default function ResultsPanel({ title, headerColor, data }: ResultsPanelProps) {
  const metrics = [
    { label: "Sheets:", value: data.sheetsNeeded },
    { label: "Quantity/Sheet:", value: data.quantityPerSheet },
    { label: "Last sheet circles:", value: data.lastSheetCircles },
    { label: "Last sheet fill %:", value: `${data.fillPercentage}%` },
  ];

  return (
    <div style={{ background: 'white', borderRadius: '6px', border: '1px solid #dee2e6', overflow: 'hidden' }}>
      <div style={{ background: headerColor, color: 'white', padding: '10px 15px', fontWeight: 'bold', fontSize: '14px' }}>
        {title}
      </div>
      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #eee', paddingBottom: '4px' }}>
            <span style={{ fontSize: '13px', color: '#6c757d' }}>{m.label}</span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#212529' }}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
