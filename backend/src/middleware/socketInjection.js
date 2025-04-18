export function injectIO(io) {
  return (req, res, next) => {
    req.io = io;
    next();
  };
}
