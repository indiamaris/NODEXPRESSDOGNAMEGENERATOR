// const moongose = require('mongoose');
// async function main() {
// 	await moongose
// 		.connect('mongodb://localhost/DogsNames ')
// 		.then(() => console.log('conectedi'));
// }

// main().catch((err) => {
// 	console.error('not conectedi', err);
// });
// const dogNameSchema = new moongose.Schema({
// 	dogName: {
// 		type: String,
// 		required: true,
// 		minlenght: 3,
// 		maxlength: 10,
// 		trim: true,
// 	},
// });
// isso eh o nome da colecao
// const DogName = new moongose.model('dogs-names', dogNameSchema);

// const createDogName = async ({ Name }) => {
// 	const dogname = new DogName({ dogName: Name });
// 	try {
// 		const result = await dogname.save();
// 		console.log(result);
// 	} catch (ex) {
// 		console.log('the error :' + ex.message);
// 	}
// };

