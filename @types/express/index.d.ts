
import {User} from '../../src/user';

declare global{
    namespace Express {
        interface Request {
            user: User
        }
    }
}
