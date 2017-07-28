/**
 * Created by Flavor on 7/28/17.
 */

var worker = new Worker('worker.js');

function processImage (_tile_width, _tile_height, _image_id, _target_id) {
  'use strict'
  var image = document.getElementById(_image_id)
  var photomosaic = new PhotoMosaic({
    image: image,
    targetElement: document.getElementById(_target_id),
    width: image.naturalWidth,
    height: image.naturalHeight,
    tileWidth: _tile_width,
    tileHeight: _tile_height
  })
}

$(document).ready(function () {
  processImage(4, 4, 'goni', 'target')
  $('.title').html('goni')
  $('.range-title').html(4)
})

$('.img-avatar').on('click', function (e) {
  $('#target').html('')
  $('.title').html(this.id)
  worker.postMessage(JSON.stringify({
    tileHeight: 12, tileWidth: 12, imageId: this.id, targetId: 'target'
  }));
})

worker.onmessage = function (event) {
  var msg = JSON.parse(event.data);
  processImage(msg.tileHeight, msg.tileWidth, msg.imageId, msg.targetId);
};

$('#pixleInput').on('keydown', '#pixleSize', function (e) {
  -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

$('.update').on('click', function () {
  var n = Number($('#pixleSize').val());
  var currentId = $('.title').text();
  if (n < 4) {
    alert("Input must be 4 or greater.")
  } else {
    console.log('currentId', currentId);
    $('#target').html('')
    $('.range-title').html(n)
    worker.postMessage(JSON.stringify({
      tileHeight: n, tileWidth: n, imageId: currentId, targetId: 'target'
    }));
  }
});









