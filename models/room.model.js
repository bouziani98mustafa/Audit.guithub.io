module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Room;
};
