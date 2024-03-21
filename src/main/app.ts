
import express, { Application, urlencoded, json } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import session from 'express-session';
import passport from 'passport';
import authRouter from '@voosh/routes/user/auth';
import userRouter from '@voosh/routes/user/user';

const app: Application = express();

app.set('view engine','ejs');


app.use(json());

app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: 'voosh_auth',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

app.use('/auth', authRouter)
app.use('/api/v1', userRouter)



app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Enhanced Authentication API!' });
});

app.get('/_health', (req: Request, res: Response) => {
  return res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});



// Handle 404 errors
app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Endpoint not found',
    data: null,
  });
});


export default app;