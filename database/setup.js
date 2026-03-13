require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./music_library.db",
  logging: false
});

const Track = sequelize.define("Track", {
  trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  albumName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER
  },
  releaseYear: {
    type: DataTypes.INTEGER
  }
});

async function setupDatabase() {
  try {

    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync();
    console.log("Tables created.");

  } catch (error) {
    console.error("Error:", error);
  } finally {

    await sequelize.close();
    console.log("Connection closed.");
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = { sequelize, Track };