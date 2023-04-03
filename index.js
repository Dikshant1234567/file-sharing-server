import Express from "express";
import cors from "cors";
import DatabaseConnection from "./database/db.js";
import upload from "./utiles/upload.js";
import File from "./models/file.js";

const Port = process.env.PORT || 5000;
const app = Express();

app.use(cors());
DatabaseConnection();

app.post("/upload", upload.single("file"), async (req, resp) => {
  const fileObject = {
    path: req.file.path,
    name: req.file.originalname,
  };
  try {
    const file = await File.create(fileObject);
    console.log(file);
    return resp
      .status(200)
      // .json({ path: `http://localhost:${Port}/file/${file._id}` });
      .json({ path: `https://file-sharing-a5ut.onrender.com/file/${file._id}` });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ error: error });
  }
});

app.get("/file/:fileId", async (req, resp) => {
  try {
    const ID = await File.findById(req.params.fileId);
    ID.downloadContent++;
    await ID.save()
    resp.download(ID.path , ID.name) 
  } catch (error) {
    return resp.status(500).json({ messg: `file not found${error}` });
  }
});

app.listen(Port, () => {
  console.log(`The server is running in ${Port}`);
});
