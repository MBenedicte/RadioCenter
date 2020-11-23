import usersRoutes from './Users.Route';
import { Router } from 'express';

const app = Router();

app.use('/v1', usersRoutes);

export default app;