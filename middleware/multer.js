const path = require('path');
const multer = require('multer');

const storageEngine = multer.diskStorage({
	destination: './build/images',
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

const checkFileType = function (file, cb) {
	const fileTypes = /jpeg|jpg|png|gif|svg/;

	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extName) {
		return cb(null, true);
	} else {
		cb('Error: You can Only Upload Images!!');
	}
};

const upload = multer({
	storage: storageEngine,
	limits: { fileSize: 10000000 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	}
});

module.exports = upload;
