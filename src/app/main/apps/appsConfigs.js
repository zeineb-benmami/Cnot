import BourseAppConfig from "./bourse/BourseAppConfig";
import CalendarAppConfig from "./calendar/CalendarAppConfig";
import EventsAppConfig from "./events/EventsAppConfig";
import MailboxAppConfig from "./mailbox/MailboxAppConfig";
/**
 * The list of application configurations.
 */
const appsConfigs = [
  EventsAppConfig,
  CalendarAppConfig,
  BourseAppConfig,
  MailboxAppConfig,
];
export default appsConfigs;
