import chalk from "chalk";
import { fileURLToPath } from "url";
import path from "path";

function getFilename(importMetaUrl) {
  return path.basename(fileURLToPath(importMetaUrl));
}

function getFunctionNameAndSignature() {
  const stack = new Error().stack;
  const stackLines = stack.split("\n");
  const match = stackLines[3]?.match(/at (\S+)/);
  const functionName = match ? match[1] : "UnknownFunction";
  return `${functionName}()`;
}

function getFormattedTimestamp() {
  return new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function logError(importMetaUrl, errorMessage) {
  console.error(
    `\n${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red(errorMessage)}\n` +
      `${chalk.gray(`[${getFormattedTimestamp()}]`)}\n` +
      `${chalk.redBright("↳")} ${chalk.whiteBright(
        getFilename(importMetaUrl)
      )} -> ${chalk.white.bold(getFunctionNameAndSignature())}\n`
  );
}

export function logWarning(importMetaUrl, warningMessage) {
  console.warn(
    `\n${chalk.bgYellow.black.bold(" WARNING ")} ${chalk.yellow(
      warningMessage
    )}\n` +
      `${chalk.gray(`[${getFormattedTimestamp()}]`)}\n` +
      `${chalk.yellowBright("↳")} ${chalk.whiteBright(
        getFilename(importMetaUrl)
      )} -> ${chalk.white.bold(getFunctionNameAndSignature())}\n`
  );
}

export function logSuccess(importMetaUrl, successMessage) {
  console.log(
    `\n${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.greenBright(
      successMessage
    )}\n` +
      `${chalk.gray(`[${getFormattedTimestamp()}]`)}\n` +
      `${chalk.greenBright("↳")} ${chalk.whiteBright(
        getFilename(importMetaUrl)
      )} -> ${chalk.white.bold(getFunctionNameAndSignature())}\n`
  );
}

export function logInfo(importMetaUrl, infoMessage) {
  console.info(
    `\n${chalk.bgBlue.white.bold(" INFO ")} ${chalk.cyan(infoMessage)}\n` +
      `${chalk.gray(`[${getFormattedTimestamp()}]`)}\n` +
      `${chalk.cyan("↳")} ${chalk.whiteBright(
        getFilename(importMetaUrl)
      )} -> ${chalk.white.bold(getFunctionNameAndSignature())}\n`
  );
}
