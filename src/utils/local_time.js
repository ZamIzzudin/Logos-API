/** @format */

function get_local_time() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDate = formatter.format(now);

  return formattedDate;
}

function get_local_time_full() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = formatter.format(now);

  return formattedDate;
}

const dateFormater = { get_local_time, get_local_time_full };
export default dateFormater;
