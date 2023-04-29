import { dateFnsLocalizer } from "react-big-calendar";

import { format, parse, startOfWeek, getDay, addHours } from "date-fns";

import enUS from "date-fns/locale/en-US";
import esES from "date-fns/locale/es";

const locales = {
  "en-US": enUS,
  //   es: esES, // how we change into a diff language
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
