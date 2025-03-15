export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);      //req.user is alredy set in verifyJwt middleware
  } catch (error) {
    res.status(500).json({message: "internal server error"})
  }
}