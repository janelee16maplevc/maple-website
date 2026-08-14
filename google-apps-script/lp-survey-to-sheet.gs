/**
 * Maple VC — LP Survey → Google Sheet webhook.
 *
 * Setup:
 *  1. Create (or open) the Google Sheet where you want responses to land.
 *  2. In the Sheet, go to Extensions → Apps Script.
 *  3. Delete any placeholder code and paste in this whole file.
 *  4. Click Deploy → New deployment → type "Web app".
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  5. Click Deploy, authorize when prompted, and copy the Web App URL.
 *  6. Paste that URL into SHEET_WEBHOOK_URL in lp-survey.html.
 *
 * Every submission appends one row. The first request also writes a
 * header row if the sheet is empty.
 */

var COLUMNS = [
  'timestamp',
  'fund_vehicle',
  'edge',
  'weakness',
  'feedback_john',
  'feedback_jane',
  'interests',
  'interests_other',
  'coinvest_interest',
  'coinvest_detail',
  'comparison',
  'reup_drivers',
  'reup_likelihood',
  'recommend_likelihood',
  'anything_else'
];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (key) {
      return key === 'timestamp' ? 'Timestamp' : key;
    }));
  }

  var params = e.parameter || {};
  // Checkboxes with the same "name" arrive as a repeated field; Apps
  // Script's e.parameter only keeps the last one, so pull all values
  // for "interests" from e.parameters instead.
  var interests = (e.parameters && e.parameters.interests) ? e.parameters.interests.join(', ') : (params.interests || '');

  var row = COLUMNS.map(function (key) {
    if (key === 'timestamp') return new Date();
    if (key === 'interests') return interests;
    return params[key] || '';
  });

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
