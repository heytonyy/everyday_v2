import chalk from "chalk";

export default class Logging {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(
      chalk.blue(
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

// MAYBE DO THIS LATE:

// import morgan from 'morgan';
// import chalk from 'chalk'; // or you can use the require('chalk') syntax too

// export const morganMiddleware = morgan(function (tokens, req, res) {
//     return [
//         '\n\n\n',
//         chalk.hex('#ff4757').bold('🍄  Morgan --> '),
//         chalk.hex('#34ace0').bold(tokens.method(req, res)),
//         chalk.hex('#ffb142').bold(tokens.status(req, res)),
//         chalk.hex('#ff5252').bold(tokens.url(req, res)),
//         chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
//         chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
//         chalk.yellow(tokens['remote-addr'](req, res)),
//         chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
//         chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
//         '\n\n\n',
//     ].join(' ');
// });

// app.use(morganMiddleware);
