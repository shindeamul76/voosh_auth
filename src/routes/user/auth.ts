import express, { Request, Response, Router } from 'express';
import passport from 'passport';
import '@voosh/lib/service-providers/google'
import '@voosh/lib/service-providers/twitter'

const router: Router = express.Router();

/* Google Authentication */ 

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    res.redirect('/_health');
  }
);

/* Twitter Authentication */ 

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    res.redirect('/_health');
  }
);

/* Logout Session */

router.get('/logout', (req: Request, res: Response) => {
  req.logout(() => {});
  res.redirect('/');
});


export default router;
