import { Magic } from '@magic-sdk/admin';

import configs from 'configs';

const magicAdmin = new Magic(configs.magicLinkSecretKey);

export default magicAdmin;
