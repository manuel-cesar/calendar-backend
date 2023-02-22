/*
    Event Routes
    /api/events
*/
const { updateEvent, getEvents, createEvent, deleteEvent } = require("../controllers/events");
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router()


//Validate token 
router.use( validateJWT ); //Uses this middleware in all petitions below.
router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'Must have title').not().isEmpty(),
        check('start', 'Must have start date').custom( isDate ),
        check('end', 'Must have end date').custom( isDate ),
        validateFields,
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id',  deleteEvent);

module.exports = router;