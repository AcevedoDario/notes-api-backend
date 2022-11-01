const notesRouter = require("express").Router();
const User = require("../models/User");
const Note = require("../models/Note");
const jwt = require("jsonwebtoken");
const e = require("express");

//Get all notes
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(notes);
});

//Get a specific note
notesRouter.get("/:id", (request, response, next) => {
  const { id } = request.params;

  Note.findById(id)
    .then((note) => {
      if (note) {
        return response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Update a specific note
notesRouter.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const note = request.body;

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) => {
    response.json(result);
  });
});

//Delete a note
notesRouter.delete("/:id", (request, response, next) => {
  const { id } = request.params;

  Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(next);
});

//Post a new note
notesRouter.post("/", async (request, response) => {
  const { content, important = false } = request.body;

  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {}

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const { id: userId } = decodedToken;
  const user = await User.findById(userId);
  //Check content is not empty
  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing',
    });
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id,
  });

  try {
    const savedNote = await newNote.save();

    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
