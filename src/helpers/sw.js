import axios from 'axios';

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const url = process.env.PUBLIC_URL + '/serviceWorker.js';
    const registration = await navigator.serviceWorker.register(url, { scope: '/' });
    console.log('Service configuration is:', { registration });
    return registration;
  }
  throw Error('Service worker is not supported');
}

async function subscribe(swRegistration) {
  let subscription = await swRegistration.pushManager.getSubscription();
  console.log(subscription);
  if (subscription === null) {
    subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BPyujJw1wdS2o4l3SNLqQMbPdOuHXpcjLRklefrLCafMYuGYZv2eT9CohJFZvVyzCbFMSNn1r5vsa9au12it8R0',
    });
  }
  axios.post('/subscribe', subscription, {
    headers: {
      token: localStorage.getItem('token') || '',
    }
  });
}

async function registerAndSubscribe() {
  try {
    const serviceWorkerRegistration = await registerServiceWorker();
    await axios.post('/swRegistration', {}, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
    await subscribe(serviceWorkerRegistration);
  } catch (err) {
    console.error(err);
  }
}

async function unregisterServiceWorker() {
  try {
    const swRegistration = await navigator.serviceWorker.getRegistration();
    swRegistration?.unregister();
    await axios.delete('/swRegistration', {
      headers: {
        token: localStorage.getItem('token') || '',
      }
    });
  } catch (err) {
    console.error(err);
  }
}

async function removeSubscription() {
  try {
    await axios.delete('/subscribe', {
      headers: {
        token: localStorage.getItem('token') || '',
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export {
  registerAndSubscribe,
  unregisterServiceWorker,
  removeSubscription,
};