// const verifyOtp = async (req, res, next) => {
//     try {
//         const {
//             email,
//             otp,
//         } = req.body;
//         const {
//             code,
//             elements,
//             message
//         } = await verifyotp({
//             email,
//             otp
//         });
//         return res.status(code).json({
//             code,
//             message,
//             elements
//         })

//     } catch (error) {
//         next(error)
//     }
// }

// const regisUser = async (req, res, next) => {
//     try {
//         const {
//             email
//         } = req.body;
//         const {
//             code,
//             message,
//             elements
//         } = await regisuser({
//             email
//         })
//         return res.status(code).json({
//             code,
//             message,
//             elements
//         })
//     } catch (error) {
//         console.error(error)
//         next(error)
//     }
// }

// const refreshToken = async (req, res, next) => {
//     try {
//         const { refreshToken } = req.body;
//         if (!refreshToken) throw createError.BadRequest();
//         const payload = await verifyRefreshToken(refreshToken);
//         const accessToken = await signAccessToken(payload.tenant_id);
//         const refToken = await singRefreshToken(payload.tenant_id);
//         res.json({
//             accessToken,
//             refreshToken: refToken
//         })
//     } catch (error) {
//         console.error(error)
//         next(error)
//     }
// }
