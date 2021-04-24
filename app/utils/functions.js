import axios from 'axios';

// check valid url for enable app
export function matchUrl(url) {
  if (url.match('https://chrome.google.com')) {
    return false;
  }
  if (url.match('view-source:')) {
    return false;
  }
  if (url.match('file:///')) {
    return false;
  }
  if (url.match('http://')) {
    return true;
  }
  if (url.match('https://')) {
    return true;
  }
}

export function sendFeedback(data) {
  return new Promise((resolve, reject) => {
    axios.post(
      '/api/post.php',
      JSON.stringify({ text: data.substring(0, 300) })
    )
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    });
  });
}

export function generateID() {
  let str =
    Math.random()
      .toString(36)
      .substr(2, 9) +
    Date.now()
      .toString(36)
      .substr(3);
  for (let i = 0; i < str.length; i++) {
    let n = Math.random();
    if (n > 0.5) {
      str = str.substr(0, i) + str[i].toUpperCase() + str.substr(i + 1);
    }
  }
  return str;
}

export function base64toBlob(base64Data, contentType) {
  if (base64Data.match('base64,')) {
    base64Data = base64Data.slice(base64Data.indexOf('base64,') + 7);
  }
  contentType = contentType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);

    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

export function toDataURL(src, outputFormat) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = src;
    }
  });
}
