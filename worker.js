/**
 * Created by Flavor on 7/28/17.
 */
self.addEventListener('message', function(e) {
  console.log('e', e);
  self.postMessage(e.data);
}, false);