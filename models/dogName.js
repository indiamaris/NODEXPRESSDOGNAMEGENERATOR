/** @format */
const mongoose = require('mongoose');
const dogNameSchema = new mongoose.Schema({
	dogName: {
		type: String,
		required: true,
		minlenght: [2, `Must be at least 2`],
		maxlength: [25, `Must be at maximum 25`],
		trim: true,
	},
});
const DogName = mongoose.model('dogs-names', dogNameSchema);

const findDogNames = () => DogName.find().sort('dogName');

const findIdByDogName = (dogName) => DogName.find({ dogName: dogName });

const findManyDogNamesById = (id) => DogName.findById(id);

const FindDogNameById = (id) => {
	return findManyDogNamesById(id).select({ _id: false, dogName: true });
};

exports.DogName = DogName;
exports.findDogNames = findDogNames;
exports.findIdByDogName = findIdByDogName;
exports.findManyDogNamesById = findManyDogNamesById;
exports.FindDogNameById = FindDogNameById;








