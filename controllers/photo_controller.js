import Photo from "../models/photo_model";

const createPhoto = (req, rest) => {
    const photo = Photo.create(req.body);
    rest.status(201).json({
        succeded: true,
        photo
    });
};

export { createPhoto };