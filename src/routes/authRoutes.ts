import { AuthController } from "#controllers/AuthController";
import { AuthService } from "#services/AuthService";
import { AuthRepository } from "#repositories/AuthRepository";
import { Router } from "express";


export const authRoutes = () => {
  const authRepository = new AuthRepository();
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);

  const router = Router();

  router.post("/login", async (req, res) => await authController.login(req, res))

  return router;
}
