import { Button } from "@mui/material";

export default function Paginacao({ addMore }) {

	return (
		<div className="paginacao">
			<Button onClick={addMore} variant="contained" color="success" style={{ width: 250 }}>
				Ver mais +
			</Button>
		</div>
	)
}
