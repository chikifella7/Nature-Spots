const router = require("express").Router();
const Nature = require("../models/Nature.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const cloudinary = require("cloudinary").v2;
const fileUploader = require("../config/cloudinary.config");
const isLoggedIn = require("../middleware/isLoggedIn");

//EDIT PROFILE ROUTES

router.get("/profile", async (req, res) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("profile.hbs", { user });
  } catch (error) {
    console.error(error);
  }
});

router.get("/edit-profile", (req, res) => {
  res.render("edit-profile.hbs");
});

router.post("/edit-profile", async (req, res) => {
  try {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { email, username },
      { new: true }
    );

    res.redirect(`/profile`);
  } catch (error) {
    console.log(error);
  }
});

//FAVORITE ROUTES
//GET	/private/favorites	Private route. Render the favorites view.

/*router.get("/favorites", (req, res) => {
  res.render("spots/spot-favorites.hbs");
});*/

router.get("/favorites", async (req, res) => {
  try {
    const userId = req.session.currentUser._id; // Replace with your actual code to retrieve the user ID
    const user = await User.findById(userId).populate("favorites");

    res.render("spots/spot-favorites.hbs", { favorites: user.favorites });
  } catch (error) {
    console.log(error);
  }
});

//POST	/private/favorites/	Private route. Adds a new favorite for the current user.	{ name, country, city}
/*router.post("/favorites", async (req, res) => {
  try {
    const { spotId } = req.body;
    const newFavorite = await Nature.findById(spotId);

    // Add the newFavorite to the user's favorites list or perform any other desired action

    res.redirect("/favorites");
  } catch (error) {
    console.log(error);
  }
});*/
router.post("/favorites", async (req, res) => {
  try {
    const { spotId } = req.body;
    const favoriteSpot = await Nature.findById(spotId);

    if (!favoriteSpot) {
      return res.render("error.hbs", { error: "Spot not found" });
    }

    const userId = req.session.currentUser._id; // Replace with your actual code to retrieve the user ID
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: favoriteSpot },
    });

    res.redirect("/favorites");
  } catch (error) {
    console.log(error);
    return res.render("error.hbs", { error: "Internal server error" });
  }
});

// DELETE /favorites/:id - Private route. Deletes a favorite by ID
/*router.delete("/favorites/:id", async (req, res) => {
  try {
    const favoriteId = req.params.id;
    await Nature.findByIdAndRemove(favoriteId);

    res.redirect("/favorites");
  } catch (error) {
    console.log(error);
  }
});*/
router.post("/favorites/:id/delete", async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const userId = req.session.currentUser._id; // Replace with your actual code to retrieve the user ID

    await User.findByIdAndUpdate(userId, { $pull: { favorites: favoriteId } });

    res.redirect("/favorites");
  } catch (error) {
    console.log(error);
    return res.render("error.hbs", { error: "Internal server error" });
  }
});

//NATURE SPOT ROUTE AND RECOMMENDED
//GET	/nature-spots	Renders nature-spots-list view.

router.get("/nature-spots", isLoggedIn, async (req, res) => {
  try {
    // Find all the spots inside the collection
    let allSpotsFromDb = await Nature.find();

    // Render all spots from the DB with the hbs view
    res.render("spots/spot-list.hbs", { spots: allSpotsFromDb });
  } catch (error) {
    console.log(error);
  }
});

//GET	/nature-spots/recommended	Renders a recommended nature spots by crontributors.
router.get("/nature-spots/recommended", (req, res) => {
  res.render("nature-spots-recommended.hbs");
});

//REVIEW ROUTES
//POST	/private/favorites/review/:id	Private route. Adds a new review for the current user.

/*router.post("/nature-spots/review", async (req, res) => {
  try {
    const { review, rating } = req.body;
    await Review.create(
      req.session.currentUser._id ,
      { review, rating },
      { new: true }
    );
    res.redirect("/nature-spots");
  } catch (error) {
    console.log(error);
  }
});*/

router.post("/nature-spots/review", async (req, res) => {
  try {
    const { spotId, content, rating } = req.body;
    const spot = await Nature.findById(spotId);

    const newReview = await Review.create({
      content,
      rating,
      author: req.session.currentUser._id,
    });

    spot.reviews.push(newReview);
    await spot.save();

    res.redirect(`/nature-spots/details/${spotId}`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/nature-spots/details/:id", async (req, res) => {
  try {
    const spotId = req.params.id;
    const spot = await Nature.findById(spotId).populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
      },
    });

    res.render("spots/spot-details.hbs", { spot });
  } catch (error) {
    console.log(error);
  }
});

//GET	private/nature-spots/review/update/:id	Private route. Renders a form to update reviews.

/*router.get("/nature-spots/review/update/:id", (req, res) => {
  res.render("nature-spots-review-update.hbs");
});
//POST	/private/favorites/review/update/:id	Private route. Updates review for the current user.

router.post("/nature-spots/review/update/:id", async (req, res) => {
  try {
    const { review, rating } = req.body;
    await Review.findByIdAndUpdate(
      req.session.currentUser._id ,
      { review, rating },
      { new: true }
    );
    res.redirect("/nature-spots");
  } catch (error) {
    console.log(error);
  }
});*/

// GET /nature-spots/review/update/:id - Renders a form to update a review
router.get("/nature-spots/review/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    res.render("review-update.hbs", { review });
  } catch (error) {
    console.log(error);
  }
});

// POST /nature-spots/review/update/:id - Updates a review
router.post("/nature-spots/review/:id/update", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { content, rating } = req.body;

    await Review.findByIdAndUpdate(reviewId, { content, rating });

    // Redirect back to the nature spot details page
    res.redirect(`/nature-spots/details/${reviewId}`);
  } catch (error) {
    console.log(error);
  }
});

//NATURE SPOT DETAILS
//GET	/private/nature-spots/details/:id	Renders nature-spots-details view for the particular nature spot details.

router.get("/nature-spots/details/:id", async (req, res) => {
  try {
    const spotId = req.params.id;
    const spot = await Nature.findById(spotId);

    res.render("spots/spot-details.hbs", { spot });
  } catch (error) {
    console.log(error);
  }
});

//CREATE NATURE SPOT ROUTE
// GET /nature-spots/create - Render the create spot form
router.get("/nature-spots/create", (req, res) => {
  res.render("spots/spot-create.hbs");
});

// POST /nature-spots/create - Handle the creation of a new spot
// Add a route for creating a new spot
router.post(
  "/nature-spots/create",
  fileUploader.single("imageUrl"),
  async (req, res) => {
    try {
      const { title, country, continent, description } = req.body;
      /*       const result = await cloudinary.uploader.upload(req.file.path); // upload the image to Cloudinary */

      const newSpot = await Nature.create({
        title,
        country,
        continent,
        description,
        imageUrl: req.file.path,
      }); // save the image URL in the new spot
      res.redirect(`/nature-spots/details/${newSpot._id}`);
    } catch (error) {
      console.log(error);
    }
  }
);

//Delete
router.post("/nature-spots/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNatureSpot = await Nature.findByIdAndDelete(id);

    res.redirect("/nature-spots");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Render the edit spot form
router.get("/nature-spots/edit/:id", async (req, res) => {
  try {
    const spot = await Nature.findById(req.params.id);
    res.render("spots/spot-edit", { spot });
  } catch (error) {
    console.log(error);
  }
});

// Update the spot details
router.post("/nature-spots/edit/:id", async (req, res) => {
  try {
    const { title, country, continent, description, imageUrl } = req.body;
    const spot = await Nature.findByIdAndUpdate(
      req.params.id,
      { title, country, continent, description, imageUrl },
      { new: true }
    );
    res.redirect(`/nature-spots/details/${spot._id}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
