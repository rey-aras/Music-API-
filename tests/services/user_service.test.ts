import test from 'ava';
import * as sinon from 'sinon';
import UserService from '../../src/services/impl/user_service_impl';
import UserRepository from '../../src/repositories/impl/user_repository_impl';
import { HttpError } from 'rey-common';

test.beforeEach('Initialize New Sandbox Before Each Test', (t: any): void => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t: any): void => {
    t.context.sandbox.restore();
});

test.serial('SUCCESS, getUser case user found', async (t: any): Promise<void> => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const user = {
        id: 1,
        name: 'archie',
        clearance: 5,
        username: 'archie',
        password: 'archie',
        token_validity: '2021-10-10',
        refresh_token: '',
        created_at: '',
        updated_at: '',
    };

    const mockRepository = t.context.sandbox.mock(userRepository).expects('findOne').resolves(user);

    await userService.getUser(1)
        .then(response => {
            t.true(mockRepository.called);
            t.is(response, user);
        });
});

test.serial('FAIL, getUser case user not found', async (t: any): Promise<void> => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const mockRepository = t.context.sandbox.mock(userRepository).expects('findOne').resolves(null);

    await userService.getUser(1)
        .then(() => {
            t.fail();
        })
        .catch(err => {
            t.true(mockRepository.called);
            t.true(err instanceof HttpError.NotFoundError);
        });
});

