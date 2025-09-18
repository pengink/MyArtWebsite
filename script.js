// lightbox controller
const lightbox = document.createElement('div');
 lightbox.id = 'lightbox'
 document.body.appendChild(lightbox);

 const images = document.querySelectorAll('.gallery img');
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

 //music controller
let music = document.getElementById("music");
music.volume = 0.1;
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

// var rgb

let root = document.documentElement;

images.forEach(image => {
    image.addEventListener('mouseover', () => {
        var rgb = getAverageRGB(image);
        newColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
        root.style.setProperty('--newColor', newColor)
        root.style.setProperty('--newShadow', 'rgba('+rgb.r+','+rgb.g+','+rgb.b+', 0.6)');
       // document.body.style.backgroundColor = newColor
     });
    image.addEventListener('mouseout', () => {
       /*  root.style.setProperty('--newColor', 'black')
        root.style.setProperty('--newShadow', 'black');*/
    });
});

// average rgb finder
/*var rgb = getAverageRGB(document.getElementById('i'));
let newColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')'; */

function getAverageRGB(imgEl) {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
    
}
