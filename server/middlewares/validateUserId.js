const validateUserId = (req, res, next) => {
  const paramId = parseInt(req.params.userId, 10);
  const loggedInUserId = parseInt(req.user.id, 10);
  if (paramId === loggedInUserId) {
    return next();
  }
  return res.status(403).send({
    message: 'Unauthorised access, request denied',
  });
};

export default validateUserId;
