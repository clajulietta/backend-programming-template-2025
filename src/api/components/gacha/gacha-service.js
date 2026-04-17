/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const repo = require('./gacha-repository');

class GachaService {
  constructor() {
    this.prizes = [
      { name: 'Emas 10 gram', quota: 1 },
      { name: 'Smartphone X', quota: 5 },
      { name: 'Smartwatch Y', quota: 10 },
      { name: 'Voucher 100k', quota: 100 },
    ];
  }

  async executeGacha(userId, userName) {
    // 🔥 NORMALISASI (WAJIB)
    userId = String(userId).trim();
    userName = String(userName).trim();

    // 🔥 HITUNG JUMLAH GACHA HARI INI
    const total = await repo.countUserToday(userId);

    console.log('USER:', userId, 'TOTAL HARI INI:', total);

    if (total >= 5) {
      throw new Error('Limit gacha habis hari ini (maks 5x)');
    }

    // 🎲 LOGIC GACHA
    const isWin = Math.random() < 0.7;

    let prize = null;

    if (isWin) {
      const rand = Math.floor(Math.random() * this.prizes.length);
      const selected = this.prizes[rand];

      const count = await repo.countPrize(selected.name);

      if (count < selected.quota) {
        prize = selected.name;
      }
    }

    // 💾 SIMPAN KE DB
    await repo.save({
      userId,
      userName,
      prize,
    });

    return prize;
  }

  async getUserHistory(userId) {
    userId = String(userId).trim();

    const data = await repo.getHistory(userId);
    if (!data.length) throw new Error('History kosong');

    return data;
  }

  async getPrizeInventory() {
    const result = [];

    for (const p of this.prizes) {
      const count = await repo.countPrize(p.name);

      result.push({
        name: p.name,
        remaining: p.quota - count,
      });
    }

    return result;
  }

  async getAnonymizedWinners() {
    const winners = await repo.getWinners();

    return winners.map((w) => ({
      user:
        w.userName.slice(0, 2) + '*'.repeat(Math.max(w.userName.length - 2, 0)),
      prize: w.prize,
    }));
  }
}

module.exports = new GachaService();
