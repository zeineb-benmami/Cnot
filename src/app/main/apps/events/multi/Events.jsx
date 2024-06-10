import GlobalStyles from "@mui/material/GlobalStyles";
import EventsHeader from "./EventsHeader";
import EventsTable from "./EventsTable";

/**
 * The events page.
 */
function Events() {
  return (
    <>
      <GlobalStyles
        styles={() => ({
          "#root": {
            maxHeight: "100vh",
          },
        })}
      />
      <div className="w-full h-full container flex flex-col">
        <EventsHeader />
        <EventsTable />
      </div>
    </>
  );
}

export default Events;
