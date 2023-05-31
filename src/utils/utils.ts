export const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
};

export const createLogger = (path: string) => {
  const { log } = console;

  log("Logger created for:", process.env.NODE_ENV);

  const error = (value: string | number | object) => {
    if (typeof value === "object") {
      value = JSON.stringify(value, null, 2);
    }

    process.env.NODE_ENV === "development" && log(`[${path}]: ${value}`);
  };
  const info = (value) =>
    process.env.NODE_ENV === "development" && log(`[${path}]: ${value}`);

  return {
    info,
    error,
  };
};

export const serverErrorHandler = (err, res, debug) => {
  debug.error(err);
  return res.status(500).send(`An error occurred. Please try again 
    or contact support if error persists`);
};

export const notSupportedHandler = (_, res) => res.sendStatus(405);
