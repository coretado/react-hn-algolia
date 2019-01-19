const formatTime = (days, months, years) => {
  if (years > 0) {
    return `${years} year(s) ago`;
  } else if (months > 0) {
    return `${months} month(s) ago`;
  } else if (days > 0) {
    return `${days} day(s) ago`;
  } else {
    return 'past 24 hours';
  }
}

export const tellTime = (postTime) => {
  const timeNow = Math.floor(Date.now() / 1000);
  const difference = timeNow - postTime;
  const day = 60 * 60 * 24;
  const days = Math.floor(difference / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);

  return formatTime(days, months, years);
}