import { Model } from "sequelize"

export interface ReminderAttr {
  id?: number
  userId?: number
  description?: string
  date?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface GetAllRemindersAttr {
  after?: Date | number
  user?: number
}

export interface ReminderModelI extends Model<ReminderAttr>, ReminderAttr {}
