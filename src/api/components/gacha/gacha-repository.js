/* eslint-disable prefer-destructuring */
const db = require('../../../models');

const Gacha = db.Gacha;

async function countUserToday(userId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return Gacha.countDocuments({
    userId,
    createdAt: { $gte: start, $lte: end },
  });
}

async function countPrize(prize) {
  return Gacha.countDocuments({ prize });
}

async function save(data) {
  return Gacha.create(data);
}

async function getWinners() {
  return Gacha.find({ prize: { $ne: null } });
}

async function getHistory(userId) {
  return Gacha.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  countUserToday,
  countPrize,
  save,
  getWinners,
  getHistory,
};
