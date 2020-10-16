require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  },
  test: {
    url: process.env.DB_URL,
    database: "database_test",
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
}
