import { lazy } from "react";
import { Navigate } from "react-router-dom";

const EventsApp = lazy(() => import("./EventsApp"));
const Event = lazy(() => import("./single/Event"));
const Events = lazy(() => import("./multi/Events"));
/**
 * The E-Commerce app configuration.
 */
const EventsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps",
      element: <EventsApp />,
      children: [
        {
          path: "",
          element: <Navigate to="events" />,
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "events/:eventId/*",
          element: <Event />,
        },
      ],
    },
  ],
};
export default EventsAppConfig;
