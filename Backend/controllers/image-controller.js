const express = require("express");
const path = require("path");
const errorsHelper = require("../helpers/errors-helper");
const uuid = require("uuid"); // npm i uuid
const router = express.Router();
const fs = require('fs')
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");

var IMAGE_PATH = "./images"

// GET image : */api/images/:imageName
router.get("/:imageName", (request, response) => {
    try {
        // data
        const imageName = "/" + request.params.imageName;
        const imagePath = path.resolve(IMAGE_PATH) + imageName; // get absolute path 

        // validation:
        if (fs.existsSync(imagePath)) {
            // success
            return response.sendFile(imagePath);
        }
        else {
            return response.status(404).send("requested image was not found.")
        }
    } catch (error) {
        errorsHelper.internalServerError(response, error)
    }
});

router.use(verifyLoggedIn);
// POST upload image : */api/images
router.post("/", verifyAdmin, async (request, response) => {
    try {
        // checking
        if (!request.files) return response.status(400).send("No image sent");
        if (!request.files.image) return response.status(400).send("The image file request must be called image");

        // data
        const image = request.files.image; // The name of the image sent from the front.
        const extension = path.extname(image.name); // ".jpg" or ".png" or ".gif" or...

        // validate
        const allowedExtensions = [".jpg", ".png", ".jpeg"];
        if (!(allowedExtensions.includes(extension))) {
            response.status(400).send(`The image extension must be one of ${allowedExtensions}.`);
            return;
        }

        // logic
        const newFileName = uuid.v4() + extension; // e.g.: "d3388752-7a4f-44d5-992c-bc316c750f7f.jpg"
        if (!fs.existsSync(IMAGE_PATH)) { // change to async when working with remote server
            // enter the code to execute after the folder is there.
            fs.mkdirSync(IMAGE_PATH);
        }
        image.mv(IMAGE_PATH + "/" + newFileName); // Move the file into the hard-disk

        // success
        response.status(201).send(newFileName);

    } catch (error) {
        errorsHelper.internalServerError(response, error)
    }
});


// DELETE an image : */api/image/:imageName
router.delete("/:imageName", verifyAdmin, (request, response) => {
    try {
        // data
        const imageName = "/" + request.params.imageName;
        const imagePath = path.resolve(IMAGE_PATH) + imageName; // get absolute path 

        // validation:

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);

            // success
            return response.sendStatus(204);
        }
        else {
            return response.status(404).send("requested image for deleting was not found.")
        }
    } catch (error) {
        errorsHelper.internalServerError(response, error)
    }
});


module.exports = router;