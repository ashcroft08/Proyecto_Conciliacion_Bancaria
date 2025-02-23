import { Router } from "express"
import { getUsersAdmin, getUsersContador, getUsersAuditor, getUserAuditor, getUser, deleteUser, updateUser, updateUserAuditor, updateUserPassword } from "../controllers/user.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { editSchema, passwordSchema } from "../schemas/auth.schema.js";
import { editCaducidadSchema } from "../schemas/caducidad.schema.js";

const router = Router();

router.get("/admins", authRequired, getUsersAdmin);

router.get("/contadores", authRequired, getUsersContador);

router.get("/auditores", authRequired, getUsersAuditor);

router.get("/auditor/:cod_usuario", authRequired, getUserAuditor);

router.put("/auditor/:cod_usuario", authRequired, validateSchema(editCaducidadSchema), updateUserAuditor);

router.get("/user/:cod_usuario", authRequired, getUser)

router.put("/user/:cod_usuario", authRequired, validateSchema(editSchema), updateUser);

router.delete("/user/:cod_usuario", authRequired, deleteUser);

router.put("/password/:cod_usuario", authRequired, validateSchema(passwordSchema), updateUserPassword);

export default router;