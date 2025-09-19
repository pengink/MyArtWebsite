// lightbox controller
const lightbox = document.createElement('div');
 lightbox.id = 'lightbox'
 document.body.appendChild(lightbox);

 const images = document.querySelectorAll('.gallery img, .gallery video'); // save volume level
 images.forEach(image => {
 image.addEventListener('click', () => {
          lightbox.classList.add('active');
          const img = document.createElement(image.tagName);
          if (image.tagName == 'VIDEO') {
            img.autoplay = true;
            img.controls = true;
            img.loop = true;
          }
          img.src = image.src
          while (lightbox.firstChild) {
              lightbox.removeChild(lightbox.firstChild)
          }
          lightbox.appendChild(img);
      });
  });
 lightbox.addEventListener('click', e =>  {
    if (e.target !== lightbox && lightbox.firstChild.tagName == "VIDEO") {return}
    lightbox.classList.remove('active');
    lightbox.removeChild(lightbox.firstChild)
    document.getElementsByClassName("Body").maxHeight = "auto"
 });



 //music controller
music.volume = 0.1;
document.getElementById("musicPlayer").addEventListener('click', () => {
    let music = document.getElementById("music");
    let player = document.getElementById("musicPlayer");
    if (music.paused == true) {
        music.play();
        player.textContent = "Click to pause pretensious museum music."
    } else {
        player.textContent = "Click to play pretensious museum music."
        music.pause();

    }
});

// var rgb

let root = document.documentElement;

images.forEach(image => {
    image.addEventListener('mouseover', () => {
        var rgb = getAverageRGB(image);
        let newColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
        root.style.setProperty('--newColor', newColor)
        root.style.setProperty('--newShadow', 'rgba('+rgb.r+','+rgb.g+','+rgb.b+', 0.4)');  // set new color value here
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

// masonry
function resizeMasonryItem(item){
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = document.getElementsByClassName('gallery')[0],
      rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('column-gap')),
      //rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      rowHeight = 0
    let content = ".grid-item img";
    if (!item.querySelector(content))
        content = ".grid-item video";

    var rowSpan = Math.ceil((item.querySelector(content).getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    /* Set the spanning as calculated above (S) */
    item.style.gridRowEnd = 'span '+ rowSpan;
}

function resizeAllMasonryItems(){
  // Get all item class objects in one list
  //WORKs
  var allItems = document.getElementsByClassName("grid-item");

  /*
   * Loop through the above list and execute the spanning function to
   * each list-item (i.e. each masonry item)
   */
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }
}

function waitForImages() {
  var allItems = document.getElementsByClassName("grid-item");
  for(var i=0;i<allItems.length;i++){
    imagesLoaded( allItems[i], function(instance) {
      var item = instance.elements[0];
      resizeMasonryItem(item);
    } );
  }
}

var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
  window.addEventListener(event, resizeAllMasonryItems);
});

waitForImages();