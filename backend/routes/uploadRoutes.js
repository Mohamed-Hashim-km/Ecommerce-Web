import path from "path"; //express path
import multer from "multer";
import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uplaod = multer({
  storage,
});

router.post("/", uplaod.single("image"), (req, res) => {
  res.send({
    message: "file uploaded successfully",
    image: `/${req.file.path}`,
  });
});

export default router;
