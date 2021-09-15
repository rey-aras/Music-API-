import { GenericStaticClass, OutboundGrpcService } from 'rey-common';
import { ReyDefaultClient, ReyDefaultProtoGrpcType } from 'rey-common-model';
import { PROTO_FILE_PATH } from '../../entity/constant/api';
import ReyDefaultOutboundService from '../rey_default_outbound_service';

export class ReyDefaultOutboundImpl extends OutboundGrpcService<ReyDefaultProtoGrpcType, ReyDefaultClient> implements ReyDefaultOutboundService {
    constructor() {
        super({
            proto_path: PROTO_FILE_PATH,
            connection_string: String(process.env.DEFAULT_SERVICE_GRPC_URL)
        });
    }

    protected getService(): GenericStaticClass<ReyDefaultClient> {
        return this.proto.rey.ReyDefault;
    }

    async checkUsername(username: string): Promise<boolean> {
        this.logger.info('checking username %s', username);
        return new Promise((resolve, reject) => {
            this.client.CheckUsername({ username }, (err, result) => {
                err ? reject(err) : resolve(result!.username);
            });
        });
    }

}

export default ReyDefaultOutboundImpl;