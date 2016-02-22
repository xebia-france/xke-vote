export function setSlots(state, slots) {
  return [...state, ...slots];
}

export function addAttendees (talk) {
  return talk;
/*
  return {...talk, attendees: talk.attendees++};
*/
}
