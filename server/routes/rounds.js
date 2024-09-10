import express from "express";
import {findRounds, postRound, updateRound, getRound, deleteRound } from "../controllers/rounds.js";

const router = express.Router();

router.route('/')
    .post(findRounds)
    .put(updateRound);

router.route('/:id')
    .get(getRound)
    .delete(deleteRound);

router.route('/postround')
    .post(postRound);

export { router as roundRoutes };