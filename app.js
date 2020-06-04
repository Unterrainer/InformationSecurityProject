// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var url = "http://localhost:80/hospital/hms/admin/doctor-specilization.php";
// var method = "POST";
// var postData = "doctorspecilization=finall&submit=";

// // You REALLY want shouldBeAsync = true.
// // Otherwise, it'll block ALL execution waiting for server response.
// var shouldBeAsync = false;

// var request = new XMLHttpRequest();

// // Before we send anything, we first have to say what we will do when the
// // server responds. This seems backwards (say how we'll respond before we send
// // the request? huh?), but that's how Javascript works.
// // This function attached to the XMLHttpRequest "onload" property specifies how
// // the HTTP response will be handled.
// request.onload = function () {

//    // Because of javascript's fabulous closure concept, the XMLHttpRequest "request"
//    // object declared above is available in this function even though this function
//    // executes long after the request is sent and long after this function is
//    // instantiated. This fact is CRUCIAL to the workings of XHR in ordinary
//    // applications.

//    // You can get all kinds of information about the HTTP response.
//    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
//    var data = request.responseText; // Returned data, e.g., an HTML document.
//    console.log("data", data, "status", status);
// }

// request.open(method, url, shouldBeAsync);

// request.setRequestHeader("Content-Type", "aapplication/x-www-form-urlencoded", "Sec-Fetch-User", "?1");
// // Or... request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
// // Or... whatever

// // Actually sends the request to the server.
// request.send(postData);

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hms"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "select * from admin;";
//   var sql = "INSERT INTO doctorspecilization (id, specilization) VALUES ('315', '</td><script>alert(document.cookie);</script><td>')";
  con.query(sql, function (err, result) {
    if (err) throw err;
	console.log(result);

// opens the url in the default browser
// opn('http://localhost/hospital/hms/admin/doctor-specilization.php');
  });
});
