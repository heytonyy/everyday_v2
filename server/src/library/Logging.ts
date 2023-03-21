import morgan from "morgan";
import chalk from "chalk";

export const morganMiddleware = morgan(function (tokens, req, res) {
  // const dateString = tokens.date(req, res);
  // const date = dateString ? new Date(dateString) : new Date();
  // const formattedDate = date.toLocaleString("en-US");
  return [
    chalk.hex("#ff4757").bold("REQUEST --> "),
    chalk.hex("#34ace0").bold(tokens.method(req, res)),
    chalk.hex("#ffb142").bold(tokens.status(req, res)),
    chalk.hex("#ff5252").bold(tokens.url(req, res)),
    chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#f78fb3").bold("@ " + tokens.date(req, res)),
    chalk.yellow(tokens["remote-addr"](req, res)),
    chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
    "\n",
  ].join(" ");
});

export class ChalkLogger {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(
      chalk.green(
        `[${new Date().toLocaleString()}] `,
        typeof args === "string" ? chalk.blueBright(args) : args
      )
    );
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(
        `[${new Date().toLocaleString()}] `,
        typeof args === "string" ? chalk.yellowBright(args) : args
      )
    );
  public static error = (args: any) =>
    console.log(
      chalk.red(
        `[${new Date().toLocaleString()}] `,
        typeof args === "string" ? chalk.redBright(args) : args
      )
    );
}

// OLD LOGGER MIDDLEWARE
//
// app.use((req, res, next) => {
//   Logging.info(
//     `⚡️[INFO]: Incoming: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
//   );
//   res.on("finish", () => {
//     Logging.info(
//       `⚡️[INFO]: Outgoing: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
//     );
//   });
//   next();
// });
//
// chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
