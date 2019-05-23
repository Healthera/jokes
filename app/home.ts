import request from "request";

/**
 * Setup home page. Displays a random joke on page load
 *
 * @param app - Express application instance
 * @param apiFullPath - Root path to access APIs
 */
export const setup = (app, apiFullPath): void => {
    /**
     * Calls out to the get jokes api
     * @param pageNumber - Result page number
     * @param pageSize - Number of results per page
     * @param sorting - Sorting string
     * @param tag - Filters by the given tag to scope the result set
     * @param callback - Takes a callback function to pass back the jokes or an error
     */
    const getJokes = (pageNumber: number,
                      pageSize: number,
                      sorting: string,
                      tag: ITag,
                      callback: (jokes: IMultipleResource, error: string) => void): void => {
        const requestOptions = {
            qs: {
                pageNumber,
                pageSize,
                sorting,
                tag,
            },
            url: apiFullPath + "/jokes",
        };
        request.get(requestOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                try {
                    const result: IMultipleResource = JSON.parse(body);
                    if (result.resultCount > 0) {
                        callback(result, null);
                    } else {
                        callback(null, "No jokes found");
                    }
                } catch (err) {
                    callback(null, "Error parsing jokes list");
                }
            } else {
                callback(null, error ? error.toString() : "Received unexpected response");
            }
        });
    };

    /**
     * Calls out to the get joke by id api
     * @param id - The id of the joke to retrieve
     * @param callback - Takes a callback function to pass back the joke or an error
     */
    const getJoke = (id: string, callback: (joke: IJoke, error: string) => void): void => {
        request.get(apiFullPath + "/jokes/" + id, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                try {
                    const result: IJoke = JSON.parse(body);
                    callback(result, null);
                } catch (err) {
                    callback(null, "Error parsing joke");
                }
            } else {
                callback(null, error ? error.toString() : "Unable to get joke");
            }
        });
    };

    /**
     * Calls the get jokes api with random sorting then fetches the joke details for the first result
     * @param tag - Only return jokes for the given tag type
     * @param callback - Takes a callback function to pass back the random joke or an error
     */
    const getRandomJoke = (tag: ITag, callback: (joke: string, error: string) => void): void => {
        getJokes(0, 1, "random:ASC", tag, (jokes, jokesError) => {
            if (jokesError == null) {
                const id = jokes.results[0].id;
                getJoke(id, (joke, jokeError) => {
                    if (jokeError == null) {
                        callback(joke.punchline, null);
                    } else {
                        callback(null, jokeError);
                    }
                });
            } else {
                callback(null, jokesError);
            }
        });
    };

    /**
     * Define the entry point for the random joke homepage
     */
    app.get("/home", (req, res) => {
        getRandomJoke(null, (joke, error) => {
            console.log("Getting random joke...");
            if (error == null) {
                res.send("A random joke for you: <i>" + joke + "</i>");
            } else {
                res.send("Whoops! We're fresh out of jokes right now, try again later.");
                console.log(error);
            }
        });
    });
};
