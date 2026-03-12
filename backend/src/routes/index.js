import express from 'express'
import speciesRouter from '../routes/species.js'
import individualsRouter from '../routes/individuals.js'
import sightingsRouter from '../routes/sightings.js'

const router = express.Router();

router.use('/species', speciesRouter);
router.use('/individuals', individualsRouter);
router.use('/sightings', sightingsRouter);

export default router;