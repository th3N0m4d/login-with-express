import passport from 'passport';
import passportLocal from 'passport-local';

import UserModel, {User} from './user.model';
import {checkPassword, findUser} from './user.service';

const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.use('local',
      new LocalStrategy({
        usernameField: 'email',
      }, async (
          email: string,
          password: string,
          done: Function,
      ) => {
        try {
          const user = await findUser({email});

          if (!user) {
            return done(null, false, {message: 'User not found!'});
          }

          const isMatch = await checkPassword(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        } catch (error) {
          return done(error);
        }
      }));


  passport.serializeUser((user: User, done: Function)=>{
    done(null, user);
  });

  passport.deserializeUser((id: any, done: Function)=> {
    UserModel.findById(id, (err: any, user: User)=> {
      done(err, user);
    });
  });
};
