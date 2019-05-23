import uuidv4 from "uuid/v4";

interface IJokeApis {
    create: (joke: IJokeCreateRequest) => ISingleResource;
    get: (id: string) => IJoke;
    list: (paginationOptions: IPaginationOptions, tag: ITag) => IMultipleResource;
    update: (id: string, joke: IJokeUpdateRequest) => boolean;
    remove: (id: string) => boolean;
}

/**
 * Defines the backend logic for the joke apis
 */
export const jokeApis = (db): IJokeApis => {
    // TODO convert to callback. Support errors

    /**
     * Create a new joke
     * @param joke - Details about a joke
     */
    const create = (joke: IJokeCreateRequest): ISingleResource => {
        const insertStatement = "INSERT INTO tbl_jokes (id, punchline, tag) VALUES (:id, :punchline, :tag);";
        const res = db.exec(insertStatement + "SELECT :id;", {id: uuidv4(), punchline: joke.punchline, tag: joke.tag});
        return {id: res[1][0].$id};
    };

    /**
     * Get a specific joke
     * @param id - The ID of the joke to get
     */
    const get = (id: string): IJoke => {
        let res = db.exec("SELECT * FROM tbl_jokes WHERE id = :id", {id});
        if (res.length > 0) {
            res = res[0];
            return {
                createdAt: res.created_at,
                id: res.id,
                modifiedAt: res.modified_at,
                punchline: res.punchline,
                tag: res.tag,
            };
        }
    };

    /**
     * Get a list of joke ids
     * @param paginationOptions - Options to configure pagination
     * @param tag - Joke tag to filter by
     */
    const list = (paginationOptions: IPaginationOptions, tag): IMultipleResource => {
        const pagination = "LIMIT " + paginationOptions.pageSize + " OFFSET " + paginationOptions.pageNumber;
        const sort = "UUID()"; // TODO utilise sorting parameters
        const dir = "ASC";

        // TODO sanitise input
        const whereClause = tag !== undefined || "" ? "WHERE tag = '" + tag + "' " : "";
        const orderClause = sort != null ? "ORDER BY " + sort + " " + dir + " " : "";

        // TODO combine into one query
        const count = db.exec("SELECT COUNT(*) FROM tbl_jokes " + whereClause + orderClause);
        const res = db.exec("SELECT id FROM tbl_jokes " + whereClause + orderClause + pagination);
        return {
            resultCount: count[0]["COUNT(*)"],
            results: res,
        };
    };

    /**
     * Update an existing joke
     * @param id - Identifier of the joke to update
     * @param joke - Update information
     */
    const update = (id: string, joke: IJokeUpdateRequest): boolean => {
        // TODO - implement update
        return false;
    };

    /**
     * Remove a joke
     * @param id - The id of the joke to remove
     */
    const remove = (id: string): boolean => {
        return !!db.exec("DELETE FROM tbl_jokes WHERE id = :id", {id});
    };

    return {
        create,
        get,
        list,
        remove,
        update,
    };
};
