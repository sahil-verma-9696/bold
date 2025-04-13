import cloudinary from "../cloudinary/config.js";
import { createUploadProgressLogger } from "../utils/progressLogger.js";

export async function uploadToCloudinary(
  fileBuffer,
  fileSize,
  folder = "avatars"
) {
  return new Promise((resolve, reject) => {
    const logger = createUploadProgressLogger(fileSize);

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        logger.stop();
        if (error) return reject(error);
        return resolve(result);
      }
    );

    // simulate chunked streaming to update progress bar
    const CHUNK_SIZE = 1024 * 32;
    let offset = 0;

    function streamNextChunk() {
      if (offset < fileBuffer.length) {
        const end = Math.min(offset + CHUNK_SIZE, fileBuffer.length);
        const chunk = fileBuffer.slice(offset, end);
        stream.write(chunk);
        offset = end;
        logger.update(offset);
        setTimeout(streamNextChunk, 20); // simulate async chunk write
      } else {
        stream.end();
      }
    }

    streamNextChunk();
  });
}
