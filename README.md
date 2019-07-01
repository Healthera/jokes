# Peter Hambly Healthera Challenge

## Getting started

* Install node packages
* Compile Typescript and run `index.js` or alternatively run `npx ts-node index.ts`

## Application

* You will need to edit ```index.ts``` to setup the SQL Server connection.
  Only username and password authentication is supported
  ```
        // Change these to the SQL server database of choice.
        // user needs create table privilege
        let pHostname: string = "localhost";
        let pDatabase: string = "sahsuland";
        let pUser: string = "XXXXXX";
        let pPassword: string = "YYYYYYY";
  ```
  The user needs create table privilege to populate the table
  
* The main application runs at: http://localhost:3050/jokesApp
  The user can:

  * Filter by joke text or category. By default all jokes are assumed to be funny.
  * Add new jokes
  * Edit existing jokes
  * Delete a joke

    ![alt text](https://github.com/peterhambly/jokes/tree/filter/challenge.pPNG "Peter Hambly jokes challenge")

## Limitations

For discussion:

* No save/undo
* No server object
* Not fully linted
* No test harness 
* No interface definitions
* No logon

## Time taken

2 days

Peter Hambly
1st July 2019