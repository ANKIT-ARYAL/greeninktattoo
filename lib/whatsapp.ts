/*
 * Lightweight WhatsApp helper.
 * - If TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_WHATSAPP_FROM are set,
 *   it will send messages via Twilio's REST API.
 * - Otherwise it will no-op and log the message (useful for local dev).
 */
export async function sendWhatsApp(to: string, message: string): Promise<void> {
  if (!to || !message) return;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM || process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_FROM;

  // Basic Twilio integration
  if (accountSid && authToken && from) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const params = new URLSearchParams();
    params.append('From', `whatsapp:${from}`);
    params.append('To', `whatsapp:${to}`);
    params.append('Body', message);

    const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Twilio send failed: ${res.status} ${text}`);
    }

    return;
  }

  // Fallback: no external provider configured — log and continue
  // This keeps the app working in environments without credentials.
  // The calling code should handle failures (we don't throw here).
  // eslint-disable-next-line no-console
  console.log('[whatsapp noop] To:', to, 'Message:', message);
}

export default sendWhatsApp;
