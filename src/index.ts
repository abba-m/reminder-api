// create a server with expressJs and listen on port 5000 using es6 syntax
import express from "express";
import dotenv from "dotenv";
import { sequelizeConn } from "./config/db";
import cors from "cors";
import { Reminder } from "./models/reminder.model";
import { Op, WhereOptions } from "sequelize";

import {
  createLogger,
  normalizePort,
  notSupportedHandler,
  serverErrorHandler,
} from "./utils/utils";
import { GetAllRemindersAttr } from "./interfaces/reminder.interface";

const debug = createLogger("ServerSetup");
// load env configs
dotenv.config();

const app = express();
const PORT = normalizePort(process.env.PORT || 5001);

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(
  cors({
    origin: "*",
  }),
);

const route = "/reminders";
const routeWithID = route + "/:id";

// GET: "/reminders"
app.get(route, async (req, res) => {
  const debug = createLogger(`${route}`);
  try {
    const { user, after }: GetAllRemindersAttr = req.query;
    const where: WhereOptions = {};

    if (user) where.userId = user;
    if (after)
      where.date = {
        [Op.gte]: new Date(after),
      };

    const data = await Reminder.findAll({
      where,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["id", "ASC"]],
    });

    return res.status(200).json(data);
  } catch (err) {
    serverErrorHandler(err, res, debug);
  }
});

// GET: "/reminders/:id"
app.get(routeWithID, async (req, res) => {
  const debug = createLogger(`${routeWithID}`);
  try {
    const id = req.params.id;

    const data = await Reminder.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!data) return res.status(404).send("ID not found");

    return res.status(200).json(data);
  } catch (err) {
    serverErrorHandler(err, res, debug);
  }
});

// POST: "/reminders"
app.post(route, async (req, res) => {
  const debug = createLogger(`${route}`);
  try {
    const { user: userId, description, date } = req.body;

    if (!userId || !description || !date)
      return res
        .status(400)
        .send("One of required fields (user, description, date) is missing");

    const data = await Reminder.create({
      userId,
      description,
      date: new Date(date),
    });

    return res.status(201).json(data);
  } catch (err) {
    serverErrorHandler(err, res, debug);
  }
});

// PUT: "/reminders/:id"
app.put(routeWithID, notSupportedHandler);
// PATCH: "/reminders/:id"
app.patch(routeWithID, notSupportedHandler);
// DELETE: "/reminders/:id"
app.delete(routeWithID, notSupportedHandler);

app.listen(PORT, async () => {
  await sequelizeConn.sync();

  sequelizeConn.authenticate().then(() => {
    debug.info(`Server running on port: ${PORT}`);
  });
});
