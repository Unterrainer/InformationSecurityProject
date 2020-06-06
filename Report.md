# Information Security Project

List of content:
 - Introduction
 - Hospital Management System 4.0
 - Vulnerabilities
    - No security modifications on database
    - XSS attacks
- Damage for clients 


 ## Introduction
 The aim of this project is to show how to hack the "Hospital Management System 4.0" whit basic knowledge of:
 - HTML
 - JavaScript
 - MySql
 - XSS-Attacks
To see how to get started please have a look at the "instructions.md" file.


## Hospital Management System 4.0
phpgurukul:
> Hospital Management System is a web application for the hospital which manages doctors and patients.

The sofware is based on php and uses a My SQL database.
The software offers 3 different modules which are the following:
- Admin module
- User module
- Doctor module

Each module has access to different tasks which are important for every hospital.
One of the most importan tasks is the ability to store personal informations of each patient.
This data is the most interesting data for hackers.

## Vulnerabilities of the Software

### No security modifications on database
We already encounter the first vulnerability in the software when we set up the software. 
As you may have noticed, you were not asked to change the security settings at any stage of 
the database setup. So it is possible for everyone on the installation server to read the database 
data with simple SQL scripts.
Due to this security hole it is possible to perform any action, e.g. change the admin password, 
read out the patient data or delete the entire data. 
To perform such actions it is sufficient to connect to the database with the standard authentication data:
- Username: "root"
- Password: ""

#### Examples

##### Create database connection
The following piece of code shows how to create a databse connection in javaScript.
All you need to know for this are the standard authentication data and the name of the 
database which we know already from the setup.
``` javaScript
function getDatabaseConnection() {
	const mysql = require('mysql');

	return mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "hms"
	});
}
```
##### Execute a SQL query
The following code shows how to execute a SQL query.
In addition to it if the flag "open" is set to true it opens
the browser with the link to one of the vulnerable sites.
An example for a query could be:
"SELECT password FROM admin".
``` javaScript
function executeQuery(sql, open = false) {
	const con = getDatabaseConnection();
	con.connect(function (err) {
		if (err) console.log("There went somthing wrong! Please try again!", newLine);
		con.query(sql, function (err, result) {
			if (err) console.log("There went somthing wrong! Please try again!", newLine);
			if (open) {
				var opn = require('opn');
				opn('http://localhost/hospital/hms/admin/doctor-specilization.php');
			}
			else
				console.log(result)
			main();
		});
	});
}
```
#### Solution
The solution to this problem is quit simple.
It would be enough to show the user how to set up the security settings of the databse
and how to change this settings also in the given php project.
An other solution would be to provide a service which sets up the environment for the client.

### XSS Attacks
Most of the input fields of the software are vulnerable to XSS attacks.
One of this fields is the field "doctorspecilization". Using basic knowledge of XSS attacks, html tables and javaScript
you are able to add a XSS atack to the database.

xx Continue here

### Damage for clients



https://github.com/Unterrainer/InformationSecurityProject.git
