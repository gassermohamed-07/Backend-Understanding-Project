import { Router } from "express";
import  { createWorkspace, listWorkspaces, getWorkspace, updateWorkspace, deleteWokspace}  from "../controllers/workspace.controller.js";
import  auth  from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/permission.middleware.js";
import { createBoard, getBoard, listBoards, updateBoard } from "../controllers/board.controller.js";

const workspaceRouter = Router();


//Workspaces Routes
workspaceRouter.post("/", auth, createWorkspace);
workspaceRouter.get("/", auth, listWorkspaces)
workspaceRouter.get("/:workspaceId", auth, requireRole(["owner", "member", "admin"]), getWorkspace);
workspaceRouter.patch("/:workspaceId", auth, requireRole(["owner", "admin"]), updateWorkspace);
workspaceRouter.delete("/:workspaceId", auth, requireRole(["owner", "admin"]), deleteWokspace);

//Boards Routes
workspaceRouter.post("/:workspaceId/boards", auth, requireRole(["owner", "member", "admin"]), createBoard);
workspaceRouter.get("/:workspaceId/boards", auth, requireRole(["owner", "member", "admin"]), listBoards);
workspaceRouter.get("/:workspaceId/boards/:boardId", auth, requireRole(["owner", "member", "admin"]), getBoard);
workspaceRouter.patch("/:workspaceId/boards/:boardId", auth, requireRole(["owner", "member", "admin"]), updateBoard);



export default workspaceRouter;