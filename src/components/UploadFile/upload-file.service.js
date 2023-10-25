import cloudinary from "../../configs/cloudinary.js";

const UploadFileService = {
  uploadFile: async (file) => {
    if (!file) {
      throw new Error("No file attached!");
    }

    const uploadedResponse = await cloudinary.uploader.upload(file);

    return {
      file: uploadedResponse,
    };
  },
};

export default UploadFileService;
