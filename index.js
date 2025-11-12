import flashcards from "./models/recipes.js";
import express from "express";

const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/cards", (req, res) => {
  res.render("categories", {
    title: "Kategorie",
    categories: flashcards.getCategorySummaries(),
  });
});

app.get("/cards/:category_id", (req, res) => {
  const category = flashcards.getCategory(req.params.category_id);
  if (category != null) {
    res.render("category", {
      title: category.name,
      category,
    });
  } else {
    res.sendStatus(404);
  }
});

app.get("/cards/:category_id/new", (req, res) => {
  const category_id = req.params.category_id;
  if (!flashcards.hasCategory(category_id)) {
    res.sendStatus(404);
  } else {
    res.render("new_recipe", {
      title: "Nowy przepis",
      errors: [],
      category: { id: category_id },
    });
  }
});

app.post("/cards/:category_id/new", (req, res) => {
  const category_id = req.params.category_id;
  if (!flashcards.hasCategory(category_id)) {
    return res.sendStatus(404);
  }

  const card_data = {
    dishname: req.body.dishname,
    dishtime: req.body.dishtime,
    ingredients: req.body.ingredients,
    recipie: req.body.recipie,
  };

  const errors = flashcards.validateCardData(card_data);

  if (errors.length === 0) {
    flashcards.addCard(category_id, card_data);
    res.redirect(`/cards/${category_id}`);
  } else {
    res.status(400).render("new_recipe", {
      title: "Nowy przepis",
      errors,
      ...card_data,
      category: { id: category_id },
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
