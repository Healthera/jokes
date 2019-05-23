import {jokeApis} from "./jokes";

/**
 * Sets up the joke api routes
 *
 * @param app - Express application instance
 * @param db - AlaSql database instance
 * @param basePath - Base path for all joke apis
 */
export const setup = (app, db, basePath): void => {
    /**
     * @swagger
     * /jokes:
     *   get:
     *     tags:
     *     - "jokes"
     *     produces:
     *       - application/json
     *     description: Returns a list joke ids
     *     parameters:
     *       - in: query
     *         name: pageNumber
     *         required: true
     *         description: The page number to return
     *         schema:
     *           type: integer
     *       - in: query
     *         name: pageSize
     *         required: true
     *         description: The number of results per page
     *         schema:
     *           type: integer
     *       - in: query
     *         name: sorting
     *         required: false
     *         description: Sorting information of the form field:ASC|DESC
     *         schema:
     *           type: integer
     *       - in: query
     *         name: tag
     *         required: false
     *         description: Filter jokes by tag
     *         schema:
     *           type: string
     *           enum:
     *           - Geeky
     *           - Rude
     *           - Seasonal
     *           - Gross
     *           - Puns
     *     responses:
     *       200:
     *         description: Success
     */
    app.get(basePath + "/jokes", (req, res) => {
        const paginationOptions: IPaginationOptions = {
            pageNumber: req.query.pageNumber,
            pageSize: req.query.pageSize,
            sorting: req.query.sorting,
        };
        res.send(jokeApis(db).list(paginationOptions, req.query.tag));
    });

    /**
     * @swagger
     * /jokes/{jokeId}:
     *   get:
     *     tags:
     *     - "jokes"
     *     produces:
     *       - application/json
     *     description: Returns details about a joke
     *     parameters:
     *       - in: path
     *         name: jokeId
     *         required: true
     *         description: Identifier of the joke to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     */
    app.get(basePath + "/jokes/:jokeId", (req, res) => {
        res.send(jokeApis(db).get(req.params.jokeId));
    });

    /**
     * @swagger
     * /jokes:
     *   post:
     *     tags:
     *     - "jokes"
     *     produces:
     *       - application/json
     *     description: Create a joke
     *     parameters:
     *       - in: body
     *         name: body
     *         required: true
     *         schema:
     *           type: sting
     *           properties:
     *             punchline:
     *               type: string
     *             tag:
     *               type: enum
     *               enum:
     *               - Geeky
     *               - Rude
     *               - Seasonal
     *               - Gross
     *               - Puns
     *           required:
     *            - punchline
     *            - tag
     *     responses:
     *       200:
     *         description: Success
     */
    app.post(basePath + "/jokes", (req, res) => {
        res.send(jokeApis(db).create(req.body));
    });

    // TODO - update API

    /**
     * @swagger
     * /jokes/{jokeId}:
     *   delete:
     *     tags:
     *     - "jokes"
     *     produces:
     *       - application/json
     *     description: Deletes a joke
     *     parameters:
     *       - in: path
     *         name: jokeId
     *         required: true
     *         description: Identifier of the joke to delete
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Success, no content
     */
    app.delete(basePath + "/jokes/:jokeId", (req, res) => {
        res.send(jokeApis(db).remove(req.params.jokeId));
    });
};
