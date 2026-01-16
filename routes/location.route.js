// import express from 'express';

// import {
//   addCountry,
//   getCountries,
//   getCountryById,
//   updateCountry,
//   deleteCountry,
// } from '../controllers/country.controller.js';

// import {
//   addState,
//   getStates,
//   getStateById,
//   updateState,
//   deleteState,
// } from '../controllers/state.controller.js';

// import {
//   addCity,
//   getCities,
//   getCityById,
//   updateCity,
//   deleteCity,
// } from '../controllers/city.controller.js';

// import {
//   addCollege,
//   getColleges,
//   getCollegeById,
//   updateCollege,
//   deleteCollege,
// } from '../controllers/college.controller.js';

// const router = express.Router();

// /* COUNTRY */
// router.post('/country', addCountry);
// router.get('/country', getCountries);
// router.get('/country/:id', getCountryById);
// router.put('/country/:id', updateCountry);
// router.delete('/country/:id', deleteCountry);

// /* STATE */
// router.post('/state', addState);
// router.get('/state', getStates);
// router.get('/state/:id', getStateById);
// router.put('/state/:id', updateState);
// router.delete('/state/:id', deleteState);

// /* CITY */
// router.post('/city', addCity);
// router.get('/city', getCities);
// router.get('/city/:id', getCityById);
// router.put('/city/:id', updateCity);
// router.delete('/city/:id', deleteCity);

// /* COLLEGE */
// router.post('/college', addCollege);
// router.get('/college', getColleges);
// router.get('/college/:id', getCollegeById);
// router.put('/college/:id', updateCollege);
// router.delete('/college/:id', deleteCollege);

// export default router;



import express from 'express';

import {
  addCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
} from '../controllers/country.controller.js';

import {
  addState,
  getStates,
  getStateById,
  updateState,
  deleteState,
} from '../controllers/state.controller.js';

import {
  addCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
} from '../controllers/city.controller.js';

import {
  addCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
} from '../controllers/college.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Location - Country
 *     description: Country management APIs
 *   - name: Location - State
 *     description: State management APIs
 *   - name: Location - City
 *     description: City management APIs
 *   - name: Location - College
 *     description: College management APIs
 */

/* ------------------ COUNTRY ROUTES ------------------ */

/**
 * @swagger
 * /api/location/country:
 *   post:
 *     summary: Add a new country
 *     tags: [Location - Country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Country created successfully
 *   get:
 *     summary: Get all countries
 *     tags: [Location - Country]
 *     responses:
 *       200:
 *         description: List of countries
 */
router.post('/country', addCountry);
router.get('/country', getCountries);

/**
 * @swagger
 * /api/location/country/{id}:
 *   get:
 *     summary: Get country by ID
 *     tags: [Location - Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country details
 *   put:
 *     summary: Update country
 *     tags: [Location - Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Country updated
 *   delete:
 *     summary: Delete country
 *     tags: [Location - Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country deleted
 */
router.get('/country/:id', getCountryById);
router.put('/country/:id', updateCountry);
router.delete('/country/:id', deleteCountry);


/* ------------------ STATE ROUTES ------------------ */

/**
 * @swagger
 * /api/location/state:
 *   post:
 *     summary: Add a new state
 *     tags: [Location - State]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               countryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: State created
 *   get:
 *     summary: Get all states
 *     tags: [Location - State]
 *     responses:
 *       200:
 *         description: List of states
 */
router.post('/state', addState);
router.get('/state', getStates);

/**
 * @swagger
 * /api/location/state/{id}:
 *   get:
 *     summary: Get state by ID
 *     tags: [Location - State]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: State details
 *   put:
 *     summary: Update state
 *     tags: [Location - State]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: State updated
 *   delete:
 *     summary: Delete state
 *     tags: [Location - State]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: State deleted
 */
router.get('/state/:id', getStateById);
router.put('/state/:id', updateState);
router.delete('/state/:id', deleteState);


/* ------------------ CITY ROUTES ------------------ */

/**
 * @swagger
 * /api/location/city:
 *   post:
 *     summary: Add a new city
 *     tags: [Location - City]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               stateId:
 *                 type: string
 *     responses:
 *       201:
 *         description: City created
 *   get:
 *     summary: Get all cities
 *     tags: [Location - City]
 *     responses:
 *       200:
 *         description: List of cities
 */
router.post('/city', addCity);
router.get('/city', getCities);

/**
 * @swagger
 * /api/location/city/{id}:
 *   get:
 *     summary: Get city by ID
 *     tags: [Location - City]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City details
 *   put:
 *     summary: Update city
 *     tags: [Location - City]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: City updated
 *   delete:
 *     summary: Delete city
 *     tags: [Location - City]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City deleted
 */
router.get('/city/:id', getCityById);
router.put('/city/:id', updateCity);
router.delete('/city/:id', deleteCity);


/* ------------------ COLLEGE ROUTES ------------------ */

/**
 * @swagger
 * /api/location/college:
 *   post:
 *     summary: Add a new college
 *     tags: [Location - College]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cityId:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: College created
 *   get:
 *     summary: Get all colleges
 *     tags: [Location - College]
 *     responses:
 *       200:
 *         description: List of colleges
 */
router.post('/college', addCollege);
router.get('/college', getColleges);

/**
 * @swagger
 * /api/location/college/{id}:
 *   get:
 *     summary: Get college by ID
 *     tags: [Location - College]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: College details
 *   put:
 *     summary: Update college
 *     tags: [Location - College]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: College updated
 *   delete:
 *     summary: Delete college
 *     tags: [Location - College]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: College deleted
 */
router.get('/college/:id', getCollegeById);
router.put('/college/:id', updateCollege);
router.delete('/college/:id', deleteCollege);

export default router;