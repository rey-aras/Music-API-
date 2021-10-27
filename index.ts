import * as env from 'dotenv';
import App from './src/app';

/** main */
(async (): Promise<void> => {
    /** load envs */
    env.config();

    /** parse envs */
    const port = Number(process.env.APP_PORT);

    /** instantiate and start server  */
    const app = new App(port, false, true);
    await app.initialize();
    app.start();
})();
