import passport from 'passport';
import passportLocal from 'passport-local';

import UserModel, {User} from './user.model';
import {checkPassword} from './services';

const LocalStrategy = passportLocal.Strategy;


export default () => {
  passport.use('local',
      new LocalStrategy({
        usernameField: 'email',
      }, (
          email: string,
          password: string,
          done: Function,
      ) => {
        UserModel.findOne({email}, async (err, user)=> {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, {message: 'User not found!'});
          }

          try {
            const isMatch = await checkPassword(password, user.password);
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Invalid password'});
            }
          } catch (error) {
            return done(error);
          }
        });
      }));

  passport.serializeUser((user: User, done: Function)=>{
    done(null, user._id);
  });

  passport.deserializeUser((id: any, done: Function)=> {
    UserModel.findById(id, (err: any, user: User)=> {
      done(err, user);
    });
  });
};
