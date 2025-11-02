import { DataTypes } from 'sequelize';

export default function (sequelize) {
  return sequelize.define('Registration', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('confirmed', 'pending', 'rejected'), defaultValue: 'pending' },
    paymentStatus: { type: DataTypes.ENUM('paid', 'unpaid', 'n/a'), defaultValue: 'n/a' }
  }, { timestamps: true, tableName: 'registrations', underscored: true });
}
