/** @format */
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
router.use(express.json());
const {
  getItemInArrayById,
  getRandomItemInArray,
  getArraySize,
} = require('../utils-gets-functions/getIts');
const {
  validateId,
  validateIdFormat,
} = require('../validations/validationsID');
const validateDogName = require('../validations/validateDogName');
const { DogName } = require('../models/dogName');

const {
  findDogNames,
  findIdByDogName,
  FindDogNameById,
} = require('../models/dogName');

const { randomBytes } = require('crypto');
const isAdmin = require('../middleware/isAdmin');

//___________*****_GET__ROUTES_*****___________________//

// return all dognames if user is logged.
router.get('/allNames', auth, async (req, res) => {
  
  const dogNames = await findDogNames();
  res.send(dogNames);

});

// return complete data for a dog name
router.get('/randomDog', async (req, res) => {
  const dogNames = await findDogNames();
  const randomDogName = await getRandomItemInArray(dogNames);
  res.status(200).send(randomDogName);
});

router.get('/id/:id', [auth], async (req, res) => {
  const receivedID = req.params.id;
  const { error } = validateIdFormat(req.params);
  if (error) return res.status(400).send(error.message);
  else {
    if (!validateId(receivedID)) {
      return res.status(400).send('The id isnt valid');
    }
    //checar se o id existe
    const dogName = await FindDogNameById(receivedID);
    if (!dogName) {
      return res.status(404).send('The id do not exist in our databse');
    }
    res.send(dogName);
  }
});

// ___________*****_POST__ROUTES_*****___________________//

router.post('/allNames', [auth, isAdmin], async (req, res) => {
  if (dogName.length === 0) {
    return res.status(400).send('empty dog name');
  }
  const { error } = validateDogName(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  const dogName = new DogName({ dogName: req.body.dogName });
  await dogName.save();
  console.debug(dogName);
  res.send(dogName);
});

// ___________*****_PATCH__ROUTES_*****___________________//

router.patch(
  '/updateName/:id',
  [auth, isAdmin],

  async (req, res) => {
    if (req.params.length === 0) {
      return res.status(400).send('empty id');
    }
    const { error } = validateIdFormat(req.params);
    if (error) {
      return res.status(400).send(error.message);
    } else {
      const { error } = validateDogName(req.body);
      if (error) return res.status(400).send(error.message);

      let dogName = req.body.dogName;
      const dog = await DogName.findByIdAndUpdate(
        req.params.id,
        {
          dogName: dogName,
        },
        { returnDocument: 'after' }
      );
      res.send(dog);
    }
  }
);

// ___________*****_DELETE__ROUTES_*****___________________//

router.delete('/id/:id', [auth, isAdmin], async (req, res) => {
  const { error } = validateIdFormat(req.params);
  if (error) {
    return res.status(400).send(error.message);
  } else {
    const idExist = await DogName.exists({
      _id: req.params.id,
    });
    if (!idExist)
      return res
        .status(400)
        .send(` Sorry, there is no dog's name with the id ${req.params.id}.`);
  }

  const dog = await DogName.findByIdAndDelete(req.params.id, {
    returnDocument: 'after',
  });
  res.send(
    ` The ${dog.dogName}'s name was deleted from namesbase , but certanly ${dog.dogName} was a good one. `
  );
});

router.delete('/deleteByName/:dogName', [auth, isAdmin], async (req, res) => {
  const toBeDeleted = req.params.dogName;
  const dogName = await findIdByDogName(toBeDeleted);
  if (dogName.length === 0) {
    return res.send(`The name ${toBeDeleted} do not exist in the namesbase`);
  }
  console.debug(dogName);

  const dog = await DogName.deleteOne(
    { dogName: toBeDeleted },
    {
      returnDocument: 'after',
    }
  );
  res.send(
    ` The ${toBeDeleted}'s name was deleted ${dog.deletedCount} times from namesbase , but certanly ${toBeDeleted} was a good one. `
  );
});

router.delete(
  '/deleteManyByName/:dogName',
  [auth, isAdmin],
  async (req, res) => {
    const toBeDeleted = req.params.dogName;
    const dogName = await findIdByDogName(toBeDeleted);
    if (dogName.length === 0) {
      return res.send(`The name ${toBeDeleted} do not exist in the namesbase`);
    }
    console.debug(dogName);

    const dog = await DogName.deleteMany(
      { dogName: toBeDeleted },
      {
        returnDocument: 'after',
      }
    );
    res.send(
      ` The ${toBeDeleted}'s name was deleted ${dog.deletedCount} times from namesbase , but certanly ${toBeDeleted} was a good one. `
    );
  }
);

module.exports = router;

