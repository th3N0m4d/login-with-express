
import {User} from '../../src/user.model';

declare global{
    namespace Express {
        interface Request {
            user: User
        }
    }
}
