import { MUSIC } from '../variables/music_variable';
import test from 'ava';
import * as sinon from 'sinon';
import * as http from 'http';
import * as listen from 'test-listen';
import { default as axios } from 'axios';

import App from '../../src/app';
import MusicServiceImpl from '../../src/services/impl/music_service_impl';

test.beforeEach('Initialize New Sandbox Before Each Test', async (t: any) => {
    t.context.sandbox = sinon.createSandbox();
    t.context.sandbox.stub(App.prototype, 'initProviders').resolves();

    const app = new App({port: 0 });
    await app.initialize();

    t.context.server = http.createServer(app.getInstance());
    t.context.prefixUrl = await listen(t.context.server);
});

test.afterEach.always('Restore Sandbox  and Configuration After Each Test', (t: any) => {
    t.context.sandbox.restore();
    t.context.server.close();
});

test.serial('Get all music - success', async (t: any) => {
    const expectedResult = [MUSIC];
    const mockMusicService = t.context.sandbox
        .mock(MusicServiceImpl.prototype)
        .expects('getMusicAll')
        .resolves(expectedResult);

    const url = `${t.context.prefixUrl}/v1/music`;
    const res = await axios.get(url);

    t.true(mockMusicService.called);
    t.deepEqual(res.data, expectedResult);
    t.is(res.data.length, 1);
});

test.serial('Get music by id - success', async (t: any) => {
    const expectedResult = MUSIC;
    const mockMusicService = t.context.sandbox
        .mock(MusicServiceImpl.prototype)
        .expects('getMusicById')
        .resolves(expectedResult);

    const url = `${t.context.prefixUrl}/v1/music/1`;
    const res = await axios.get(url);

    t.true(mockMusicService.called);
    t.deepEqual(res.data, expectedResult);
});

test.serial('Get music by id - not found', async (t: any) => {
    const expectedResult = null;
    const mockMusicService = t.context.sandbox
        .mock(MusicServiceImpl.prototype)
        .expects('getMusicById')
        .resolves(expectedResult);

    const url = `${t.context.prefixUrl}/v1/music/1`;
    const res = await axios.get(url);

    t.true(mockMusicService.called);
    t.deepEqual(res.data, expectedResult);
});

test.serial('Add music - success', async (t: any) => {
    const expectedResult = MUSIC;
    const mockMusicService = t.context.sandbox
        .mock(MusicServiceImpl.prototype)
        .expects('addMusic')
        .resolves(expectedResult);

    const url = `${t.context.prefixUrl}/v1/music`;
    const res = await axios.post(url, MUSIC);

    t.true(mockMusicService.called);
    t.deepEqual(res.data, expectedResult);
});

test.serial('Update music - success', async (t: any) => {
    const expectedResult = MUSIC;
    const mockMusicService = t.context.sandbox
        .mock(MusicServiceImpl.prototype)
        .expects('updateMusic')
        .resolves(expectedResult);

    const url = `${t.context.prefixUrl}/v1/music/1`;
    const res = await axios.put(url, MUSIC);

    t.true(mockMusicService.called);
    t.deepEqual(res.data, expectedResult);
});


test.serial('Delete music - success', async (t: any) => {
    const expectedResult = MUSIC;

    const mockMusicService = t.context.sandbox
        .mock(MusicServiceImpl.prototype)
        .expects('deleteMusic')
        .resolves(expectedResult);

    const url = `${t.context.prefixUrl}/v1/music/1`;
    const res = await axios.delete(url);

    t.true(mockMusicService.called);
    t.deepEqual(res.data, expectedResult);
});