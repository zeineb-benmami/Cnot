import { apiService as api } from "app/store/apiService";
import EventModel from "./single/models/EventModel";

export const addTagTypes = ["events", "event"];
const EventsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEvents: build.query({
        query: () => ({ url: `/mock-api/events` }),
        providesTags: ["events"],
      }),
      deleteEvents: build.mutation({
        query: (eventIds) => ({
          url: `/mock-api/events`,
          method: "DELETE",
          data: eventIds,
        }),
        invalidatesTags: ["events"],
      }),
      getEvent: build.query({
        query: (eventId) => ({
          url: `/mock-api/events/${eventId}`,
        }),
        providesTags: ["event", "events"],
      }),
      createEvent: build.mutation({
        query: (newEvent) => ({
          url: `/mock-api/events`,
          method: "POST",
          data: EventModel(newEvent),
        }),
        invalidatesTags: ["event", "events"],
      }),
      updateEvent: build.mutation({
        query: (event) => ({
          url: `/mock-api/events/${event.id}`,
          method: "PUT",
          data: event,
        }),
        invalidatesTags: ["event", "events"],
      }),
      deleteEvent: build.mutation({
        query: (eventId) => ({
          url: `/mock-api/events/${eventId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["event", "events"],
      }),
      getECommerceOrders: build.query({
        query: () => ({ url: `/mock-api/ecommerce/orders` }),
        providesTags: ["eCommerce_orders"],
      }),
      getECommerceOrder: build.query({
        query: (orderId) => ({ url: `/mock-api/ecommerce/orders/${orderId}` }),
        providesTags: ["eCommerce_order"],
      }),
      updateECommerceOrder: build.mutation({
        query: (order) => ({
          url: `/mock-api/ecommerce/orders/${order.id}`,
          method: "PUT",
          data: order,
        }),
        invalidatesTags: ["eCommerce_order", "eCommerce_orders"],
      }),
      deleteECommerceOrder: build.mutation({
        query: (orderId) => ({
          url: `/mock-api/ecommerce/orders/${orderId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["eCommerce_order", "eCommerce_orders"],
      }),
      deleteECommerceOrders: build.mutation({
        query: (ordersId) => ({
          url: `/mock-api/ecommerce/orders`,
          method: "DELETE",
          data: ordersId,
        }),
        invalidatesTags: ["eCommerce_order", "eCommerce_orders"],
      }),
    }),
    overrideExisting: false,
  });
export default EventsApi;
export const {
  useGetEventsQuery,
  useDeleteEventsMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useCreateEventMutation,
} = EventsApi;
