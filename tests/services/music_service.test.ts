import test from 'ava';
import * as sinon from 'sinon';
import MusicServiceImpl from '../../src/services/impl/music_service_impl';
import MusicRepositoryImpl from '../../src/repositories/impl/music_repository_impl';
import { HttpError } from 'rey-common';
import { MUSIC } from '../variables/music_variable';
import { MusicProperties } from '../../src/entity/models/music';
import { NotFoundError } from 'rey-common/modules/utils/http_error';

const musicService = new MusicServiceImpl(new MusicRepositoryImpl());

test.beforeEach('Initialize New Sandbox Before Each Test', (t: any): void => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t: any): void => {
    t.context.sandbox.restore();
});

test.serial('Get all music - success', async (t: any): Promise<void> => {
    const expectedResult = [MUSIC];
    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('findAll')
        .resolves(expectedResult);

    await musicService
        .getMusicAll()
        .then((actualResult: MusicProperties[]): void => {
            t.true(mockMusic.called);
            t.deepEqual(actualResult, expectedResult);
            t.is(actualResult.length, 1);
        })
        .catch((err: any): void => {
            t.fail(err.message);
        });
});

test.serial('Get music by id - success', async (t: any) => {
    const expectedResult = MUSIC;
    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('findOne')
        .resolves(expectedResult);

    await musicService
        .getMusicById(MUSIC.music_id)
        .then((actualResult: MusicProperties): void => {
            t.true(mockMusic.called);
            t.deepEqual(actualResult, expectedResult);
        })
        .catch((err: any): void => {
            t.fail(err.message);
        });
});

test.serial('Get music by id - not found', async (t: any) => {
    const expectedResult = null;
    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('findOne')
        .resolves(expectedResult);

    await musicService
        .getMusicById('not-found')
        .then((actualResult: MusicProperties): void => {
            t.fail();
        })
        .catch((err: any): void => {
            t.true(mockMusic.called);
            t.true(err instanceof NotFoundError);
            t.is(err.message, 'music not found');
        });
});

test.serial('Add music - success', async (t: any) => {
    const expectedResult = MUSIC;
    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('create')
        .resolves(expectedResult);

    await musicService
        .addMusic(MUSIC)
        .then((actualResult: MusicProperties): void => {
            t.true(mockMusic.called);
            t.deepEqual(actualResult, expectedResult);
        })
        .catch((err: any): void => {
            t.fail(err.message);
        });
});

test.serial('Update music - success', async (t: any) => {
    const expectedResult = MUSIC;
    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('update')
        .resolves(expectedResult);

    const mockMusicById = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('findOne')
        .resolves(expectedResult);

    await musicService
        .updateMusic(MUSIC.id, { ...MUSIC, title: 'new title' })
        .then((actualResult: MusicProperties): void => {
            t.true(mockMusic.called);
            t.true(mockMusicById.called);
            t.deepEqual(actualResult, expectedResult);
        })
        .catch((err: any): void => {
            t.fail(err.message);
        });
});

test.serial('Update music - not found', async (t: any) => {
    const expectedResult = null;
    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('update')
        .resolves(expectedResult);

    const mockMusicById = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('findOne')
        .resolves(expectedResult);

    await musicService
        .updateMusic('not-found', { ...MUSIC, title: 'new title' })
        .then((): void => {
            t.fail();
        })
        .catch((err: any): void => {
            t.true(mockMusic.notCalled);
            t.true(mockMusicById.called);
            t.true(err instanceof NotFoundError);
            t.is(err.message, 'Music not found');
        });
});

test.serial('Delete music - success', async (t: any) => {
    const expectedResult = { id: MUSIC.id };

    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('delete')
        .resolves();

    const mockMusicById = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('findOne')
        .resolves(expectedResult);

    await musicService
        .deleteMusic(MUSIC.id)
        .then((actualResult: void): void => {
            t.true(mockMusic.called);
            t.true(mockMusicById.called);
            t.deepEqual(actualResult, expectedResult);
        })
        .catch((err: any): void => {
            t.fail(err.message);
        });
});

test.serial('Delete music - not found', async (t: any) => {
    const expectedResult = null;

    const mockMusic = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('delete')
        .resolves();

    const mockMusicById = t.context.sandbox
        .mock(MusicRepositoryImpl.prototype)
        .expects('findOne')
        .resolves(expectedResult);

    await musicService
        .deleteMusic('not-found')
        .then((actualResult: void): void => {
            t.fail();
        })
        .catch((err: any): void => {
            t.true(mockMusic.notCalled);
            t.true(mockMusicById.called);
            t.true(err instanceof NotFoundError);
            t.is(err.message, 'Music not found');
        });
});