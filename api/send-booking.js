// api/send-booking.js
// MobileBitX — Vercel Serverless Function
// Gmail SMTP via Nodemailer | Professional Branded Email Templates

const nodemailer = require('nodemailer');

// ── Logo URL ──────────────────────────────────────────────────
// Upload mobilebitx.png to Shopify Admin → Content → Files
// Then paste the CDN URL in your Vercel Environment Variables
// as LOGO_URL  e.g. https://cdn.shopify.com/s/files/1/xxxx/mobilebitx.png
const LOGO_URL = process.env.LOGO_URL || 'https://cdn.shopify.com/s/files/1/0745/0669/8797/files/mobilebitx.png?v=1776717433';

// ============================================================
// CUSTOMER EMAIL
// ============================================================
function buildCustomerEmail(data) {
  const ref = 'MBX-' + Date.now().toString().slice(-6);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Booking Confirmed — MobileBitX</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;background:#EDEAE3;color:#1C2517;-webkit-text-size-adjust:100%}
  img{border:0;display:block;max-width:100%}
  a{color:#3A5A40;text-decoration:none}
  .wrap{background:#EDEAE3;padding:40px 16px 60px}
  .container{max-width:580px;margin:0 auto}
  .hdr{background:#1C2517;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center}
  .hdr img{max-width:190px;height:auto;margin:0 auto}
  .hdr-line{border:none;border-top:1px solid rgba(255,255,255,.10);margin:22px 0 20px}
  .status-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(78,122,84,.22);border:1px solid rgba(78,122,84,.38);color:#A8D4AA;font-size:12.5px;font-weight:600;letter-spacing:.5px;padding:8px 20px;border-radius:100px}
  .check-dot{width:18px;height:18px;background:#4E7A54;border-radius:50%;display:inline-flex;align-items:center;justify-content:center}
  .hdr-title{font-size:26px;font-weight:700;color:#fff;margin-top:16px;letter-spacing:-.4px;line-height:1.2}
  .hdr-sub{font-size:13.5px;color:rgba(255,255,255,.50);margin-top:6px}
  .card{background:#fff;padding:36px 40px}
  .ref-tag{display:inline-block;background:#EFF6EF;color:#2C4530;border:1px solid #C8DEC9;font-size:11.5px;font-weight:700;letter-spacing:.8px;padding:5px 14px;border-radius:100px;text-transform:uppercase;margin-bottom:22px}
  .hi{font-size:18px;font-weight:700;color:#1C2517;margin-bottom:8px}
  .intro{font-size:14px;color:#6B7A62;line-height:1.7;border-left:3px solid #C8DEC9;padding-left:14px;margin-bottom:28px}
  .sec-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9EAD94;margin-bottom:10px}
  .det-box{background:#F7F5EF;border:1px solid #E4DFDA;border-radius:10px;overflow:hidden;margin-bottom:22px}
  .dr{display:flex;justify-content:space-between;align-items:center;padding:11px 16px;border-bottom:1px solid #EAE6E0;font-size:13.5px}
  .dr:last-child{border-bottom:none}
  .dl{color:#7A8B70;font-weight:500}
  .dv{color:#1C2517;font-weight:600;text-align:right;max-width:60%}
  .dv.g{color:#2C4530}
  .next-box{background:linear-gradient(135deg,#EFF6EF,#E6EFE6);border:1px solid #C8DEC9;border-radius:10px;padding:20px;margin-bottom:24px}
  .next-t{font-size:13px;font-weight:700;color:#2C4530;margin-bottom:10px;display:flex;align-items:center;gap:7px}
  .ndot{width:6px;height:6px;background:#4E7A54;border-radius:50%;flex-shrink:0}
  .next-list{list-style:none;padding:0}
  .next-list li{font-size:13px;color:#4A6345;line-height:1.75;padding-left:16px;position:relative}
  .next-list li::before{content:"›";position:absolute;left:0;color:#4E7A54;font-weight:700}
  .disc-banner{background:#2C4530;border-radius:10px;padding:22px 24px;text-align:center;margin-bottom:24px}
  .disc-t{font-size:15px;font-weight:700;color:#fff;margin-bottom:5px}
  .disc-s{font-size:12.5px;color:rgba(255,255,255,.60);line-height:1.6}
  .disc-code{display:inline-block;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.18);color:#A8D4AA;font-size:13px;font-weight:700;padding:6px 18px;border-radius:7px;margin-top:12px;letter-spacing:1px}
  .cta-wrap{text-align:center;margin-bottom:4px}
  .cta-btn{display:inline-block;background:#2C4530;color:#fff;font-size:14px;font-weight:600;padding:13px 34px;border-radius:8px;letter-spacing:.2px}
  .footer{background:#F2EFE9;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #E4DFDA}
  .footer img{max-width:110px;height:auto;margin:0 auto 12px;opacity:.55}
  .flinks{margin-bottom:10px}
  .flinks a{font-size:12px;color:#4E7A54;margin:0 7px;font-weight:500}
  .flinks span{color:#CDC9C2;font-size:10px}
  .fcopy{font-size:11px;color:#ADB5A3;line-height:1.8}
  @media(max-width:600px){
    .hdr,.card,.footer{padding-left:22px;padding-right:22px}
    .hdr-title{font-size:22px}
    .dr{flex-direction:column;align-items:flex-start;gap:3px}
    .dv{text-align:left;max-width:100%}
  }
</style>
</head>
<body>
<div class="wrap">
<div class="container">

  <div class="hdr">
    <img src="${LOGO_URL}" alt="MobileBitX — Accessories, Repairs, Refurbished">
    <hr class="hdr-line">
    <div class="status-pill">
      <span class="check-dot">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      Booking Confirmed
    </div>
    <p class="hdr-title">Your Repair is Booked!</p>
    <p class="hdr-sub">We've received your request and will be in touch soon</p>
  </div>

  <div class="card">
    <div class="ref-tag">Ref: ${ref}</div>
    <p class="hi">Hello ${data.firstName} ${data.lastName},</p>
    <p class="intro">Thank you for choosing MobileBitX! Your repair booking has been successfully received. Our expert technicians will review your request and reach out within 24 hours to confirm your appointment.</p>

    <p class="sec-lbl">Device Details</p>
    <div class="det-box">
      <div class="dr"><span class="dl">Brand</span><span class="dv">${data.brand}</span></div>
      ${data.subcategory ? `<div class="dr"><span class="dl">Type</span><span class="dv">${data.subcategory}</span></div>` : ''}
      <div class="dr"><span class="dl">Model</span><span class="dv">${data.model}</span></div>
      <div class="dr"><span class="dl">Repair Needed</span><span class="dv">${data.repairType}${data.isCustomRepair ? ' <em style="font-size:11px;color:#7A8B70;font-style:normal">(Custom)</em>' : ''}</span></div>
      <div class="dr"><span class="dl">Price</span><span class="dv g">Ask for Price</span></div>
    </div>

    <p class="sec-lbl">Appointment Preference</p>
    <div class="det-box">
      <div class="dr"><span class="dl">Preferred Date</span><span class="dv">${data.preferredDate}</span></div>
      <div class="dr"><span class="dl">Preferred Time</span><span class="dv">${data.preferredTime}</span></div>
    </div>

    <div class="next-box">
      <p class="next-t"><span class="ndot"></span>What happens next?</p>
      <ul class="next-list">
        <li>Our team will carefully review your repair request</li>
        <li>We'll call or email you within 24 hours to confirm</li>
        <li>A personalised price quote will be provided</li>
        <li>Your device will be handled by our certified technicians</li>
      </ul>
    </div>

    <div class="disc-banner">
      <p class="disc-t">🎉 Exclusive Offer for MobileBitX Customers</p>
      <p class="disc-s">Enjoy <strong style="color:#fff">5% OFF</strong> on all products in our store — accessories, refurbished devices &amp; much more. A small thank-you from us to you!</p>
      <span class="disc-code">5% OFF — All Products</span>
    </div>

    <div class="cta-wrap">
      <a href="https://mobilebitx.com" class="cta-btn">Shop at MobileBitX →</a>
    </div>
  </div>

  <div class="footer">
    <img src="${LOGO_URL}" alt="MobileBitX">
    <div class="flinks">
      <a href="https://mobilebitx.com">Website</a><span> · </span>
      <a href="https://mobilebitx.com/pages/contact">Contact Us</a><span> · </span>
      <a href="https://mobilebitx.com/policies/terms-of-service">Terms</a>
    </div>
    <p class="fcopy">
      © 2026 MobileBitX · Accessories, Repairs, Refurbished<br>
      This is an automated confirmation — please do not reply directly.<br>
      For any queries, reach us through our website.
    </p>
  </div>

</div>
</div>
</body>
</html>`;
}

// ============================================================
// ADMIN EMAIL
// ============================================================
function buildAdminEmail(data) {
  const ref = 'MBX-' + Date.now().toString().slice(-6);
  const submittedAt = new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>New Booking Alert — MobileBitX Admin</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;background:#EDEAE3;color:#1C2517;-webkit-text-size-adjust:100%}
  img{border:0;display:block;max-width:100%}
  a{text-decoration:none}
  .wrap{background:#EDEAE3;padding:40px 16px 60px}
  .container{max-width:580px;margin:0 auto}
  .hdr{background:#1C2517;border-radius:16px 16px 0 0;padding:22px 36px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
  .hdr img{max-width:140px;height:auto}
  .hdr-meta{font-size:11px;color:rgba(255,255,255,.35);margin-top:4px}
  .new-pill{display:inline-flex;align-items:center;gap:6px;background:#EF4444;color:#fff;font-size:11px;font-weight:700;padding:7px 16px;border-radius:100px;letter-spacing:.8px;text-transform:uppercase;flex-shrink:0}
  .pulse{width:7px;height:7px;background:rgba(255,255,255,.8);border-radius:50%}
  .alert-bar{background:#2C4530;padding:14px 36px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .ab-title{font-size:13.5px;color:#fff;font-weight:700}
  .ab-time{font-size:11.5px;color:rgba(255,255,255,.50);margin-top:2px}
  .ab-ref{background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.18);color:#A8D4AA;font-size:12px;font-weight:700;padding:5px 12px;border-radius:6px;letter-spacing:.8px;flex-shrink:0}
  .card{background:#fff;padding:30px 36px}
  .section{margin-bottom:22px}
  .sec-row{display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #F0EDE6}
  .s-icon{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .s-icon.g{background:#EFF6EF}
  .s-icon.b{background:#EEF2FF}
  .s-icon.a{background:#FFFBEB}
  .sec-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9EAD94}
  table.info{width:100%;border-collapse:collapse}
  table.info tr{border-bottom:1px solid #F5F2EC}
  table.info tr:last-child{border-bottom:none}
  table.info td{padding:10px 12px;font-size:13.5px;vertical-align:top}
  table.info td:first-child{color:#7A8B70;font-weight:500;width:130px}
  table.info td:last-child{color:#1C2517;font-weight:600}
  table.info a{color:#2C4530;font-weight:600}
  .ctag{display:inline-block;background:#FEF3C7;color:#92400E;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;margin-left:5px}
  .action-row{background:#F7F5EF;border-radius:10px;padding:16px 18px;margin-bottom:22px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
  .ar-label{font-size:12.5px;color:#6B7A62;font-weight:500}
  .ar-btns{display:flex;gap:8px;flex-wrap:wrap}
  .ab{font-size:13px;font-weight:600;padding:9px 18px;border-radius:7px;display:inline-block}
  .ab.p{background:#2C4530;color:#fff}
  .ab.o{background:#fff;color:#2C4530;border:1.5px solid #C8DEC9}
  .footer{background:#F2EFE9;border-radius:0 0 16px 16px;padding:18px 36px;border-top:1px solid #E4DFDA;text-align:center}
  .footer p{font-size:11px;color:#ADB5A3;line-height:1.8}
  @media(max-width:600px){
    .hdr,.alert-bar,.card,.footer{padding-left:18px;padding-right:18px}
    .hdr{flex-direction:column;align-items:flex-start}
    .action-row{flex-direction:column;align-items:flex-start}
  }
</style>
</head>
<body>
<div class="wrap">
<div class="container">

  <div class="hdr">
    <div>
      <img src="${LOGO_URL}" alt="MobileBitX">
      <p class="hdr-meta">Admin Notification · Booking Alert</p>
    </div>
    <div class="new-pill">
      <span class="pulse"></span>
      New Booking
    </div>
  </div>

  <div class="alert-bar">
    <div>
      <p class="ab-title">New Repair Booking Received</p>
      <p class="ab-time">${submittedAt}</p>
    </div>
    <span class="ab-ref">${ref}</span>
  </div>

  <div class="card">

    <div class="section">
      <div class="sec-row">
        <div class="s-icon g">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A5A40" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <span class="sec-lbl">Customer Information</span>
      </div>
      <table class="info">
        <tr><td>Full Name</td><td>${data.firstName} ${data.lastName}</td></tr>
        <tr><td>Phone</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
        <tr><td>Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td>Address</td><td>${data.address}</td></tr>
      </table>
    </div>

    <div class="section">
      <div class="sec-row">
        <div class="s-icon b">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4361EE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        </div>
        <span class="sec-lbl">Device Information</span>
      </div>
      <table class="info">
        <tr><td>Brand</td><td>${data.brand}</td></tr>
        ${data.subcategory ? `<tr><td>Type</td><td>${data.subcategory}</td></tr>` : ''}
        <tr><td>Model</td><td>${data.model}</td></tr>
        <tr><td>Repair</td><td>${data.repairType}${data.isCustomRepair ? '<span class="ctag">CUSTOM</span>' : ''}</td></tr>
      </table>
    </div>

    <div class="section">
      <div class="sec-row">
        <div class="s-icon a">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B45309" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <span class="sec-lbl">Appointment Preference</span>
      </div>
      <table class="info">
        <tr><td>Date</td><td>${data.preferredDate}</td></tr>
        <tr><td>Time</td><td>${data.preferredTime}</td></tr>
      </table>
    </div>

    <div class="action-row">
      <p class="ar-label">Quick response options</p>
      <div class="ar-btns">
        <a href="tel:${data.phone}" class="ab p">📞 Call Now</a>
        <a href="mailto:${data.email}?subject=Re: Your MobileBitX Repair Booking (${ref})&body=Hello ${data.firstName},%0D%0A%0D%0AThank you for booking with MobileBitX." class="ab o">✉️ Email Customer</a>
      </div>
    </div>

  </div>

  <div class="footer">
    <p>
      © 2025 MobileBitX · Internal Admin Notification<br>
      This email contains customer personal data — do not forward or share.<br>
      Sent automatically when a new repair booking is submitted.
    </p>
  </div>

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

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS
    }
  });

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"MobileBitX" <${process.env.GMAIL_USER}>`,
        to: `${data.firstName} ${data.lastName} <${data.email}>`,
        subject: '✓ Your Repair Booking is Confirmed — MobileBitX',
        html: buildCustomerEmail(data)
      }),
      transporter.sendMail({
        from: `"MobileBitX Bookings" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: data.email,
        subject: `New Booking — ${data.brand} ${data.model} · ${data.firstName} ${data.lastName}`,
        html: buildAdminEmail(data)
      })
    ]);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Email error:', err.message);
    return res.status(500).json({ error: 'Failed to send emails.' });
  }
};
