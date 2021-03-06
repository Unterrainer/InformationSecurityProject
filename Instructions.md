# Instructions

This is a step by step instruction which shows how to start the project.

1. Install nodes and npm. [Download here](https://www.npmjs.com/get-npm)
2. Install git. [Download here](https://www.git-scm.com/downloads)
3. Open terminal and clone the project
```git clone https://github.com/Unterrainer/InformationSecurityProject.git```
4. Install xampp. [Download here](https://www.apachefriends.org/download.html)
5. Download Hospital Management System 4.0. [Download here](https://phpgurukul.com/hospital-management-system-in-php/)
6. Unzip the folder.
7. Cut the folder "hospital" from the unzipped folder and put it into the "htdocs" folder of xampp.
8. Open xampp and start the "Apache"- and "MySQL"- Service.
9. Open phpMyAdmin in the browser [here](https://localhost/phpmyadmin).
10. Create a new database and call it "hms".
11. Import the file "hms.sql" which you find in the folder "SQL File" in the unzipped folder of step 6.
12. Start the program. Open localhost/hospital in a new tab or [click here](https://localhost/hospital/).
13. Login as an admin. Username: ```admin``` Password: ```Test@12345``` (This step is only to see the results of the commands you will execute later)
14. Open terminal and navigate to the cloned repository. (InformationSecurityProject)
15. Install the following modules:
    - prompt-sync ```npm install --save prompt-sync```
    - mysql ```npm install mysql```
    - opn ```npm install opn```
16. Start the project ```node main.js```
17. Have fun.