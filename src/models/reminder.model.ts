import { ReminderModelI } from './../interfaces/reminder.interface'
import { sequelizeConn } from "../config/db";
import { DataTypes } from "sequelize";

export const Reminder = sequelizeConn.define<ReminderModelI>("Reminder", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
  },

  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
