const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/insta-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Database Connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '612459ec003dc1239ab4c893',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, nostrum quos. Cumque obcaecati exercitationem eius, similique porro explicabo numquam, maxime corporis repellat commodi delectus voluptatem quas iste labore nostrum deleniti.',
			price,
			images: [
				{
					url:
						'https://res.cloudinary.com/lemonpie/image/upload/v1629868139/InstaCamp/vstb4tckakfgtw1pslmx.jpg',
					filename: 'InstaCamp/vstb4tckakfgtw1pslmx'
				},
				{
					url:
						'https://res.cloudinary.com/lemonpie/image/upload/v1629868141/InstaCamp/kjk0a1ynvuubtmbrkygj.jpg',
					filename: 'InstaCamp/kjk0a1ynvuubtmbrkygj'
				}
			]
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
