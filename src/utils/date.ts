
import format from 'date-fns/format';

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function getFormattedDate(date: string) {
  const _date = new Date(date);
  return (
    _date.getFullYear() +
    '-' +
    String(_date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(_date.getDate()).padStart(2, '0')
  );
}

//TODO: handle exceptions
function formatDateForChat(date: string) {
  return format(new Date(date), 'EEEE hh:mm a..aa');
}

 const getOnlyDay = (date: string) => {
  if (date) return format(new Date(date), 'dd');
};

 const getOnlyMonth = (date: string) => {
  if(date) {
  return format(new Date(date), 'LLL');
  }else {
    return ""
  }
};


 const getOnlyYear = (date: string) => {
  if(date) {
  return format(new Date(date), 'yyyy');
  }else {
    return ""
  }
};



export default formatDate;

export { getOnlyDay, getOnlyMonth, getOnlyYear, getFormattedDate, formatDateForChat };



