'use strict';

const fs = require('fs');

module.exports = {
  up: (queryInterface) => {
    const data = fs.readFileSync('./seeders/jokes.txt', 'utf8');
    const jokes = data.split('\n');

    return queryInterface.bulkInsert('jokes', jokes.reduce((result, joke) => {
      if (joke) result.push({ joke });

      return result;
    }, []), {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('jokes', null, {})
};
