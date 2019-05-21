class Joke {
    id = 0;
    text = '';
    creationDate = new Date().toISOString();
    category = '';

    constructor(joke) {
        if (!joke) { return }
        if (joke.id) { this.id = joke.id; }
        if (joke.text) { this.text = joke.text; }
        if (joke.creationDate) { this.creationDate = joke.creationDate; }
        if (joke.category) { this.category = joke.category; }
    }

    toJson() {
        return JSON.stringify(this);
    }
}

module.exports = (joke) => { return new Joke(joke); };
module.exports.status = 'Error: You need to call this module as a function and optionally pass a joke params';