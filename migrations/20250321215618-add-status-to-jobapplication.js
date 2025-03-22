// migrations/20250322-add-status-to-jobapplications.js

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("JobApplications", "status", {
    type: Sequelize.ENUM("pending", "rejected", "accepted"),
    allowNull: false,
    defaultValue: "pending",
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("JobApplications", "status");

  // Remove the ENUM type separately if you're using Postgres
  if (queryInterface.sequelize.getDialect() === "postgres") {
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_JobApplications_status";`
    );
  }
}
