import _ from "@lodash";
import FuseUtils from "@fuse/utils";
import mockApi from "../mock-api.json";

let eventsDB = mockApi.components.examples.events.value;

export const eventApiMocks = (mock) => {
  mock.onGet("/events").reply(() => {
    return [200, eventsDB];
  });
  mock.onPost("/events").reply(({ data }) => {
    const newEvent = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
    eventsDB.unshift(newEvent);
    return [200, newEvent];
  });
  mock.onDelete("/events").reply(({ data }) => {
    const ids = JSON.parse(data);
    eventsDB = eventsDB.filter((item) => !ids.includes(item.id));
    return [200, eventsDB];
  });
  mock.onGet("/events/:id").reply((config) => {
    const { id } = config.params;
    const events = _.find(eventsDB, { id });

    if (events) {
      return [200, events];
    }

    return [404, "Requested events do not exist."];
  });
  mock.onPut("/events/:id").reply((config) => {
    const { id } = config.params;
    _.assign(_.find(eventsDB, { id }), JSON.parse(config.data));
    return [200, _.find(eventsDB, { id })];
  });
  mock.onDelete("/events/:id").reply((config) => {
    const { id } = config.params;
    _.remove(eventsDB, { id });
    return [200, id];
  });
};
