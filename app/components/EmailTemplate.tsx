import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  time: string;
  contactNumber: string;
}

export const EmailTemplate = ({
  name,
  time,
  contactNumber,
}: EmailTemplateProps) => (
  <div style={{
    backgroundColor: '#000',
    color: '#fff',
    padding: '40px',
    fontFamily: 'sans-serif',
    borderRadius: '20px',
  }}>
    <h1 style={{ fontSize: '24px', fontStyle: 'italic', textTransform: 'uppercase', color: '#fff' }}>
      Session Confirmed
    </h1>
    <p style={{ color: '#ccc' }}>Hi {name},</p>
    <p style={{ color: '#ccc' }}>Your tattoo appointment has been officially confirmed for:</p>
    
    <div style={{
      background: '#111',
      padding: '24px',
      border: '1px solid #333',
      borderRadius: '12px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#10b981',
      textAlign: 'center' as const,
      margin: '20px 0'
    }}>
      {time}
    </div>
    
    <p style={{ fontSize: '14px', color: '#888' }}>
      Please arrive 10 minutes early. If you need to reschedule, 
      reach out via WhatsApp: <strong>{contactNumber}</strong>.
    </p>
    
    <hr style={{ border: '0', borderTop: '1px solid #222', margin: '30px 0' }} />
    <p style={{ fontSize: '10px', color: '#444', textAlign: 'center' as const }}>
      ANJIT TATTOO STUDIO • PRIVATE SESSIONS
    </p>
  </div>
);