export const healtchCheckController = async(req, res) => {
    console.log("health check route works fine")
    res.status(200).send('connected')
}