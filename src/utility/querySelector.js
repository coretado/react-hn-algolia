export const querySelector = (parameter) => {
  switch(parameter) {
    case 'All':
      return 'all';
    case 'Stories': 
      return 'story';
    case 'Comments':
      return 'comment';
    case 'Popularity':
      return 'byPopularity';
    case 'Date':
      return 'byDate';
    case 'All time':
      return 'all';
    case 'Last 24h':
      return 'last24h';
    case 'Past Week':
      return 'pastWeek';
    case 'Past Month':
      return 'pastMonth';
    case 'Past Year':
      return 'pastYear';
    default:
      return '';
  }
}