// assign avatar for each unique player using hash function
function getAvatar (player) {
  let hash = 0;

  if (player.length === 0) return hash;

  for (let i = 0; i < player.length; i++) {
    const char = player.charCodeAt(i);
    hash = Math.pow(((hash + char) % 100), 5);
  }
  return hash % 6;
}

export default getAvatar;
