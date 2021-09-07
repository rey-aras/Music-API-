import { Person } from '../entity/dto/outbound';

export interface StarwarsOutboundService {
    getPersonById(id: number): Promise<Person>;
}

export default StarwarsOutboundService;
