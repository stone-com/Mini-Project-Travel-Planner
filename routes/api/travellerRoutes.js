const router = require('express').Router();
const { Traveller, Trip, Location } = require('../../models');

// Route to GET all travellers
router.get('/', async (req, res) => {
  try {
    const allTravellerData = await Traveller.findAll();
    res.json(allTravellerData);
  } catch (err) {
    res.json(err);
  }
});

// Route to POST and create a traveller
router.post('/', async (req, res) => {
  try {
    //   create a new traveller and pass in req.body
    const newTraveller = await Traveller.create(req.body);
    res.json(newTraveller);
  } catch (err) {
    res.json(err);
  }
});

// Route to GET a single traveller
router.get('/:id', async (req, res) => {
  try {
    const singleTraveller = await Traveller.findByPk(req.params.id, {
      include: [{ model: Trips }, { model: Location }],
    });
    //   check if there is no singleTraveller returned and respond with message
    if (!singleTraveller) {
      res.send('There is no traveller with that ID!! Try again!');
      return;
    }
    res.json(singleTraveller);
  } catch (err) {
    res.json(err);
  }
});
