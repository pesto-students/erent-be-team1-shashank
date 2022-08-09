import admin from 'firebase-admin';

import configs from 'configs';

const serviceAccount = configs.firebaseServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
