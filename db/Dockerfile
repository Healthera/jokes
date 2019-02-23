FROM mongo
COPY jokes.csv /jokes.csv
CMD mongoimport --host db --db jokesDb --collection Jokes --type csv --file /jokes.csv --fields "text.string()"
