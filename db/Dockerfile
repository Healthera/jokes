FROM mongo
COPY jokes.csv /jokes.csv
CMD mongoimport --host db --db jokesDb --collection jokes --type csv --file /jokes.csv --fields "joke.string()"
