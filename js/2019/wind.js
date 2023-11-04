// using var to work around a WebKit bug
var canvas = document.getElementById('wind'); // eslint-disable-line

// const pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const gl = canvas.getContext('webgl', {antialiasing: false});

const wind = window.wind = new WindGL(gl);
wind.numParticles = 65536;

function frame() {
  if (wind.windData) {
      wind.draw();
  }
  requestAnimationFrame(frame);
}
frame();

updateWind('2019091500');

function updateWind(name) {
    getJSON('data/wind/' + name + '.json', function (windData) {
        const windImage = new Image();
        windData.image = windImage;
        windImage.src = 'data/wind/' + name + '.png';
        windImage.onload = function () {
            wind.setWind(windData);
        };
    });
}

function getJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('get', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(xhr.response);
        } else {
            throw new Error(xhr.statusText);
        }
    };
    xhr.send();
}
