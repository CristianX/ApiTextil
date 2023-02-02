const { Router } = require('express');
const router = new Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
const fs = require("fs");
const { adminImagen } = require('../../utils/apiProductos');

router.get('/:img', async (req, res) => {
    const { img } = req.params;
    try {
        const resp = await adminImagen.getAdminImagen(img);
        res.status(200);
        res.sendFile(resp);
    } catch (error) {
        res.json("Error en la API: /insertar imagen");
    }
});

router.post('/', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                res.status(400).json("Something went wrong!");
            }

            const { name } = req.body;

            const tempPath = req.file.path;
            const targetPath = (process.cwd() + '/imagenes/' + name + '.jpg');

            fs.rename(tempPath, targetPath, err => {

                res.send("Todo ok")

            });

        });
    } catch (error) {
        res.json("Error en la API: /insertar imagen");
    }
});

module.exports = router;