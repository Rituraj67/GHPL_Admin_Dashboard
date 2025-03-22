export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('JobApplications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    introduction: {
      type: Sequelize.TEXT,
    },
    resume: {
      type: Sequelize.STRING, // store file path or URL
    },
    jobId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Jobs', // Name of the referenced table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('JobApplications');
}
