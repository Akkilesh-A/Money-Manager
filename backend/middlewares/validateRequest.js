const validateRequest = (zodSchema) => {
  return (req, res, next) => {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
};

export default validateRequest;
