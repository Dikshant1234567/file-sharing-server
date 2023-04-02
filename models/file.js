import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  path: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  downloadContent: {
    type: Number,
    default: 0,
    required: true,
  },
});

const File = mongoose.model('file',fileSchema)

export default File