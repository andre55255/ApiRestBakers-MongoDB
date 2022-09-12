import express, { Router } from "express";

const router: Router = Router();

router.use(express.static("public"));
router.use("/static", express.static("public"));

export default router;
