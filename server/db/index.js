import mongoose from 'mongoose';
import courses from './courses.js';
import Course from '../models/course.js';
import Round from '../models/round.js';
import User from '../models/user.js';

mongoose.connect('mongodb://127.0.0.1:27017/golfHandicapTracker');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected');
});

const seedCourses = async () => {
    await Course.deleteMany({});
    await Round.deleteMany({});
    for (const c of courses) {
        const course = new Course ({
            name: c.name,
            par: c.par,
            tees: c.tees,
            imageUrl: c.imageUrl
        });
        await course.save();
    };
    const round = new Round({
        course: 'Test 1',
        numHoles: '18',
        tee: 'Blue',
        score: 70,
        date:'2024-02-03',
        user: '663db74004b44e657c77f96d'
    })
    await round.save();
};

seedCourses().then(() => {
    mongoose.connection.close();
});

