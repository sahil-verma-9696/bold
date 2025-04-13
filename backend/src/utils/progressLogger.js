import cliProgress from "cli-progress";
import chalk from "chalk";

// returns a function you can call with the number of bytes uploaded
export function createUploadProgressLogger(fileSize) {
  const bar = new cliProgress.SingleBar({
    format: `${chalk.cyan("Uploading")} |${chalk.green(
      "{bar}"
    )}| {percentage}% | ETA: {eta_formatted}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  bar.start(fileSize, 0);

  return {
    update: (uploadedBytes) => bar.update(uploadedBytes),
    stop: () => bar.stop(),
  };
}
