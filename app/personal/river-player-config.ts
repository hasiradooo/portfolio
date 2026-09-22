/** Use a same-origin audio file (or a CORS-enabled URL) for a real spectrum.
 * Only supply a track you have permission to host. Leaving audioSrc null uses
 * the official YouTube video with its own visible player and controls.
 */
export const RIVER_PLAYER: { youtubeId: string; audioSrc: string | null } = {
  youtubeId: "wfWIs2gFTAM",
  audioSrc: null,
};
