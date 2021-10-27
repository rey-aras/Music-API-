import test from 'ava';
import * as sinon from 'sinon';
import * as http from 'http';
import * as listen from 'test-listen';
import { default as axios } from 'axios';
import { Auth, Context } from 'rey-common';

import App from '../../src/app';
import UserServiceImpl from '../../src/services/impl/user_service_impl';
import { UserProperties } from '../../src/entity/models/user';

test.beforeEach('Initialize New Sandbox Before Each Test', async (t: any) => {
    t.context.sandbox = sinon.createSandbox();
    t.context.sandbox.stub(App.prototype, 'initProviders').resolves();

    const app = new App();
    await app.initialize();

    t.context.server = http.createServer(app.getInstance());
    t.context.prefixUrl = await listen(t.context.server);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t: any) => {
    t.context.sandbox.restore();
    t.context.server.close();
});

test.serial('should return 401 when called without authorization header', async (t: any): Promise<void> => {
    await axios.get(`${t.context.prefixUrl}/v1/profile`)
        .then(() => {
            t.fail('should throw error');
        })
        .catch(({ response: res }) => {
            t.is(res.status, 401);
        });
});

test.serial('should return profile data', async (t: any): Promise<void> => {
    const expectedOutput = { name: 'archie' } as UserProperties;

    const { token } = Auth.generateToken({ user_id: 1, name: 'archie' } as Context);
    const getProfileCalled = t.context.sandbox.mock(UserServiceImpl.prototype).expects('getUser').resolves(expectedOutput);

    await axios.get(`${t.context.prefixUrl}/v1/profile`, { headers: { Authorization: `Bearer ${token}`}})
        .then(res => {
            t.deepEqual(expectedOutput, res.data);
            t.true(getProfileCalled.called);
        });
});
