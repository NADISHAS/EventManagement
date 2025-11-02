import { DataTypes } from 'sequelize';

export default function (sequelize) {
  return sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.STRING },
    venue: { type: DataTypes.STRING },
    mode: { type: DataTypes.ENUM('online', 'offline'), allowNull: false, defaultValue: 'online' },
    maxAttendees: { type: DataTypes.INTEGER, defaultValue: 0 },
    fee: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.0 },
    imageUrl: { type: DataTypes.STRING },
    createdBy: { type: DataTypes.INTEGER }
  }, { timestamps: true, tableName: 'events', underscored: true });
}
