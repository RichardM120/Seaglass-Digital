// Velo page code for the PUSH casting call page.
//
// Put this in the Wix Editor's code panel for that page (Dev Mode on, then the
// page's own code file — not masterPage / site code, so it only runs here).
//
// It listens for the height the embed reports and resizes the HTML component to
// match, so the page grows with its content instead of scrolling inside a fixed
// box. Change '#html1' if your element has a different ID — the editor shows the
// ID when the element is selected.

$w.onReady(function () {
  const embed = $w('#html1');

  embed.onMessage((event) => {
    const message = event.data;

    // Ignore anything that isn't our height report. Other embeds and Wix apps
    // post messages too, and acting on those would resize the box at random.
    if (!message || message.type !== 'pushCastingHeight') {
      return;
    }

    const height = Number(message.height);
    if (!Number.isFinite(height) || height <= 0) {
      return;
    }

    // Clamp: a runaway value would stretch the page to nothing useful, and a
    // tiny one would collapse the embed before it has finished rendering.
    embed.height = Math.min(Math.max(Math.round(height), 400), 6000);
  });
});
