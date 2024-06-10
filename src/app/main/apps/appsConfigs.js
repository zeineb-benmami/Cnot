
import MessengerAppConfig from './messenger/MessengerAppConfig';
import BourseAppConfig from "./bourse/BourseAppConfig";
import CalendarAppConfig from "./calendar/CalendarAppConfig";
import EventsAppConfig from "./events/EventsAppConfig";
import MailboxAppConfig from "./mailbox/MailboxAppConfig";
/**
 * The list of application configurations.
 */
const appsConfigs = [
	BourseAppConfig,
	MailboxAppConfig,
	MessengerAppConfig,
  EventsAppConfig,
  CalendarAppConfig,
  
];
export default appsConfigs;
