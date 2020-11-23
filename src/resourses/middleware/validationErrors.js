import { isCelebrate } from 'celebrate';
import { BAD_REQUEST } from '../../constants/statusCodes';

const validationErrors = () => (err, req, res, next) => {
  if (!isCelebrate(err)) {
    return next(err);
    };

  const errors = err.joi.details || [];

  const message = 'Bad Request';

    return res.status(BAD_REQUEST).json({
    status: BAD_REQUEST,
    message: errors.length && errors[0] ? errors[0].message || message : message,
    errors,
  });
};

export default validationErrors;
