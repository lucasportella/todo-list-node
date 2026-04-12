import { Router } from "express";
import { TodosController } from "#controllers/TodosController";
import { TodosService } from "#services/TodosService";
import { TodosRepository } from "#repositories/TodosRepository";

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