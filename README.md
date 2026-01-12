# Fold Properties By Default

I have seen people on the official forums who have been wanting to have the metadata/frontmatter properties folded by default. I think this should be implemented as a built-in option, but for the time being, I came up with a simple way to achieve the same behavior.

There are no settings; it basically just checks if the metadata properties are unfolded. If they are, then I call the built-in command to toggle them to their folded state.

**Especially useful to those who want to keep properties out of the way without hiding them entirely.**

## Known Issues / Potential Improvements

- Properties don't automatically fold when creating a new note which I believe is useful since you might want to enter some before folding them. Don't hesitate to suggest otherwise if that's how you feel like and I might consider implementing an automatic folding feature setting for new notes.

## Installation

- Go to Obsidian's settings page.
- Open Community plugins settings page, click on the Browse button.
- Search for "Fold Properties By Default" in the search bar and find the plugin with this exact name.
- Click on the Install button.

---

## Updates

### v1.0.9 - Race Condition Fix

Fixed an issue where properties would remain unfolded on some notes. The `file-open` event fires before the DOM is fully rendered, causing the fold command to fail silently. Now uses `MutationObserver` to wait for DOM readiness, plus:

- Added `layout-change` event handler for tab switches
- Added `onLayoutReady()` wrapper per Obsidian best practices
- Added `onunload()` cleanup to prevent memory leaks
