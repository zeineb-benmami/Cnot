import _ from "@lodash";
import clsx from "clsx";
/**
 * The order statuses.
 */
export const eventTypes = [
  {
    id: "1",
    name: "Initiative",
    color: "bg-blue text-white",
  },
  {
    id: "2",
    name: "Formation",
    color: "bg-green text-white",
  },
  {
    id: "3",
    name: "Atelier",
    color: "bg-orange text-black",
  },
  {
    id: "4",
    name: "Autre",
    color: "bg-purple text-white",
  },
];

/**
 * The orders status component.
 */
function EventType(props) {
  const { name } = props;
  return (
    <div
      className={clsx(
        "inline text-12 font-semibold py-4 px-12 rounded-full truncate",
        _.find(eventTypes, { name })?.color
      )}
    >
      {name}
    </div>
  );
}

export default EventType;
