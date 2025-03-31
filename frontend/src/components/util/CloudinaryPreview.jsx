import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

function CloudinaryPreview({setAvatar}) {
  // Configuration
  const cloudName = "hzxyensd5";
  const uploadPreset = "aoh4fpwm";

  // State
  const [publicId, setPublicId] = useState("");

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    // Uncomment and modify as needed:
    cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    multiple: false,
    folder: "user_images",
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    clientAllowedFormats: ["jpg", "png"],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    theme: "purple",
  };

  return (
    <div className="w-fit m-auto">
      {publicId ? (
        <div className="w-32 m-auto">
          {
            <AdvancedImage
              className="rounded-full my-4 mask mask-hexagon"
              cldImg={cld.image(publicId)}
              plugins={[responsive(), placeholder()]}
            />
          }
        </div>
      ) : (
        <div className="size-32 bg-base-200 my-4 rounded-full flex justify-center items-center mask mask-hexagon overflow-hidden">
          <p className="text-center">Preview you profile</p>
        </div>
      )}
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setAvatar={setAvatar} />
    </div>
  );
}

export default CloudinaryPreview;
