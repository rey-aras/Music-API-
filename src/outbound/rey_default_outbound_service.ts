
export interface ReyDefaultOutboundService {
    checkUsername(username: string): Promise<boolean>
}

export default ReyDefaultOutboundService;
