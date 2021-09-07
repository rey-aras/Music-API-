import { OutboundService } from 'rey-common';
import { Person } from '../../entity/dto/outbound';
import StarwarsOutboundService from '../starwars_outbound_service';

export class StarwarsOutboundServiceImpl extends OutboundService implements StarwarsOutboundService {
    constructor(){
        super(process.env.SERVICE_STARWARS_URL as string);
    }

    async getPersonById(id: number): Promise<Person> {
        return this.caller.get(`/people/${id}?format=json`)
            .then(response => response.data);
    }

}

export default StarwarsOutboundServiceImpl;
