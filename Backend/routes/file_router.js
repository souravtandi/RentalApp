const express = require('express');
const router = express.Router();

const multer = require('multer')
//https://remotestack.io/create-node-express-multer-file-upload-download-rest-api/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  
  const upload = multer({ storage: storage })

/*
{
  fieldname: 'file',
  originalname: 'Souravlal Tandi.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: 'Souravlal Tandi.jpg',
  path: 'uploads\\Souravlal Tandi.jpg',
  size: 183266
}
*/
router.post('/uploadFile', upload.single('file'), function (req, res) {
    //console.log(req.file)
    res.json({"fileName": req.file.filename})
})

const downloadFiles = (req, res) => {
    const fileName = req.params.fileName;
    const path = __basedir + "/uploads/";
  console.log(fileName)
    res.download(path + fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "File can not be downloaded: " + err,
        });
      }
    });
};

router.get("/files/:fileName", downloadFiles)

module.exports = router;