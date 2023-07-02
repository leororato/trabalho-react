import React from "react";
import { Container, Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function PesquisaPokemon({ filtraPokemon, filterApiData }) {
	return (
		<Container maxWidth="lg" style={{ padding: "0px 16px 0px 26px", marginBottom: "40px" }}>
			<Grid container justifyContent="center">
				<Paper
					component="form"
					style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
				>
					<InputBase
						style={{ marginLeft: 1, flex: 1 }}
						placeholder="Pesquise um pokemon"
						onChange={(e) => filtraPokemon(e.target.value)}
					/>
					<IconButton type="button" style={{ padding: '10px' }} aria-label="search" onClick={filterApiData}>
						<SearchIcon />
					</IconButton>
				</Paper>
			</Grid>
		</Container>
	)
}
