import alasql from "alasql";

/**
 * Create a new AlaSql database. Initialise jokes table and import seed data from CSV
 */
export const setup = () => {
    // @ts-ignore
    const db = new alasql.Database();

    db.exec("CREATE TABLE tbl_jokes (" +
        "id VARCHAR(36) NOT NULL DEFAULT UUID(), " +
        "punchline VARCHAR(200) NOT NULL, " +
        "tag VARCHAR(30), " +
        "created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
        "modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");

    alasql.promise('SELECT * FROM CSV("jokes.csv", {headers:false})')
        .then((data) => {
            data.map((item) => {
                db.exec("INSERT INTO tbl_jokes (punchline, tag) VALUES (?, \"\")", item);
            });
            console.log("Database seeded");
        }).catch((err) => {
        console.log("Error:", err);
    });

    return db;
};
