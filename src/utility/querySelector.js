export const querySelector = (parameter) => {
  switch(parameter) {
    case 'new':
      return 'story';
    case 'comments': 
      return 'comment';
    case 'ask':
      return 'ask_hn';
    case 'show':
      return 'show_hn';
    case 'popularity':
      return 'search';
    case 'date':
      return 'search_by_date';
    default:
      return '';
  }
}