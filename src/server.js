const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('src/data/images')); 
app.use(express.static(path.join(__dirname, 'public')));
const breeds = {
    bulldog: ['bullDog1.jpg', 'bullDog2.jpg', 'bullDog3.jpg'],
    labrador: ['labrador1.jpg', 'labrador2.jpeg', 'labrador3.jpg'],
    poodle: ['poodle1.jpg', 'poodle2.jpg', 'poodle3.jpg']
};

app.get('/breeds', (req, res) => {
    res.json(Object.keys(breeds));
});

app.get('/image/:breed', (req, res) => {
    const breed = req.params.breed;
    if (breeds[breed]) {
        const images = breeds[breed];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        res.json({ imageUrl: `/img/${randomImage}` });
    } else {
        res.status(404).json({ error: 'Breed not found' });
    }
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
