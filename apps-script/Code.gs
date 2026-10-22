/* ================================================
   MILLIE'S - Website form handler (Google Apps Script)
   Runs in the Gmail account milliesevents1@gmail.com. The pickup and
   event forms on milliescandy.com post here; each one is
   emailed to Millie (reply goes straight to the customer)
   and saved as a row in the "Millie's website forms"
   Google Sheet, so nothing is lost if an email is missed.

   Setup: see README "Setting Up Forms".
   ================================================ */

var TO = 'millie@milliescandy.com';
var TZ = 'America/New_York';

var FIELDS = {
  pickup: [
    ['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'],
    ['pickup_date', 'Pickup day'], ['pickup_time', 'Pickup time'],
    ['order_summary', 'Bags']
  ],
  events: [
    ['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'],
    ['event_date', 'Event date'], ['guest_count', 'Guests'],
    ['venue', 'Venue'], ['event_details', 'Details']
  ]
};

function doPost(e) {
  var p = (e && e.parameter) || {};
  // Hidden field only bots fill in: pretend it worked, send nothing
  if (p.website) return reply({ ok: true });

  var kind = FIELDS[p.form] ? p.form : null;
  if (!kind || !p.name || !p.email) return reply({ ok: false, error: 'missing fields' });

  var rows = FIELDS[kind].map(function (f) {
    var v = clean(p[f[0]]);
    if (/_date$/.test(f[0]) && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
      v = Utilities.formatDate(new Date(v + 'T12:00:00'), TZ, 'EEEE, MMMM d, yyyy');
    }
    return [f[1], v];
  });

  var subject = kind === 'pickup'
    ? 'Pickup order: ' + clean(p.name) + ' (' + rows[3][1] + ', ' + rows[4][1] + ')'
    : 'Event inquiry: ' + clean(p.name) + ' (' + rows[3][1] + ')';

  var text = rows.map(function (r) { return r[0] + ': ' + (r[1] || '-'); }).join('\n') +
    '\n\nSent from the ' + (kind === 'pickup' ? 'pickup order' : 'event inquiry') +
    ' form on milliescandy.com. Reply to this email to answer ' + clean(p.name) + '.';

  var html = '<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">' +
    rows.map(function (r) {
      return '<tr><td style="padding:4px 14px 4px 0;color:#7A6D5F;vertical-align:top"><b>' + esc(r[0]) +
        '</b></td><td style="padding:4px 0;white-space:pre-wrap">' + esc(r[1] || '-') + '</td></tr>';
    }).join('') + '</table>' +
    '<p style="font-family:Arial,sans-serif;font-size:12px;color:#888">Sent from milliescandy.com. Reply to this email to answer ' + esc(clean(p.name)) + '.</p>';

  MailApp.sendEmail({ to: TO, replyTo: clean(p.email), subject: subject, body: text, htmlBody: html, name: "Millie's website" });
  save(kind, rows);
  return reply({ ok: true });
}

function save(kind, rows) {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  var book = id ? SpreadsheetApp.openById(id) : null;
  if (!book) {
    book = SpreadsheetApp.create("Millie's website forms");
    props.setProperty('SHEET_ID', book.getId());
  }
  var name = kind === 'pickup' ? 'Pickup orders' : 'Event inquiries';
  var sheet = book.getSheetByName(name);
  if (!sheet) {
    sheet = book.insertSheet(name);
    sheet.appendRow(['Received'].concat(rows.map(function (r) { return r[0]; })));
    sheet.setFrozenRows(1);
    var blank = book.getSheetByName('Sheet1');
    if (blank && book.getSheets().length > 1) book.deleteSheet(blank);
  }
  sheet.appendRow([Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd h:mm a')].concat(rows.map(function (r) { return r[1]; })));
}

/* Run once from the editor (Run > setup) to grant permission and
   send Millie a test email, so the first real order isn't the test */
function setup() {
  MailApp.sendEmail(TO, "Millie's website forms are connected",
    'Pickup orders and event inquiries from milliescandy.com will arrive at this address.');
}

function clean(v) { return String(v == null ? '' : v).trim().slice(0, 4000); }
function esc(v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function reply(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
