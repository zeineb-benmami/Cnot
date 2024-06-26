import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
  {
    id: "example-component",
    title: "Example",
    translate: "EXAMPLE",
    type: "item",
    icon: "heroicons-outline:star",
    url: "example",
  },
  {
    id: "dashboards.project",
    title: "Dashboard",
    type: "item",
    icon: "heroicons-outline:chart-pie",
    url: "/dashboards/project",
  },
  {
    id: "apps",
    title: "Applications",
    subtitle: "Ici vous trouverez toute vos pages",
    type: "group",
    icon: "heroicons-outline:cube",
    translate: "APPLICATIONS",
    children: [
      {
				id: 'apps.mailbox',
				title: 'Mailbox',
				type: 'item',
				icon: 'heroicons-outline:mail',
				url: '/apps/mailbox',
				translate: 'MAIL',
				badge: {
					title: '27',
					classes: 'px-8 bg-pink-600 text-white rounded-full'
				}
			},			{
				id: 'apps.bourse',
				title: 'Bourse',
				type: 'collapse',
				icon: 'heroicons-outline:cash',
				translate: 'BOURSE',
				children: [
					{
						id: 'bourse-list',
						title: 'Bourses Liste',
						type: 'item',
						url: '/apps/bourses',
						end: true
					},
					{
						id: 'bourse-add',
						title: 'Ajout Bourse',
						type: 'item',
						url: '/apps/bourses/add',
						end: true
					},
				]
			},
      {
        id: "apps.events",
        title: "Evènements",
        type: "item",
        icon: "heroicons-outline:calendar",
        url: "/apps/events",
        translate: "Evènements",
      },
      {
        id: "apps.calendar",
        title: "Calendar",
        type: "item",
        icon: "heroicons-outline:calendar",
        url: "/apps/calendar",
        translate: "Calendrier",
        badge: {
          title: "3",
          classes: "px-8 bg-pink-600 text-white rounded-full",
        },
      },
      {
				id: 'apps.messenger',
				title: 'Messenger',
				type: 'item',
				icon: 'heroicons-outline:chat-alt',
				url: '/apps/messenger',
				translate: 'MESSENGER'
			}
    ],
  },
];
export default navigationConfig;
