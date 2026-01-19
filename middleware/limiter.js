import rateLimit from 'express-rate-limit';

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'Too many OTP requests, try again later',
});

export const testLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: 'Too many test submissions, slow down',
});
