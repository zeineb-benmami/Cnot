import { darken, lighten } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import _ from '@lodash';
import { useEffect } from 'react';

/**
 * The CourseCategory component.
 */
function BourseCategory(props) {
	const { groupe, domaine } = props;
	const categories = [
        { title: 'Universalité des jeux Olympiques', color: '#0369A1' },
        { title: 'Entourage', color: '#16A34A' },
        { title: 'Développement du sport', color: '#FCD34D' },
        { title: 'Valeurs Olympiques', color: '#DC2626' },
        { title: 'Gestion des CNO et partage de connaissances', color: '#292524' }
    ]
    const domaines = ['Athlètes et développement du Sport', 'Valeurs', 'Développement des capacités et administration'];

	const category = categories.filter((c) => c.title === groupe)[0];

    const selectedDomaine = domaines.filter((d) => d === domaine)[0];

    useEffect(() => {
        console.log(categories.filter((c) => c.title === groupe)[0]);
    },[])

	if (!category) {
		return null;
	}

	return (
        <div>
        <Chip
			className="font-semibold text-12 m-4"
			label={selectedDomaine}
			sx={{
				color: (theme) =>
					theme.palette.mode === 'light' ? darken("#BB86FC", 0.4) : lighten("#BB86FC", 0.8),
				backgroundColor: (theme) =>
					theme.palette.mode === 'light' ? lighten("#BB86FC", 0.8) : darken("#BB86FC", 0.1)
			}}
			size="small"
		/>
        <br />
		<Chip
			className="font-semibold text-12 m-4"
			label={category?.title}
			sx={{
				color: (theme) =>
					theme.palette.mode === 'light' ? darken(category?.color, 0.4) : lighten(category?.color, 0.8),
				backgroundColor: (theme) =>
					theme.palette.mode === 'light' ? lighten(category?.color, 0.8) : darken(category?.color, 0.1)
			}}
			size="small"
		/>

        </div>
	);
}

export default BourseCategory;
