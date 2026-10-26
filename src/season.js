// =====================================================================
//  SEASON INFO: the only file to edit when hours or news change.
//  Everything on the page that says what's happening this season
//  (open/closed badge, hours board, "farm notes", what's in the cooler)
//  reads from here. Newest note goes FIRST in `notes`.
// =====================================================================

export const SEASON = {
  // Shown on the chalkboard in the hero.
  name: "Fall 2026",
  hoursTitle: "Fall hours",

  // Last open day of the season (YYYY-MM-DD). After this date the board
  // switches to the off-season message below.
  openThrough: "2026-12-19",
  openThroughLabel: "Open daily through December 19",

  // Hours by weekday. Use 24-hour numbers for open/close, or null if closed.
  hours: [
    { day: "Monday", open: 11, close: 18 },
    { day: "Tuesday", open: 11, close: 18 },
    { day: "Wednesday", open: 11, close: 18 },
    { day: "Thursday", open: 11, close: 18 },
    { day: "Friday", open: 10, close: 18 },
    { day: "Saturday", open: 10, close: 18 },
    { day: "Sunday", open: 12, close: 18 },
  ],

  // Short lines under the hours.
  quickFacts: [
    "Always free admission",
    "Hayrides on weekends or by appointment",
    "Food & concessions on weekends, limited during the week",
    "Carside service: call ahead or on arrival",
  ],

  // Apples currently in the cooler (leave empty [] to hide the line).
  inTheCooler: ["Jonathan", "Honeycrisp", "Chieftain", "Enterprise", "Blushing Golden"],

  // Shown after `openThrough`, until the next season is entered above.
  offSeason: {
    title: "See you next season",
    text: "The gift shop is open year round and baked goods can be ordered ahead. Call for an appointment any time.",
  },

  // Farm notes, newest first. `date` is YYYY-MM-DD.
  notes: [
    {
      date: "2026-10-23",
      title: "Nearing the end of apple season",
      text: "It has been a rough year with few apples. There are still apples to pick, but you will need to hunt for them! There are several varieties still available in the cooler, including Jonathan, Honeycrisp, Chieftain, Enterprise, Blushing Golden and a few others. We have a few mums left and we are fully stocked up on pumpkins, squash and gourds! It is beautiful weather to take a stroll and visit the animals! Take a hayride and get some tasty treats! We will be open daily through December 19!",
    },
    {
      date: "2026-09-08",
      title: "Apple season is in full swing",
      text: "We are now picking Honeycrisp, McIntosh, Gala, Cortland, Honey Gold and Jonathan apples!! Come and pick early in the season for the best selection! We have a large variety of Mums and specialty pumpkins for fall decorating! Hope to see you all soon!!",
    },
    {
      date: "2026-08-24",
      title: "It is officially apple season!",
      text: "Honeycrisp are ready to pick and many more ripening in the next couple of weeks! Unfortunately, due to late frost during blossom, we have had a significant loss to our apple crop. The good news is, most varieties will still be available, some more than others. We will have caramel apples and cider donuts available daily, as well as apple crisps on most days. The Apple Wagon food truck will be open on weekends and on other occasions. We have fun new photo ops this year! Can't wait to see you all!",
    },
    {
      date: "2026-05-18",
      title: "Open with summer hours",
      text: "Gift shop is open daily. We have lots of farm fresh chicken and duck eggs. Chicks and ducklings are available and occasional bunnies. Fresh produce is starting to come in. Gardens are still being planted. Hanging baskets, flowers, bedding plants, trees and more are available. As always, you are welcome to come out to just relax, let the kids play or have some animal therapy!!",
    },
  ],
};
