import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	MRT_GlobalFilterTextField,
	MRT_LinearProgressBar,
	MRT_TablePagination,
	MRT_ToolbarAlertBanner,
	MRT_ToolbarDropZone,
	MRT_ToolbarInternalButtons
} from 'material-react-table';

function DataTableTopToolbar({ table }) {
	const {
		getState,
		options: {
			enableGlobalFilter,
			enablePagination,
			enableToolbarInternalActions,
			muiTopToolbarProps,
			positionGlobalFilter,
			positionPagination,
			positionToolbarDropZone,
			renderTopToolbarCustomActions
		},
		refs: { topToolbarRef }
	} = table;
	const { isFullScreen, showGlobalFilter } = getState();
	const isMobile = useMediaQuery('(max-width:720px)');
	const isTablet = useMediaQuery('(max-width:1024px)');
	const toolbarProps = parseFromValuesOrFunc(muiTopToolbarProps, { table });
	const stackAlertBanner = isMobile || !!renderTopToolbarCustomActions || (showGlobalFilter && isTablet);
	const globalFilterProps = {
		sx: !isTablet
			? {
					zIndex: 2
				}
			: undefined,
		table
	};
	return (
		<div className="flex flex-col w-full py-4 px-12 border-b-1">
			<Box
				className="flex flex-col w-full items-center"
				{...toolbarProps}
				ref={(ref) => {
					topToolbarRef.current = ref;

					if (toolbarProps?.ref) {
						// eslint-disable-next-line
                // @ts-ignore
						toolbarProps.ref.current = ref;
					}
				}}
				sx={(theme) => ({
					backgroundColor: table.options.mrtTheme.baseBackgroundColor,
					transition: 'all 150ms ease-in-out',
					zIndex: 1,
					position: isFullScreen ? 'sticky' : 'relative',
					top: isFullScreen ? '0' : undefined,
					...parseFromValuesOrFunc(toolbarProps?.sx, theme)
				})}
			>
				{['both', 'top'].includes(positionToolbarDropZone ?? '') && <MRT_ToolbarDropZone table={table} />}

				<div className="flex w-full items-center">
					{enableGlobalFilter && positionGlobalFilter === 'left' && (
						<MRT_GlobalFilterTextField {...globalFilterProps} />
					)}

					<div className="flex flex-1">{renderTopToolbarCustomActions?.({ table }) ?? null}</div>

					{enableToolbarInternalActions ? (
						<Box className="flex items-center space-x-8">
							{enableGlobalFilter && positionGlobalFilter === 'right' && (
								<MRT_GlobalFilterTextField
									{...globalFilterProps}
									sx={{
										'& .MuiOutlinedInput-root': { height: 32, minHeight: 32, paddingX: 1 }
									}}
								/>
							)}
							<MRT_ToolbarInternalButtons table={table} />
						</Box>
					) : (
						enableGlobalFilter &&
						positionGlobalFilter === 'right' && <MRT_GlobalFilterTextField {...globalFilterProps} />
					)}
				</div>
				{enablePagination && ['both', 'top'].includes(positionPagination ?? '') && (
					<MRT_TablePagination
						position="top"
						table={table}
					/>
				)}
				<MRT_LinearProgressBar
					isTopToolbar
					table={table}
				/>
			</Box>

			<MRT_ToolbarAlertBanner
				className="mt-4 rounded-md flex justify-center"
				stackAlertBanner={stackAlertBanner}
				table={table}
				sx={{
					'& .MuiStack-root': {
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
						fontSize: 13
					}
				}}
			/>
		</div>
	);
}

export const parseFromValuesOrFunc = (fn, arg) => (fn instanceof Function ? fn(arg) : fn);
export const getValueAndLabel = (option) => {
	let label = '';
	let value = '';

	if (option) {
		if (typeof option !== 'object') {
			label = option;
			value = option;
		} else {
			label = option.label ?? option.text ?? option.value;
			value = option.value ?? label;
		}
	}

	return { label, value };
};
export default DataTableTopToolbar;
