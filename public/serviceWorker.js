this.addEventListener('activate', event => {
  console.log('Service worker has been activated');
});

this.addEventListener('push', event => {
  console.log('Notifications will be displayed here');
});