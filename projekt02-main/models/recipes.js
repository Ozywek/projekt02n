const card_categories = {
  "sniadania": {
    name: "Śniadania",
    cards: [
      {
        dishname: "Jajka po florencku na grzance",
        dishtime: "15 minut",
        ingredients: "2 jajka, 2 kromki chleba tostowego, szpinak, masło, śmietana, sól, pieprz, gałka muszkatołowa",
        recipie: "Na patelni rozpuść masło i podsmaż szpinak przez ok. 2 minuty, aż zwiędnie. Dopraw solą i pieprzem. W tym czasie zrób grzanki — możesz je lekko przypiec na suchej patelni lub w tosterze. Ugotuj jajka w koszulkach lub usmaż je sadzone. Ułóż szpinak na grzankach, na wierzch połóż jajko. Skrop delikatnie śmietanką lub oliwą, posyp odrobiną gałki muszkatołowej."
      },
    ],
  },

  "obiady": {
    name: "Obiady",
    cards: [
      {
        dishname: "Spaghetti bolognese",
        dishtime: "30 minut",
        ingredients: "200 g makaronu spaghetti, 200 g mięsa mielonego wołowego, 1 cebula, 2 ząbki czosnku, 200 ml passaty pomidorowej, oliwa, sól, pieprz, bazylia, oregano, parmezan",
        recipie: "Na rozgrzanej oliwie zeszklij posiekaną cebulę i czosnek. Dodaj mięso mielone i smaż, aż się zarumieni. Wlej passatę pomidorową, dopraw ziołami, solą i pieprzem. Gotuj 15 minut na małym ogniu. W tym czasie ugotuj makaron. Połącz wszystko i podawaj posypane parmezanem."
      },
      {
        dishname: "Kurczak w sosie śmietanowo-pieczarkowym",
        dishtime: "25 minut",
        ingredients: "2 filety z kurczaka, 200 g pieczarek, 200 ml śmietanki 18%, 1 cebula, masło, sól, pieprz, natka pietruszki",
        recipie: "Pokrój kurczaka w kostkę, dopraw solą i pieprzem, podsmaż na maśle. Dodaj pokrojone pieczarki i cebulę, smaż do zrumienienia. Wlej śmietankę, duś na małym ogniu 10 minut. Posyp pietruszką i podawaj z ryżem lub makaronem."
      },
      {
        dishname: "Zupa pomidorowa z makaronem",
        dishtime: "20 minut",
        ingredients: "1 l bulionu drobiowego, 300 ml passaty pomidorowej, 1 łyżka masła, 1 łyżka śmietany, makaron, sól, pieprz, cukier, natka pietruszki",
        recipie: "W garnku podgrzej bulion, dodaj passatę pomidorową i masło. Gotuj 10 minut. Dopraw solą, pieprzem i szczyptą cukru. Dodaj łyżkę śmietany i wymieszaj. Podawaj z ugotowanym makaronem i natką pietruszki."
      },
      {
        dishname: "Kotlet schabowy z ziemniakami i surówką",
        dishtime: "35 minut",
        ingredients: "2 plastry schabu, 1 jajko, bułka tarta, mąka, sól, pieprz, olej do smażenia, ziemniaki, kapusta kiszona",
        recipie: "Rozbij schabowe tłuczkiem, dopraw solą i pieprzem. Obtocz w mące, jajku i bułce tartej. Smaż na złoty kolor z obu stron. Podawaj z ugotowanymi ziemniakami i surówką z kiszonej kapusty."
      },
    ],
  },

  "kolacje": {
    name: "Kolacje",
    cards: [
      {
        dishname: "Sałatka grecka z kurczakiem",
        dishtime: "15 minut",
        ingredients: "200 g piersi z kurczaka, sałata, pomidory, ogórek, czerwona cebula, oliwki, feta, oliwa, sól, pieprz, oregano",
        recipie: "Kurczaka pokrój w kostkę i podsmaż na oliwie, dopraw solą i pieprzem. W misce wymieszaj sałatę, pokrojone pomidory, ogórka, cebulę i oliwki. Dodaj kurczaka i pokruszoną fetę. Skrop oliwą i posyp oregano."
      },
      {
        dishname: "Omlet z warzywami",
        dishtime: "10 minut",
        ingredients: "3 jajka, papryka, cukinia, cebula, sól, pieprz, masło lub oliwa",
        recipie: "Warzywa pokrój w drobną kostkę i podsmaż na patelni. W misce roztrzep jajka, dopraw solą i pieprzem. Wlej jajka na warzywa i smaż pod przykryciem 5–7 minut, aż omlet się zetnie."
      },
      {
        dishname: "Tosty z awokado i łososiem",
        dishtime: "10 minut",
        ingredients: "2 kromki chleba, 1 awokado, 50 g wędzonego łososia, sól, pieprz, cytryna",
        recipie: "Awokado rozgnieć widelcem, dopraw solą, pieprzem i sokiem z cytryny. Posmaruj kromki chleba pastą z awokado, na wierzch połóż plastry łososia. Podawaj od razu."
      },
    ],
  },
};


export function getCategorySummaries() {
  return Object.entries(card_categories).map(([id, category]) => {
    return { id, name: category.name };
  });
}

export function hasCategory(categoryId) {
  return card_categories.hasOwnProperty(categoryId);
}

export function getCategory(categoryId) {
  if (hasCategory(categoryId))
    return { id: categoryId, ...card_categories[categoryId] };
  return null;
}

export function addCard(categoryId, card) {
  if (hasCategory(categoryId)) card_categories[categoryId].cards.push(card);
}

export function validateCardData(card) {
  let errors = [];
  const fields = ["dishname", "dishtime", "ingredients", "recipie"];
  for (let field of fields) {
    if (!card.hasOwnProperty(field)) errors.push(`Missing field '${field}'`);
    else {
      if (typeof card[field] !== "string")
        errors.push(`'${field}' expected to be string`);
      else if (card[field].length < 1 || card[field].length > 1000)
        errors.push(`'${field}' expected length: 1–1000`);
    }
  }
  return errors;
}

export default {
  getCategorySummaries,
  hasCategory,
  getCategory,
  addCard,
  validateCardData,
};
