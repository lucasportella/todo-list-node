import { Router } from 'express';
import { UserRepository } from '@repositories/UserRepository.js';
import { UserService } from '@services/UserService.js';
import { UserController } from 'src/controllers/UserController.js';


export function userRoutes() {
  const router = Router();
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  router.get("/all", async (req, res) => await controller.findAll(req, res));
  router.get("/:id", async (req, res) => await controller.findById(req, res));
  router.post("/email", async (req, res) => await controller.findByEmail(req, res));
  router.post("/", async (req, res) => await controller.createUser(req, res));
  router.put("/", async (req, res) => await controller.updateUser(req, res));
  router.delete("/:id", async (req, res) => await controller.deleteUser(req, res));

  return router;
}
