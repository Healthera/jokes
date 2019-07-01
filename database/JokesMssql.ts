const mssql = require("mssql/msnodesqlv8");
import Joke from "./Joke";
import JokeUpdate from "./JokeUpdate";

class JokesMssql {
    private pool = undefined;

    constructor() { // Dummy. Could use async constructor but would need to check the error handling

    }

    /*
     * Function: 	dbSetup()
     * Parameters: 	String array of jokes, database host, name, username, password

     * Returns:		Nothing
     * Description:	Connect to database, if needed create table and populate from CSV array
     */
    public async dbSetup(jokes: string[],
                         pHostname: string, pDatabase: string, pUser: string, pPassword: string) {

        let sql = "";
        try {
            await this.mssqlDbConnect(pHostname, pDatabase, pUser, pPassword);
            let request = new mssql.Request(this.pool);
            sql = "IF OBJECT_ID (N'jokes', N'U') IS NULL\n" +
                "   CREATE TABLE jokes (\n" +
                "   idx        INTEGER 	        NOT NULL,\n" +
                "   joke       VARCHAR(200) 	NOT NULL,\n" +
                "   category   VARCHAR(30) 	    NOT NULL,\n" +
                "   PRIMARY KEY (idx))";
            await request.query(sql);

            sql = "SELECT COUNT(joke) AS num_jokes FROM jokes";
            let request2 = new mssql.Request(this.pool);
            let recordset = await request2.query(sql);
            if (recordset && recordset.recordset && recordset.recordset[0] &&
                recordset.recordset[0].num_jokes === 0) {
                sql = "INSERT INTO jokes(idx, joke, category) VALUES (@idx, @joke, 'Funny')";
                let request3 = new mssql.Request(this.pool);
                for (let i = 0; i < jokes.length; i++) {
                    if (jokes[i] && jokes[i] !== "") {
                        await request3.input("idx", mssql.Int, (i + 1)).
                                       input("joke", mssql.NVarChar, jokes[i]).
                                       query(sql);
                    }
                }
            }
        }
        catch (err) {
            console.error("dbSetup() SQL> " + sql + "\nError: " + JSON.stringify(err));
            process.exit(1);
        }
    }

    /*
     * Function: 	createJoke()
     * Parameters: 	Joke interface
     * Returns:		Nothing
     * Description:	Create joke
     */
    public async createJoke(joke: Joke) {

        let sql = "";
        try {
            this.validateJoke(joke);
            let request = new mssql.Request(this.pool);
            sql = "INSERT INTO jokes(idx, joke, category) VALUES (@idx, @joke, 'Funny')";
            await request.input("idx", mssql.Int, joke.index).
                          input("joke", mssql.NVarChar, joke.joke).
                          input("category", mssql.NVarChar, joke.category).
                          query(sql);
        }
        catch (err) {
            this.handleSQLError("getJoke()", sql, err);
        }
    }

    /*
     * Function: 	getJoke()
     * Parameters: 	None
     * Returns:		Nothing
     * Description:	Get a random joke
     */
    public async getJoke() {

        let sql = "";
        try {
            let request = new mssql.Request(this.pool);
            // This SQL will not work acceptabley if you have millions of jokes
            sql = "SELECT TOP 1 idx, joke, category FROM jokes WHERE joke != '' ORDER BY NEWID()";
            let res = await request.query(sql);
            let recordset = res.recordset;
            let joke: Joke;
            if (recordset && recordset[0] && recordset[0].idx &&
                recordset[0].joke && recordset[0].category) {
                joke = {
                    category: recordset[0].category,
                    index: recordset[0].idx,
                    joke: recordset[0].joke
                };
            }
            else if (!recordset) {
                throw new Error("(no recordset returned");
            }
            else {
                throw new Error("(no rows returned; recordset: " + JSON.stringify(recordset, null, 4));
            }
            return joke;
        }
        catch (err) {
            this.handleSQLError("getJoke()", sql, err);
        }
    }

    /*
     * Function: 	getJokes()
     * Parameters: 	None
     * Returns:		Joke interface array
     * Description:	Get all jokes
     */
    public async getJokes() {

        let sql = "";
        try {
            let request = new mssql.Request(this.pool);
            sql = "SELECT idx, joke, category FROM jokes ORDER BY idx";
            let res = await request.query(sql);
            let recordsets = res.recordsets;
            if (recordsets === undefined) {
                recordsets = res.recordset; // 1 row
            }
            let jokes: Joke[] = [];
            if (recordsets && recordsets[0]) {
                for (let i = 0; i < recordsets[0].length; i++) {
                    let joke: Joke;
                    joke = {
                        category: recordsets[0][i].category,
                        index: recordsets[0][i].idx,
                        joke: recordsets[0][i].joke
                    };
                    jokes.push(joke);
                }
            }
            else if (!recordsets) {
                throw new Error("(no recordsets returned");
            }
            else {
                throw new Error("(no rows returned; recordset: " + JSON.stringify(recordsets, null, 4));
            }
            return jokes;
        }
        catch (err) {
            this.handleSQLError("getJokes()", sql, err);
        }
    }

    /*
     * Function: 	updateJoke()
     * Parameters: 	Joke interface
     * Returns:		Nothing
     * Description:	Update joke using index
     */
    public async updateJoke(jokeUpdate: JokeUpdate) {

        let sql = "";
        try {
            this.validateUpdate(jokeUpdate);
            let request = new mssql.Request(this.pool);
            sql = "UPDATE jokes SET " + jokeUpdate.column + "=@newValue WHERE idx=@idx";
            await request.input("idx", mssql.Int, jokeUpdate.index).
                          input("newValue", mssql.NVarChar, jokeUpdate.newValue).
                          query(sql);
        }
        catch (err) {
            this.handleSQLError("updateJoke()", sql, err);
        }
    }

    /*
     * Function: 	deleteJoke()
     * Parameters: 	Joke interface
     * Returns:		Nothing
     * Description:	Delete joke using index
     */
    public async deleteJoke(joke: Joke) {

        let sql = "";
        try {
            this.validateIndex(joke);
            let request = new mssql.Request(this.pool);
            sql = "DELETE FROM jokes WHERE idx=@idx";
            await request.input("idx", mssql.Int, joke.index).
                          query(sql);
        }
        catch (err) {
            this.handleSQLError("deleteJoke(); joke: " + JSON.stringify(joke),
                sql, err);
        }
    }

    /*
     * Function: 	mssqlDbConnect()
     * Parameters: 	database host, name, username, password
     * Returns:		Nothing
     * Description:	Connect to database, ...
     */
    private async mssqlDbConnect(pHostname, pDatabase, pUser, pPassword) {
        let start = new Date().getTime();

        let config = {
            database: undefined,
            driver: "msnodesqlv8",
            options: {
                appName: "jokes APP",
                encrypt: false,
                trustedConnection: false,
                useUTC: true
            },
            password: undefined,
            requestTimeout: 300000, // 5 mins. Default 15s per SQL statement
            server: pHostname,
            user: undefined
        };
        if (pDatabase !== undefined && pDatabase !== "") {
            config.database = pDatabase;
        }
        if (pUser && pUser !== "") {
            config.user = pUser;
            if (pPassword && pPassword !== "") {
                config.password = pPassword;
            }
            else {
                throw new Error("Could not connect to SQL server client no password specified for user: " + pUser);
            }
        }
        else {
            config.options.trustedConnection = true;
        }
        console.log("About to connected to SQL server using: " + JSON.stringify(config, null, 4));

        // Connect to SQL server database
        try {
            this.pool = new mssql.ConnectionPool(config);
            await this.pool.connect();
            console.log("Connected.");
        }
        catch (err) {
            throw new Error("Exception connecting to SQL server client using: " + JSON.stringify(config, null, 4) +
                "; error: " + JSON.stringify(err));
        }
    }

    /*
     * Function: 	validateIndex()
     * Parameters: 	Joke interface
     * Returns:		Nothing
     * Description:	Validate joke to check index is defined and >0
     */
    private validateIndex(joke: Joke) {
        if (joke === undefined) {
            throw new Error("Undefined Joke");
        }
        else if (joke.index === undefined || joke.index < 1) {
            throw new Error("Invalid index: " + joke.index);
        }
        else { // OK
        }
    }

    /*
     * Function: 	validateJoke()
     * Parameters: 	Joke interface
     * Returns:		Nothing
     * Description:	Validate joke to check index is defined and >0;
     *              and joke and category are defined
     */
    private validateJoke(joke: Joke) {
        if (joke === undefined) {
            throw new Error("Undefined Joke");
        }
        else if (joke.index === undefined || joke.index < 1) {
            throw new Error("Invalid index: " + joke.index);
        }
        else if (joke.joke === undefined) {
            throw new Error("Undefined joke");
        }
        else if (joke.category === undefined) {
            throw new Error("Undefined category");
        }
        else { // OK
        }
    }

    /*
     * Function: 	validateUpdate()
     * Parameters: 	JokeUpdate interface
     * Returns:		Nothing
     * Description:	Validate joke update to check index is defined and >0;
     *              and column and newValue are defined
     */
    private validateUpdate(jokeUpdate: JokeUpdate) {
        if (jokeUpdate === undefined) {
            throw new Error("Undefined Joke");
        }
        else if (jokeUpdate.index === undefined || jokeUpdate.index < 1) {
            throw new Error("Invalid index: " + jokeUpdate.index);
        }
        else if (jokeUpdate.column === undefined) {
            throw new Error("Undefined column");
        }
        else if (jokeUpdate.newValue === undefined) {
            throw new Error("Undefined newValue");
        }
        else { // OK
        }
    }

     /*
     * Function: 	handleSQLError()
     * Parameters: 	Function name, SQL statement, Error object
     * Returns:		Nothing (throws exception)
     * Description:	Handle SQL error - print and throw
     */
    private handleSQLError(functionName: string, sql: string, err: Error) {
        let msg: string = functionName + "SQL>" + sql + "\nError: " + JSON.stringify(err);
        console.error(msg);
        throw new Error(msg);
    }

};

export default JokesMssql;
