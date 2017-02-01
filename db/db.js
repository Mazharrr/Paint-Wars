const Sequelize = require('sequelize')

const name = (process.env.DATABASE_NAME || 'paintArena');

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`;

const db = module.exports = new Sequelize(url, {
  logging: false,
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  }
});
module.exports = db;
