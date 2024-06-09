/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from "react";
import DataTable from "app/shared-components/data-table/DataTable";
import FuseLoading from "@fuse/core/FuseLoading";
import { ListItemIcon, MenuItem, Paper } from "@mui/material";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import Button from "@mui/material/Button";
import { useDeleteEventsMutation, useGetEventsQuery } from "../EventsApi";
import EventType from "../single/EventType";

function EventsTable() {
  const { data: events, isLoading } = useGetEventsQuery();
  const [removeEvents] = useDeleteEventsMutation();
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.featuredImageId,
        id: "featuredImageId",
        header: "Image",
        enableColumnFilter: false,
        enableColumnDragging: false,
        size: 64,
        enableSorting: false,
        Cell: ({ row }) => (
          <div className="flex items-center justify-center">
            {row.original?.images?.length > 0 &&
            row.original.featuredImageId ? (
              <img
                className="w-full max-h-40 max-w-40 block rounded"
                src={
                  _.find(row.original.images, {
                    id: row.original.featuredImageId,
                  })?.url
                }
                alt={row.original.name}
              />
            ) : (
              <img
                className="w-full max-h-40 max-w-40 block rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
                alt={row.original.name}
              />
            )}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Titre",
        Cell: ({ row }) => (
          <Typography
            component={Link}
            to={`/apps/events/${row.original.id}/${row.original.handle}`}
            className="underline"
            color="secondary"
            role="button"
          >
            {row.original.name}
          </Typography>
        ),
      },
      {
        accessorKey: "categories",
        header: "Type",
        accessorFn: (row) => (
          <div className="flex flex-wrap space-x-2">
            {row?.categories?.map((item) => (
              <EventType name={item} />
            ))}
          </div>
        ),
      },
      {
        id: "budget",
        accessorKey: "priceTaxIncl",
        header: "Budget",
        accessorFn: (row) => `$${row.priceTaxIncl}`,
      },
      {
        id: "qt",
        accessorKey: "quantity",
        header: "Participants",
        accessorFn: (row) => (
          <div className="flex items-center space-x-8">
            <span>{row.quantity}</span>
            <i
              className={clsx(
                "inline-block w-8 h-8 rounded",
                row.quantity <= 5 && "bg-red",
                row.quantity > 5 && row.quantity <= 25 && "bg-orange",
                row.quantity > 25 && "bg-green"
              )}
            />
          </div>
        ),
      },
      {
        id: "dur",
        accessorKey: "active",
        header: "Durée",
        accessorFn: (row) => (
          <div className="flex items-center">
            {row?.startDate + "-" + row?.endDate}
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <Paper
      className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
      elevation={0}
    >
      <DataTable
        data={events}
        columns={columns}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MenuItem
            key={0}
            onClick={() => {
              removeEvents([row.original.id]);
              closeMenu();
              table.resetRowSelection();
            }}
          >
            <ListItemIcon>
              <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
            </ListItemIcon>
            Supprimer
          </MenuItem>,
        ]}
        renderTopToolbarCustomActions={({ table }) => {
          const { rowSelection } = table.getState();

          if (Object.keys(rowSelection).length === 0) {
            return null;
          }

          return (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                const selectedRows = table.getSelectedRowModel().rows;
                removeEvents(selectedRows.map((row) => row.original.id));
                table.resetRowSelection();
              }}
              className="flex shrink min-w-40 ltr:mr-8 rtl:ml-8"
              color="secondary"
            >
              <FuseSvgIcon size={16}>heroicons-outline:trash</FuseSvgIcon>
              <span className="hidden sm:flex mx-8">
                Supprimer les éléments séléctionnés
              </span>
            </Button>
          );
        }}
      />
    </Paper>
  );
}

export default EventsTable;
