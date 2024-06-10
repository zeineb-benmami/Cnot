import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BasicInfoTab from "./tabs/BasicInfoTab";
import { useGetEventQuery } from "../EventsApi";
import EventModel from "./models/EventModel";
import EventImagesTab from "./tabs/EventImagesTab";
import EventHeader from "./EventHeader";
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z
    .string()
    .nonempty("Vous devez saisir un titre")
    .min(5, "Le titre doit comporter au moins 5 caractères"),
});

/**
 * The event page.
 */
function Event() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { eventId } = routeParams;
  const {
    data: event,
    isLoading,
    isError,
  } = useGetEventQuery(eventId, {
    skip: !eventId || eventId === "new",
  });
  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (eventId === "new") {
      reset(EventModel({}));
    }
  }, [eventId, reset]);
  useEffect(() => {
    if (event) {
      reset({ ...event });
    }
  }, [event, reset]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested events is not exists
   */
  if (isError && eventId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          Il n'ya aucun évènement
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/events"
          color="inherit"
        >
          Aller vers évènements
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while event data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (event && routeParams.eventId !== event.id && routeParams.eventId !== "new")
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<EventHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Images" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab />
              </div>

              <div className={tabValue !== 1 ? "hidden" : ""}>
                <EventImagesTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default Event;
