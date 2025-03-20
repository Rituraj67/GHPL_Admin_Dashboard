export async function up(queryInterface, Sequelize) {
  return queryInterface.removeColumn('Products', 'mrp');
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.addColumn('Products', 'mrp', {
    type: Sequelize.FLOAT, // or Sequelize.INTEGER or Sequelize.STRING based on your old model
    allowNull: true,
  });
}
