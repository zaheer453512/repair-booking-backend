// api/send-booking.js
// Vercel Serverless Function — Gmail SMTP via Nodemailer
// No domain verification needed. Just a Gmail App Password.

const nodemailer = require('nodemailer');

// ============================================================
// EMAIL TEMPLATES
// ============================================================

function buildCustomerEmail(data) {
  const device = data.subcategory
    ? `${data.brand} ${data.subcategory} — ${data.model}`
    : `${data.brand} — ${data.model}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f4f5;margin:0;padding:0}
  .wrap{max-width:580px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08)}
  .hdr{background:linear-gradient(135deg,#2C4530,#4E7A54);padding:40px 32px;text-align:center;color:#fff}
  .hdr-icon{width:64px;height:64px;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:28px}
  .hdr h1{margin:0 0 6px;font-size:24px;font-weight:700}
  .hdr p{margin:0;opacity:.8;font-size:14px}
  .body{padding:32px}
  .badge{display:inline-block;background:#ecfdf5;color:#065f46;padding:4px 14px;border-radius:100px;font-size:12px;font-weight:600;margin-bottom:20px;border:1px solid #a7f3d0}
  .greeting{font-size:17px;font-weight:600;color:#1c2517;margin-bottom:6px}
  .intro{font-size:14px;color:#6b7280;margin-bottom:28px;line-height:1.6}
  .sec-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#3A5A40;margin-bottom:10px}
  .det-card{background:#eff6ef;border:1px solid #d4e6d5;border-radius:8px;padding:16px;margin-bottom:20px}
  .det-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #d4e6d5;font-size:14px}
  .det-row:last-child{border-bottom:none}
  .det-lbl{color:#6b7280;font-weight:500}
  .det-val{color:#1c2517;font-weight:600;text-align:right}
  .notice{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-bottom:24px}
  .notice strong{display:block;font-size:14px;color:#92400e;margin-bottom:4px}
  .notice p{margin:0;font-size:13px;color:#b45309;line-height:1.5}
  .footer{background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center}
  .footer p{font-size:12px;color:#9ca3af;margin:0;line-height:1.7}
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <div class="hdr-icon">✓</div>
    <h1>Booking Confirmed!</h1>
    <p>Your repair request has been received</p>
  </div>
  <div class="body">
    <div class="badge">Ref: BK-${Date.now().toString().slice(-6)}</div>
    <p class="greeting">Hello ${data.firstName} ${data.lastName},</p>
    <p class="intro">Thank you for booking with us! We've received your repair request and will contact you shortly to confirm the appointment and provide a price quote.</p>

    <div class="sec-title">Device Details</div>
    <div class="det-card">
      <div class="det-row"><span class="det-lbl">Brand</span><span class="det-val">${data.brand}</span></div>
      ${data.subcategory ? `<div class="det-row"><span class="det-lbl">Type</span><span class="det-val">${data.subcategory}</span></div>` : ''}
      <div class="det-row"><span class="det-lbl">Model</span><span class="det-val">${data.model}</span></div>
      <div class="det-row"><span class="det-lbl">Repair</span><span class="det-val">${data.repairType}${data.isCustomRepair ? ' (Custom)' : ''}</span></div>
      <div class="det-row"><span class="det-lbl">Price</span><span class="det-val">Ask for Price</span></div>
    </div>

    <div class="sec-title">Appointment</div>
    <div class="det-card">
      <div class="det-row"><span class="det-lbl">Preferred Date</span><span class="det-val">${data.preferredDate}</span></div>
      <div class="det-row"><span class="det-lbl">Preferred Time</span><span class="det-val">${data.preferredTime}</span></div>
    </div>

    <div class="notice">
      <strong>What happens next?</strong>
      <p>Our team will review your request and contact you within 24 hours to confirm the appointment and provide a quote.</p>
    </div>
  </div>
  <div class="footer">
    <p>This is an automated confirmation. Please do not reply to this email.<br>Contact us directly through our website for any queries.</p>
  </div>
</div>
</body>
</html>`;
}

function buildAdminEmail(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f4f5;margin:0;padding:0}
  .wrap{max-width:580px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08)}
  .hdr{background:#1c2517;padding:24px 32px;color:#fff;display:flex;align-items:center;justify-content:space-between}
  .hdr h1{margin:0 0 4px;font-size:18px;font-weight:700}
  .hdr p{margin:0;opacity:.55;font-size:12px}
  .badge{display:inline-block;background:#ef4444;color:#fff;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px}
  .body{padding:28px 32px}
  .section{margin-bottom:24px}
  .sec-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #f3f4f6}
  .row{display:flex;padding:7px 0;font-size:14px;border-bottom:1px solid #f9fafb}
  .row:last-child{border-bottom:none}
  .lbl{width:140px;flex-shrink:0;color:#6b7280;font-weight:500}
  .val{color:#1c2517;font-weight:600;flex:1}
  .custom{background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;margin-left:6px}
  .footer{background:#f9fafb;border-top:1px solid #e5e7eb;padding:14px 32px}
  .footer p{font-size:12px;color:#9ca3af;margin:0}
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <div>
      <h1>New Repair Booking</h1>
      <p>${new Date().toLocaleString('en-GB',{dateStyle:'full',timeStyle:'short'})}</p>
    </div>
    <span class="badge">New</span>
  </div>
  <div class="body">
    <div class="section">
      <div class="sec-title">Customer Information</div>
      <div class="row"><span class="lbl">Full Name</span><span class="val">${data.firstName} ${data.lastName}</span></div>
      <div class="row"><span class="lbl">Phone</span><span class="val">${data.phone}</span></div>
      <div class="row"><span class="lbl">Email</span><span class="val">${data.email}</span></div>
      <div class="row"><span class="lbl">Address</span><span class="val">${data.address}</span></div>
    </div>
    <div class="section">
      <div class="sec-title">Device Information</div>
      <div class="row"><span class="lbl">Brand</span><span class="val">${data.brand}</span></div>
      ${data.subcategory ? `<div class="row"><span class="lbl">Type</span><span class="val">${data.subcategory}</span></div>` : ''}
      <div class="row"><span class="lbl">Model</span><span class="val">${data.model}</span></div>
      <div class="row"><span class="lbl">Repair</span><span class="val">${data.repairType} ${data.isCustomRepair ? '<span class="custom">CUSTOM</span>' : ''}</span></div>
    </div>
    <div class="section">
      <div class="sec-title">Appointment Preference</div>
      <div class="row"><span class="lbl">Date</span><span class="val">${data.preferredDate}</span></div>
      <div class="row"><span class="lbl">Time</span><span class="val">${data.preferredTime}</span></div>
    </div>
  </div>
  <div class="footer">
    <p>Reply directly to this email to contact the customer, or call them at ${data.phone}.</p>
  </div>
</div>
</body>
</html>`;
}

// ============================================================
// MAIN HANDLER
// ============================================================
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body;
  const required = ['firstName', 'lastName', 'phone', 'email', 'brand', 'model', 'repairType'];
  for (const field of required) {
    if (!data[field]) return res.status(400).json({ error: `Missing field: ${field}` });
  }

  // ── Gmail SMTP Transporter ──────────────────────────────
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,       // your Gmail address e.g. yourshop@gmail.com
      pass: process.env.GMAIL_APP_PASS    // 16-char App Password (NOT your Gmail password)
    }
  });

  try {
    await Promise.all([

      // Email to customer
      transporter.sendMail({
        from: `"${process.env.SHOP_NAME || 'Repair Shop'}" <${process.env.GMAIL_USER}>`,
        to: `${data.firstName} ${data.lastName} <${data.email}>`,
        subject: '✓ Your Repair Booking Has Been Received',
        html: buildCustomerEmail(data)
      }),

      // Email to admin
      transporter.sendMail({
        from: `"Booking System" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: data.email,   // Admin can reply directly to customer
        subject: `New Booking — ${data.brand} ${data.model} (${data.firstName} ${data.lastName})`,
        html: buildAdminEmail(data)
      })

    ]);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Email error:', err.message);
    return res.status(500).json({ error: 'Failed to send emails.' });
  }
};
