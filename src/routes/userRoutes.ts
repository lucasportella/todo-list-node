import { Router } from 'express';
import { UserRepository } from '@repositories/UserRepository.js';
import { UserService } from '@services/UserService.js';
import { UserController } from 'src/controllers/UserController.js';


export function userRoutes() {
  const router = Router();
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  router.get("/all", (req, res) => controller.findAll(req, res));
  router.get("/:id", (req, res) => controller.findById(req, res));
  router.post("/email", (req, res) => controller.findByEmail(req, res));
  router.post("/", (req, res) => controller.createUser(req, res));
  router.put("/", (req, res) => controller.updateUser(req, res));
  router.delete("/:id", (req, res) => controller.deleteUser(req, res));

  return router;
}
