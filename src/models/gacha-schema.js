module.exports = (db) => {
  const schema = db.Schema({
    userId: String,
    userName: String,
    prize: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  return db.models.Gacha || db.model('Gacha', schema);
};
