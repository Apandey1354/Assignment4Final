document.addEventListener('DOMContentLoaded', () => {
    const breedsContainer = document.getElementById('breeds-container');
    const imageContainer = document.getElementById('image-container');
    fetch('/breeds')
        .then(response => response.json())
        .then(breeds => {
            breeds.forEach(breed => {
                const button = document.createElement('button');
                button.textContent = breed;
                button.addEventListener('click', () => fetchImage(breed));
                breedsContainer.appendChild(button);
            });
        });
    function fetchImage(breed) {
        fetch(`/image/${breed}`)
            .then(response => response.json())
            .then(data => {
                imageContainer.innerHTML = `<img src="${data.imageUrl}" alt="${breed}">`;
            });
    }
});