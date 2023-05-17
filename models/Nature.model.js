const { Schema, model } = require("mongoose");

const natureSchema = new Schema(
  // Info that is going to be prompt
  {
    title: String,
    country: String,
    continent: String,
    description: String,
    imageUrl: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },

  //MongoDB Options
  {
    timestamps: true,
  }
);

const Nature = model("Nature", natureSchema);
module.exports = Nature;
