const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    status: 'Working API',
    message: 'Early stages',
  });
});

module.exports = router;
