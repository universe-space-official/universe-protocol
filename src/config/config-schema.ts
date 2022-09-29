import * as Joi from 'joi';
import { AppEnvs } from '../constants';

export const configSchema = Joi.object({
  APP_ENV: Joi.string()
    .valid(AppEnvs.DEVELOPMENT, AppEnvs.TEST, AppEnvs.PRODUCTION)
    .required(),

  PORT: Joi.number().when('APP_ENV', {
    is: AppEnvs.DEVELOPMENT,
    then: Joi.required(),
  }),

  SENTRY_DSN: Joi.string().when('APP_ENV', {
    is: AppEnvs.PRODUCTION,
    then: Joi.required(),
  }),

  // Set this to any value to force sentry to turn on debug mode
  SENTRY_DEBUG: Joi.any().optional(),
  DISABLE_SENTRY: Joi.boolean().optional(),

  // In seconds
  THROTTLE_TTL: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),
  DISABLE_RATE_LIMITING: Joi.boolean().optional(),
});
