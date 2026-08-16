import { Router } from "express";
import  { createWorkspace, listWorkspaces, getWorkspace, updateWorkspace, deleteWorkspace}  from "../controllers/workspace.controller.js";
import  auth  from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/permission.middleware.js";
import { createBoard, deleteBoard, getBoard, listBoards, updateBoard } from "../controllers/board.controller.js";
import { createTask, listTasks, getTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const workspaceRouter = Router();


//Workspaces Routes
workspaceRouter.post("/", auth, createWorkspace);
workspaceRouter.get("/", auth, listWorkspaces)
workspaceRouter.get("/:workspaceId", auth, requireRole(["owner", "member", "admin"]), getWorkspace);
workspaceRouter.patch("/:workspaceId", auth, requireRole(["owner", "admin"]), updateWorkspace);
workspaceRouter.delete("/:workspaceId", auth, requireRole(["owner", "admin"]), deleteWorkspace);

//Boards Routes
workspaceRouter.post("/:workspaceId/boards", auth, requireRole(["owner", "member", "admin"]), createBoard);
workspaceRouter.get("/:workspaceId/boards", auth, requireRole(["owner", "member", "admin"]), listBoards);
workspaceRouter.get("/:workspaceId/boards/:boardId", auth, requireRole(["owner", "member", "admin"]), getBoard);
workspaceRouter.patch("/:workspaceId/boards/:boardId", auth, requireRole(["owner", "member", "admin"]), updateBoard);
workspaceRouter.delete("/:workspaceId/boards/:boardId", auth, requireRole(["owner", "admin"]), deleteBoard);

//Tasks Routes

workspaceRouter.post("/:workspaceId/boards/:boardId/tasks", auth, requireRole(["owner", "member", "admin"]), createTask);
workspaceRouter.get("/:workspaceId/boards/:boardId/tasks", auth, requireRole(["owner", "member", "admin"]), listTasks);
workspaceRouter.get("/:workspaceId/boards/:boardId/tasks/:taskId", auth, requireRole(["owner", "member", "admin"]), getTask);
workspaceRouter.patch("/:workspaceId/boards/:boardId/tasks/:taskId", auth, requireRole(["owner", "member", "admin"]), updateTask);
workspaceRouter.delete("/:workspaceId/boards/:boardId/tasks/:taskId", auth, requireRole(["owner", "admin"]), deleteTask);

export default workspaceRouter;