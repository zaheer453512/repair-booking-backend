// api/send-booking.js
// MobileBitX — Vercel Serverless Function
// Gmail SMTP via Nodemailer
// ✅ Table-based email layout — works in ALL email clients (Gmail, Outlook, Apple Mail)

const nodemailer = require('nodemailer');

const LOGO_URL = process.env.LOGO_URL || 'https://cdn.shopify.com/s/files/1/0745/0669/8797/files/mobilebitx.png?v=1776717433';

// ============================================================
// CUSTOMER EMAIL — TABLE BASED
// ============================================================
function buildCustomerEmail(data) {
  const ref = 'MBX-' + Date.now().toString().slice(-6);

  const subcategoryRow = data.subcategory
    ? `<tr>
        <td style="padding:10px 16px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #EAE6E0;width:45%;">Type</td>
        <td style="padding:10px 16px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #EAE6E0;">${data.subcategory}</td>
      </tr>`
    : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Booking Confirmed — MobileBitX</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; background-color: #EDEAE3; }
    a { color: #097F70; text-decoration: none; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .fluid { width: 100% !important; max-width: 100% !important; }
      .mobile-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .stack-col { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#EDEAE3;">

<!-- OUTER WRAPPER -->
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#EDEAE3;">
  <tr>
    <td style="padding:40px 16px 60px;">

      <!-- CONTAINER -->
      <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="580" style="margin:0 auto;">

        <!-- ═══ HEADER ═══ -->
        <tr>
          <td style="background-color:#097F70;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">

            <!-- Logo -->
            <img src="${LOGO_URL}" alt="MobileBitX" width="180" style="max-width:180px;height:auto;display:block;margin:0 auto;">

            <!-- Divider -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr><td style="padding:18px 0 16px;"><div style="border-top:1px solid rgba(255,255,255,0.12);font-size:0;line-height:0;">&nbsp;</div></td></tr>
            </table>

            <!-- Status pill -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
              <tr>
                <td style="background-color:#FFBF00;border-radius:100px;padding:8px 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:7px;">
                        <div style="width:18px;height:18px;background-color:#1C2517;border-radius:50%;text-align:center;line-height:18px;">
                          <img src="https://img.icons8.com/ios-glyphs/18/ffffff/checkmark--v1.png" alt="✓" width="10" height="10" style="display:inline-block;vertical-align:middle;">
                        </div>
                      </td>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:700;color:#1C2517;letter-spacing:0.5px;white-space:nowrap;">Booking Confirmed</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Title -->
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:26px;font-weight:700;color:#FFFFFF;margin:16px 0 6px;letter-spacing:-0.4px;line-height:1.2;">Your Repair is Booked!</p>
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.55);margin:0;">We've received your request and will be in touch soon</p>

          </td>
        </tr>

        <!-- ═══ MAIN CARD ═══ -->
        <tr>
          <td style="background-color:#FFFFFF;padding:36px 40px;" class="mobile-pad">

            <!-- Ref badge -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="background-color:#EFF6EF;border:1px solid #C8DEC9;border-radius:100px;padding:5px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;color:#2C4530;letter-spacing:0.8px;text-transform:uppercase;">
                  REF: ${ref}
                </td>
              </tr>
            </table>

            <!-- Greeting -->
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:18px;font-weight:700;color:#1C2517;margin:18px 0 8px;">Hello ${data.firstName} ${data.lastName},</p>

            <!-- Intro with left border -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="3" style="background-color:#C8DEC9;border-radius:3px;">&nbsp;</td>
                <td style="padding:2px 0 2px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:14px;color:#6B7A62;line-height:1.7;">
                  Thank you for choosing MobileBitX! Your repair booking has been successfully received. Our expert technicians will review your request and reach out within 24 hours to confirm your appointment.
                </td>
              </tr>
            </table>

            <!-- Spacer -->
            <div style="height:28px;">&nbsp;</div>

            <!-- ── DEVICE DETAILS ── -->
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9EAD94;margin:0 0 10px;">Device Details</p>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F7F5EF;border:1px solid #E4DFDA;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #EAE6E0;width:45%;">Brand</td>
                <td style="padding:10px 16px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #EAE6E0;">${data.brand}</td>
              </tr>
              ${subcategoryRow}
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #EAE6E0;">Model</td>
                <td style="padding:10px 16px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #EAE6E0;">${data.model}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #EAE6E0;">Repair Needed</td>
                <td style="padding:10px 16px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #EAE6E0;">${data.repairType}${data.isCustomRepair ? ' <span style="font-size:11px;color:#7A8B70;">(Custom)</span>' : ''}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#7A8B70;font-weight:500;">Price</td>
                <td style="padding:10px 16px;font-size:13px;color:#2C4530;font-weight:700;">Ask for Price</td>
              </tr>
            </table>

            <!-- Spacer -->
            <div style="height:22px;">&nbsp;</div>

            <!-- ── APPOINTMENT ── -->
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9EAD94;margin:0 0 10px;">Appointment Preference</p>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F7F5EF;border:1px solid #E4DFDA;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #EAE6E0;width:45%;">Preferred Date</td>
                <td style="padding:10px 16px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #EAE6E0;">${data.preferredDate}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#7A8B70;font-weight:500;">Preferred Time</td>
                <td style="padding:10px 16px;font-size:13px;color:#1C2517;font-weight:600;">${data.preferredTime}</td>
              </tr>
            </table>

            <!-- Spacer -->
            <div style="height:22px;">&nbsp;</div>

            <!-- ── WHAT NEXT ── -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#EFF6EF;border:1px solid #C8DEC9;border-radius:10px;">
              <tr>
                <td style="padding:20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:8px;">
                        <div style="width:7px;height:7px;background-color:#4E7A54;border-radius:50%;">&nbsp;</div>
                      </td>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:700;color:#2C4530;">What happens next?</td>
                    </tr>
                  </table>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:10px;">
                    <tr><td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:#4A6345;line-height:1.8;padding-left:15px;">&#8250; Our team will carefully review your repair request</td></tr>
                    <tr><td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:#4A6345;line-height:1.8;padding-left:15px;">&#8250; We'll call or email you within 24 hours to confirm</td></tr>
                    <tr><td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:#4A6345;line-height:1.8;padding-left:15px;">&#8250; A personalised price quote will be provided</td></tr>
                    <tr><td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;color:#4A6345;line-height:1.8;padding-left:15px;">&#8250; Your device will be handled by our certified technicians</td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Spacer -->
            <div style="height:22px;">&nbsp;</div>

            <!-- ── DISCOUNT BANNER ── -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#097F70;border-radius:10px;">
              <tr>
                <td style="padding:24px;text-align:center;">
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:18px;margin:0 0 8px;">&#127881;</p>
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;font-weight:700;color:#FFFFFF;margin:0 0 6px;">Exclusive Offer for MobileBitX Customers</p>
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.65);line-height:1.6;margin:0 0 14px;">
                    Enjoy <strong style="color:#FFFFFF;">5% OFF</strong> on all products in our store &mdash; accessories, refurbished devices &amp; much more!
                  </p>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                    <tr>
                      <td style="background-color:#1C2517;border-radius:20px;padding:8px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:700;color:#A8D4AA;letter-spacing:1px;">
                        5% OFF &mdash; All Products
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Spacer -->
            <div style="height:24px;">&nbsp;</div>

            <!-- ── CTA BUTTON ── -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
              <tr>
                <td style="background-color:#097F70;border-radius:8px;text-align:center;">
                  <a href="https://mobilebitx.com" style="display:inline-block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;padding:13px 34px;letter-spacing:0.2px;">
                    Shop at MobileBitX &rarr;
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ═══ FOOTER ═══ -->
        <tr>
          <td style="background-color:#F2EFE9;border-top:1px solid #E4DFDA;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;" class="mobile-pad">
            <img src="${LOGO_URL}" alt="MobileBitX" width="100" style="max-width:100px;height:auto;display:block;margin:0 auto 14px;opacity:0.5;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 12px;">
              <tr>
                <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;">
                  <a href="https://mobilebitx.com" style="color:#4E7A54;font-weight:500;text-decoration:none;">Website</a>
                  <span style="color:#CDC9C2;padding:0 6px;">&middot;</span>
                  <a href="https://mobilebitx.com/pages/contact" style="color:#4E7A54;font-weight:500;text-decoration:none;">Contact Us</a>
                  <span style="color:#CDC9C2;padding:0 6px;">&middot;</span>
                  <a href="https://mobilebitx.com/policies/terms-of-service" style="color:#4E7A54;font-weight:500;text-decoration:none;">Terms</a>
                </td>
              </tr>
            </table>
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;color:#ADB5A3;line-height:1.8;margin:0;">
              &copy; 2026 MobileBitX &middot; Accessories, Repairs, Refurbished<br>
              This is an automated confirmation &mdash; please do not reply directly.<br>
              For any queries, reach us through our website.
            </p>
          </td>
        </tr>

      </table>
      <!-- END CONTAINER -->

    </td>
  </tr>
</table>
<!-- END OUTER WRAPPER -->

</body>
</html>`;
}

// ============================================================
// ADMIN EMAIL — TABLE BASED
// ============================================================
function buildAdminEmail(data) {
  const ref = 'MBX-' + Date.now().toString().slice(-6);
  const submittedAt = new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' });

  const subcategoryRow = data.subcategory
    ? `<tr>
        <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #F5F2EC;width:130px;">Type</td>
        <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #F5F2EC;">${data.subcategory}</td>
      </tr>`
    : '';

  const emailSubjectEncoded = encodeURIComponent(`Re: Your MobileBitX Repair Booking (${ref})`);
  const emailBodyEncoded = encodeURIComponent(`Hello ${data.firstName},\n\nThank you for booking with MobileBitX. We have reviewed your request and would like to confirm your appointment.\n\nBest regards,\nMobileBitX Team`);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Booking Alert — MobileBitX Admin</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; background-color: #EDEAE3; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-pad { padding-left: 18px !important; padding-right: 18px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#EDEAE3;">

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#EDEAE3;">
  <tr>
    <td style="padding:40px 16px 60px;">

      <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="580" style="margin:0 auto;">

        <!-- ═══ HEADER ═══ -->
        <tr>
          <td style="background-color:#097F70;border-radius:16px 16px 0 0;padding:22px 36px;" class="mobile-pad">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td style="vertical-align:middle;">
                  <img src="${LOGO_URL}" alt="MobileBitX" width="130" style="max-width:130px;height:auto;display:block;">
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.45);margin:5px 0 0;">Admin Notification &middot; Booking Alert</p>
                </td>
                <td style="vertical-align:middle;text-align:right;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-left:auto;">
                    <tr>
                      <td style="background-color:#C2230E;border-radius:100px;padding:7px 16px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="vertical-align:middle;padding-right:6px;">
                              <div style="width:7px;height:7px;background-color:rgba(255,255,255,0.8);border-radius:50%;">&nbsp;</div>
                            </td>
                            <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;color:#FFFFFF;letter-spacing:0.8px;text-transform:uppercase;white-space:nowrap;">New Booking</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══ ALERT BAR ═══ -->
        <tr>
          <td style="background-color:#0B9986;padding:14px 36px;" class="mobile-pad">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td style="vertical-align:middle;">
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;margin:0 0 3px;">New Repair Booking Received</p>
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.55);margin:0;">${submittedAt}</p>
                </td>
                <td style="vertical-align:middle;text-align:right;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-left:auto;">
                    <tr>
                      <td style="background-color:#FFBF00;border-radius:6px;padding:6px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:700;color:#1C2517;letter-spacing:0.8px;white-space:nowrap;">
                        ${ref}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══ MAIN CARD ═══ -->
        <tr>
          <td style="background-color:#FFFFFF;padding:30px 36px;" class="mobile-pad">

            <!-- ── CUSTOMER SECTION ── -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px;">
              <tr>
                <td style="padding-bottom:10px;border-bottom:2px solid #F0EDE6;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:8px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width:28px;height:28px;background-color:#EFF6EF;border-radius:7px;text-align:center;vertical-align:middle;">
                              <img src="https://img.icons8.com/ios/16/3A5A40/user--v1.png" alt="" width="14" height="14" style="display:inline-block;vertical-align:middle;">
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9EAD94;vertical-align:middle;">Customer Information</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr style="border-bottom:1px solid #F5F2EC;">
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;width:130px;border-bottom:1px solid #F5F2EC;">Full Name</td>
                      <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #F5F2EC;">${data.firstName} ${data.lastName}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #F5F2EC;">Phone</td>
                      <td style="padding:10px 12px;font-size:13px;border-bottom:1px solid #F5F2EC;"><a href="tel:${data.phone}" style="color:#097F70;font-weight:600;text-decoration:none;">${data.phone}</a></td>
                    </tr>
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #F5F2EC;">Email</td>
                      <td style="padding:10px 12px;font-size:13px;border-bottom:1px solid #F5F2EC;"><a href="mailto:${data.email}" style="color:#097F70;font-weight:600;text-decoration:none;">${data.email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;">Address</td>
                      <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;">${data.address}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- ── DEVICE SECTION ── -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px;">
              <tr>
                <td style="padding-bottom:10px;border-bottom:2px solid #F0EDE6;">
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9EAD94;margin:0;">Device Information</p>
                </td>
              </tr>
              <tr>
                <td>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;width:130px;border-bottom:1px solid #F5F2EC;">Brand</td>
                      <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #F5F2EC;">${data.brand}</td>
                    </tr>
                    ${subcategoryRow}
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;border-bottom:1px solid #F5F2EC;">Model</td>
                      <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #F5F2EC;">${data.model}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;">Repair</td>
                      <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;">${data.repairType}${data.isCustomRepair ? ' <span style="background:#FEF3C7;color:#92400E;padding:2px 7px;border-radius:4px;font-size:11px;font-weight:700;">CUSTOM</span>' : ''}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- ── APPOINTMENT SECTION ── -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px;">
              <tr>
                <td style="padding-bottom:10px;border-bottom:2px solid #F0EDE6;">
                  <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9EAD94;margin:0;">Appointment Preference</p>
                </td>
              </tr>
              <tr>
                <td>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;width:130px;border-bottom:1px solid #F5F2EC;">Date</td>
                      <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;border-bottom:1px solid #F5F2EC;">${data.preferredDate}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 12px;font-size:13px;color:#7A8B70;font-weight:500;">Time</td>
                      <td style="padding:10px 12px;font-size:13px;color:#1C2517;font-weight:600;">${data.preferredTime}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- ── QUICK ACTIONS ── -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F7F5EF;border-radius:10px;">
              <tr>
                <td style="padding:16px 18px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="vertical-align:middle;">
                        <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#6B7A62;font-weight:500;margin:0;">Quick response options</p>
                      </td>
                      <td style="vertical-align:middle;text-align:right;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-left:auto;">
                          <tr>
                            <td style="background-color:#097F70;border-radius:7px;padding:9px 16px;">
                              <a href="tel:${data.phone}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:600;color:#FFFFFF;text-decoration:none;white-space:nowrap;">&#128222; Call Now</a>
                            </td>
                            <td width="8">&nbsp;</td>
                            <td style="background-color:#FFFFFF;border:1.5px solid #C8DEC9;border-radius:7px;padding:9px 16px;">
                              <a href="mailto:${data.email}?subject=${emailSubjectEncoded}&body=${emailBodyEncoded}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:600;color:#2C4530;text-decoration:none;white-space:nowrap;">&#9993; Email Customer</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ═══ FOOTER ═══ -->
        <tr>
          <td style="background-color:#F2EFE9;border-top:1px solid #E4DFDA;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;" class="mobile-pad">
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;color:#ADB5A3;line-height:1.8;margin:0;">
              &copy; 2026 MobileBitX &middot; Internal Admin Notification<br>
              This email contains customer personal data &mdash; do not forward or share.<br>
              Sent automatically when a new repair booking is submitted.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

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
