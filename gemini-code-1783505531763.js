function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents); // แปลง JSON ที่ถูกส่งมา
  var timestamp = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
  var dateStr = timestamp.split(' ')[0];
  var timeStr = timestamp.split(' ')[1];
  
  // วนลูปเพื่อนำสมาชิกทุกคนบันทึกลง Sheet เรียงตามแถว
  for (var i = 0; i < data.members.length; i++) {
    var member = data.members[i];
    // โครงสร้างที่ Dashboard คาดหวัง: วันที่ | เวลา | URL | ห้อง | เลขที่ | ชื่อ | นามสกุล
    sheet.appendRow([
      dateStr, 
      timeStr, 
      data.url, 
      member.room, 
      member.number, 
      member.name, 
      member.surname
    ]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
}