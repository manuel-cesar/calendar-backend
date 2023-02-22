const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response ) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    })
}

const createEvent = async(req, res = response ) => {

    const event = new Event( req.body );

    try {
        
        event.user = req.uid;
        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin'
        });        
    }
}

const updateEvent = async(req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );
        
        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist.'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You dont have permission to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } ); 

        res.json({
            ok: true,
            event: updatedEvent,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin.'
        });
    }
}

const deleteEvent = async(req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById( eventId );
        
        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist.'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You dont have permission to delte this event'
            });
        }



        await Event.findByIdAndDelete( eventId ) ; 

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin.'
        });
    }
}

module.exports = { 
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}