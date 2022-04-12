const express       = require('express'),
      router        = express.Router({ mergeParams: true }),
      { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware'),
      Campground    = require('../models/campground'),
      Review        = require('../models/review'),
      reviews       = require('../controllers/reviews'),
      ExpressError  = require('../utils/ExpressError'),
      catchAsync    = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;