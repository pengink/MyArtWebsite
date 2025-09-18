
document.addEventListener("DOMContentLoaded", (event) => {
    let music = document.getElementById("music");
    music.volume = 0.1;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox'
    document.body.appendChild(lightbox);

    const images = document.querySelectorAll('img');
    images.forEach(image => {
    image.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img);
            document.getElementsByClassName("Body").maxHeight = String(img.height) + "px";
        });
    });
    lightbox.addEventListener('click', e =>  {
        lightbox.classList.remove('active');
        document.getElementsByClassName("Body").maxHeight = "auto"
    });
});

function toggleMusic() {
    let music = document.getElementById("music");
    let player = document.getElementById("musicPlayer");
    if (music.paused == true) {
        music.play();
        player.textContent = "Click to pause pretensious museum music."
    } else {
        player.textContent = "Click to play pretensious museum music."
        music.pause();
    }
}
