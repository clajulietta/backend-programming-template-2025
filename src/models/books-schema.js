module.exports = (db) => {
  const schema = db.Schema({
    title: {
      type: String,
      required: true,
    },
    author: String,
    year: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  return db.models.Books || db.model('Books', schema);
};
