import { fileURLToPath } from "url";
import path from "path";

function getFilename(importMetaUrl) {
  return path.basename(fileURLToPath(importMetaUrl));
}

function getFunctionNameAndSignature() {
  const stack = new Error().stack;
  const stackLines = stack.split("\n");

  // Skipping "Error" line and `logError()` function itself
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
    hour12: false, // 24-hour format
  });
}

export function logError(importMetaUrl, errorMessage) {
  console.error(
    `\n❌ ${errorMessage}\n[${getFormattedTimestamp()}] \nError in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}\n`
  );
}

export function logWarning(importMetaUrl, warningMessage) {
  console.warn(
    `\n⚠️ ${warningMessage}\n[${getFormattedTimestamp()}] \nWarning in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}\n`
  );
}

export function logSuccess(importMetaUrl, successMessage) {
  console.log(
    `\n✅ ${successMessage}\n[${getFormattedTimestamp()}] \nSuccess in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}\n`
  );
}

export function logInfo(importMetaUrl, infoMessage) {
  console.info(
    `\n📃 ${infoMessage}\n[${getFormattedTimestamp()}] \nInfo in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}\n`
  );
}
