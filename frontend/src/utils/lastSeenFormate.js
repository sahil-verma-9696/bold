export function lastSeenFormate(lastSeen) {
  const date = new Date(lastSeen);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "2-digit",
    weekday: "short",
  };
  const formatted = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formatted;
}
