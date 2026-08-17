/**
 * Maple VC — Founder Survey → Google Sheet webhook.
 *
 * Setup:
 *  1. Create (or open) the Google Sheet where you want responses to land.
 *  2. In the Sheet, go to Extensions → Apps Script.
 *  3. Delete any placeholder code and paste in this whole file.
 *  4. Click Deploy → New deployment → type "Web app".
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  5. Click Deploy, authorize when prompted, and copy the Web App URL.
 *  6. Paste that URL into SHEET_WEBHOOK_URL in founder-survey.html.
 *
 * Every submission appends one row. The first request also writes a
 * header row if the sheet is empty.
 */

var COLUMNS = [
  'timestamp',
  'stage',
  'edge',
  'weakness',
  'brutally_honest',
  'helpfulness_score',
  'hurdle',
  'next_hire',
  'support_needed_1',
  'support_needed_2',
  'support_needed_3',
  'support_other',
  'raising_status',
  'raise_stage',
  'raise_support_1',
  'raise_support_2',
  'raise_support_3',
  'raise_targets',
  'perks_1',
  'perks_2',
  'perks_3',
  'perks_other',
  'portal_features_1',
  'portal_features_2',
  'portal_features_3',
  'portal_ignore',
  'event_interest',
  'newsletter_interest',
  'team_feedback',
  'magic_wand',
  'contact_email'
];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (key) {
      return key === 'timestamp' ? 'Timestamp' : key;
    }));
  }

  var params = e.parameter || {};

  var row = COLUMNS.map(function (key) {
    if (key === 'timestamp') return new Date();
    return params[key] || '';
  });

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
