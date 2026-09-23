export const BIRTH_DATE = "2001-07-11";

/** Calendar arithmetic avoids shifting a date-only birthday across time zones. */
export function personalAge(now = new Date()): number {
  const [year, month, day] = BIRTH_DATE.split("-").map(Number);
  const birthdayAhead = now.getMonth() + 1 < month ||
    (now.getMonth() + 1 === month && now.getDate() < day);
  return now.getFullYear() - year - Number(birthdayAhead);
}

// Set this to a local public/ asset path when the fursona artwork is available.
export const FURSONA_IMAGE: string | null = null;

// Replace the photo and set isExample to false when adding your own collection.
export const MINERAL_PHOTO = {
  src: "/scrapbook/mineral.webp",
  alt: "Bright blue Chalcanthite",
  isExample: false,
};

export const favoriteBands = [
  { name: "Three Days Grace", image: "three-days-grace", url: "https://threedaysgrace.com", note: "3DG ♡", rotation: "-5deg" },
  { name: "Five Finger Death Punch", image: "five-finger-death-punch", url: "https://fivefingerdeathpunch.com", note: "a little heavier…", rotation: "3deg" },
  { name: "Skillet", image: "skillet", url: "https://www.skillet.com", note: "always on repeat", rotation: "-2deg" },
  { name: "Disturbed", image: "disturbed", url: "https://www.disturbed1.com", note: "yes. absolutely yes.", rotation: "4deg" },
  { name: "Powerwolf", image: "powerwolf", url: "https://www.powerwolf.net", note: "very normal about them", rotation: "-3deg" },
  { name: "Trivium", image: "trivium", url: "https://www.trivium.org", note: "one more song?", rotation: "5deg" },
] as const;


export const favoriteGames = [
  { name: "Left 4 Dead 2", image: "/scrapbook/games/left-4-dead-2.webp", url: "https://store.steampowered.com/app/550/Left_4_Dead_2/", note: "a little co-op chaos", rotation: "-3deg" },
  { name: "Rocket League", image: "/scrapbook/games/rocket-league.webp", url: "https://www.rocketleague.com/", note: "cars. a ball. one more match.", rotation: "3deg" },
  { name: "Deadlock", image: "/scrapbook/games/deadlock.webp", url: "https://store.steampowered.com/app/1422450/Deadlock/", note: "see you in the next match", rotation: "-2deg" },
  { name: "Half-Life 2", image: "/scrapbook/games/half-life-2.webp", url: "https://store.steampowered.com/app/220/HalfLife_2/", note: "actually, every Half-Life. all of them.", rotation: "4deg" },
] as const;
