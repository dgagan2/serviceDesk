import passport from 'passport';
import { LocalStrategy } from './strategies/local.strategy.js';

passport.use(new LocalStrategy());
