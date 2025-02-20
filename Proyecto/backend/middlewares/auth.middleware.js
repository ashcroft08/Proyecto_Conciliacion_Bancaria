import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    try {
        const token = req.cookies.token; // Asegúrate de que "token" coincide con el nombre que usaste en `res.cookie`

        if (!token)
            return res.status(401).json({ message: "No token, authorization denied" });

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(403).json({ message: "Invalid token" });

            req.user = user; // Opcional: puedes añadir el usuario al objeto `req` para usarlo en otros endpoints

            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};