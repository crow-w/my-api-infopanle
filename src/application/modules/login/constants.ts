export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'xxxxxxxxxxxx',
  expiresIn: process.env.JWT_EXPIRESIN || '2 days',
};
