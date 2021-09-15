import { GrpcHandler } from 'rey-common';
import { ReyDefaultDefinition, ReyDefaultHandlers, ReyDefaultProtoGrpcType } from 'rey-common-model';
import { PROTO_FILE_PATH } from '../entity/constant/api';
import UserRepository from '../repositories/user_repository';

export class ReyDefaultGrpcHandler extends GrpcHandler<ReyDefaultHandlers, ReyDefaultProtoGrpcType> {
    constructor(
        private userRepo: UserRepository
    ) {
        super(PROTO_FILE_PATH);
    }

    getHandlers(): ReyDefaultHandlers {
        return {
            CheckUsername: (call, callback) => {
                this.userRepo
                    .findOne({ username: call.request.username })
                    .then(user => callback(null, { username: !!user }))
                    .catch(err => callback(err, null));
            }
        };
    }

    getServiceDefinition(): ReyDefaultDefinition {
        return this._proto.rey.ReyDefault.service;
    }

}

export default ReyDefaultGrpcHandler;
