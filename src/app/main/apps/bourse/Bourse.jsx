import _ from '@lodash';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseLoading from '@fuse/core/FuseLoading';
import { getBourses } from 'src/services/bourseService';
import BourseCard from './BourseCard';

const container = {
	show: {
		transition: {
			staggerChildren: 0.04
		}
	}
};
const item = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0
	}
};

/**
 * The Bourse page.
 */
function Bourse() {
	const [bourses, setBourses] = useState([]);
	const [domaines, setDomaines] = useState(['Athlètes et développement du Sport', 'Valeurs', 'Développement des capacités et administration']);
	const [groupes, setGroupes] = useState(['Universalité des jeux Olympiques', 'Entourage', 'Développement du sport', "Valeurs Olympiques", "Gestion des CNO et partage de connaissances"]);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [filteredData, setFilteredData] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [selectedDomaine, setSelectedDomaine] = useState('all');
	const [selectedGroupe, setSelectedGroupe] = useState('all');
	const [hideCompleted, setHideCompleted] = useState(false);

	useEffect(() => {
		fetchBourses();
	}, []);

	const fetchBourses = async () => {
		try {
			const response = await getBourses();
      console.log(response.data);
			setBourses(response.data);
		} catch (error) {
			console.error('Error fetching bourses:', error);
		}
	};

	useEffect(() => {
		function getFilteredArray() {
		  if (bourses && searchText.length === 0 && selectedDomaine === 'all' && selectedGroupe === 'all') {
			return bourses;
		  }
	  
		  return _.filter(bourses, (item) => {
			if (selectedDomaine !== 'all' && item.domaine !== selectedDomaine) {
			  return false;
			}
	  
			if (selectedGroupe !== 'all' && item.groupe !== selectedGroupe) {
			  return false;
			}
	  
			return item.titre.toLowerCase().includes(searchText.toLowerCase());
		  });
		}
	  
		if (bourses) {
		  setFilteredData(getFilteredArray());
		}
	  }, [bourses, searchText, selectedDomaine, selectedGroupe]);
	  
	  
  

	function handleSelectedDomaine(event) {
		setSelectedDomaine(event.target.value);
	}

	function handleSelectedGroupe(event) {
		setSelectedGroupe(event.target.value);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	/*if (isLoading) {
		return <FuseLoading />;
	}*/

	return (
		<FusePageSimple
			content={
				<div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
					<div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0 sm:space-x-16">
						<div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
							<FormControl className="flex w-full sm:w-136" variant="outlined">
								<InputLabel id="domaine-select-label">Domaine</InputLabel>
								<Select
									labelId="domaine-select-label"
									id="domaine-select"
									label="Domaine"
									value={selectedDomaine}
									onChange={handleSelectedDomaine}
								>
									<MenuItem value="all">
										<em> All </em>
									</MenuItem>
									{domaines.map((domaine, index) => (
										<MenuItem value={domaine} key={index}>
											{domaine}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl className="flex w-full sm:w-136" variant="outlined">
								<InputLabel id="groupe-select-label">Groupe</InputLabel>
								<Select
									labelId="groupe-select-label"
									id="groupe-select"
									label="Groupe"
									value={selectedGroupe}
									onChange={handleSelectedGroupe}
								>
									<MenuItem value="all">
										<em> All </em>
									</MenuItem>
									{groupes.map((groupe, index) => (
										<MenuItem value={groupe} key={index}>
											{groupe}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField
								label="Search for a bourse"
								placeholder="Enter a keyword..."
								className="flex w-full sm:w-256 mx-8"
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={handleSearchText}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						</div>
						<FormControlLabel
							label="Hide completed"
							control={<Switch onChange={(ev) => setHideCompleted(ev.target.checked)} checked={hideCompleted} name="hideCompleted" />}
						/>
					</div>
					{filteredData && filteredData.length > 0 ? (
						<motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40" variants={container} initial="hidden" animate="show">
							{filteredData.map((bourse) => (
								<motion.div variants={item} key={bourse._id}>
									<BourseCard bourse={bourse} />
								</motion.div>
							))}
						</motion.div>
					) : (
						<div className="flex flex-1 items-center justify-center">
							<Typography color="text.secondary" className="text-24 my-24">
								Aucune bourse trouvée!
							</Typography>
						</div>
					)}
				</div>
			}
			scroll={isMobile ? 'normal' : 'page'}
		/>
	);
}

export default Bourse;
