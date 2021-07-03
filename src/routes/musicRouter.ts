import express from "express";
import { AlbumController } from "../controller/music/AlbumController";
import { GenreController } from "../controller/music/GenreController";
import { MusicController } from "../controller/music/MusicController";

export const musicRouter = express.Router();

const musicController = new MusicController();
const albumController = new AlbumController();
const genreController = new GenreController();


musicRouter.post("/create", musicController.createMusic);
musicRouter.get("/feed", musicController.getAllMusics);
musicRouter.get("/all", musicController.getUSerMusics);
musicRouter.post("/createAlbum", albumController.createAlbum);
musicRouter.get("/albums", albumController.getUserAlbums);
musicRouter.post("/createGenre", genreController.createGenre);
musicRouter.get("/genres", genreController.getAllGenres);
musicRouter.get("/:id", musicController.getMusicDetail);
