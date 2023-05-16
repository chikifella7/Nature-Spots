const router = require("express").Router();
const Nature = require("../models/Nature.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");

//EDIT PROFILE ROUTES

router.get("/profile", (req, res) => {
  res.render("edit-profile.hbs");
});

router.get("/edit-profile", (req, res) => {
  res.render("edit-profile.hbs");
});

router.post("/edit-profile", async (req, res) => {
  try {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      /* req.session.currentUser._id */
      "64620a41c64586da974e8188",
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

router.get("/nature-spots", async (req, res) => {
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

router.post("/nature-spots/review", async (req, res) => {
  try {
    const { review, rating } = req.body;
    await Review.create(
      /* req.session.currentUser._id */
      "64620a41c64586da974e8188",
      { review, rating },
      { new: true }
    );
    res.redirect("/nature-spots");
  } catch (error) {
    console.log(error);
  }
});
//GET	private/nature-spots/review/update/:id	Private route. Renders a form to update reviews.

router.get("/nature-spots/review/update/:id", (req, res) => {
  res.render("nature-spots-review-update.hbs");
});
//POST	/private/favorites/review/update/:id	Private route. Updates review for the current user.

router.post("/nature-spots/review/update/:id", async (req, res) => {
  try {
    const { review, rating } = req.body;
    await Review.findByIdAndUpdate(
      /* req.session.currentUser._id */
      "64621e05e7dc57cf96a6bd8c",
      { review, rating },
      { new: true }
    );
    res.redirect("/nature-spots");
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
router.post("/nature-spots/create", async (req, res) => {
  try {
    const { name, country, city } = req.body;
    const newSpot = await Nature.create({ name, country, city });
    res.redirect(`/nature-spots/details/${newSpot._id}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
