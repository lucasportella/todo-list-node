import { Router } from "express";
import { TodosController } from "src/controllers/TodosController.js";
import { TodosService } from "@services/TodosService.js";
import { TodosRepository } from "@repositories/TodosRepository.js";

const router = Router({ mergeParams: true });

export const todosRoutes = () => {
  const todosRepository = new TodosRepository();
  const todosService = new TodosService(todosRepository);
  const todosController = new TodosController(todosService);

  router.get("/", async (req, res) => await todosController.findAll(req, res))
  router.get("/:id", async (req, res) => await todosController.findById(req, res))
  router.post("/create", async (req, res) => await todosController.createTodo(req, res))
  router.put("/:id", async (req, res) => await todosController.updateTodo(req, res))
  router.delete("/:id", async (req, res) => await todosController.deleteTodo(req, res))

  return router;
}