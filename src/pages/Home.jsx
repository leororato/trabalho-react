import React, { useEffect } from "react";
import CardPokemon from "../components/cardPokemon/CardPokemon";
import Cabecalho from "../components/cabecalho/Cabecalho";
import PesquisaPokemon from "../components/pesquisaPokemon/PesquisaPokemon";
import Paginacao from "../components/paginacao/Paginacao";
import { Container, Grid } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [api, setApi] = useState([]);
  const [apiFilter, setApiFilter] = useState(null);
  const [filtrado, setFiltrado] = useState("");
  const limit = 24;
  const [offset, setOffset] = useState(0);

  function filtraPokemon(nome) {
    setFiltrado(nome);
  }

  useEffect(() => {
    getApiData();
  }, [offset]);

  useEffect(() => {
    if (filtrado === "" && apiFilter !== null) {
      setApiFilter(null);
    }
  }, [filtrado]);

  async function getApiData() {
    try {
      const endpoints = [];
      for (let i = offset + 1; i <= limit + offset; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
      await Promise.all(endpoints.map(endpoint => fetch(endpoint)))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          setApi(prevApi => [...prevApi, ...data]);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function filterApiData() {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${filtrado}/`)
        .then(res => res.json())
        .then(data => setApiFilter(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <Container style={{ paddingBottom: 5 }}>
        <Grid container spacing={2}>
          <Cabecalho />
          <PesquisaPokemon filtraPokemon={filtraPokemon} filterApiData={filterApiData} />

          {apiFilter ? null : api.map((item, index) => (
            <Grid item key={index} xs={12} sm={4} md={2}>
              <CardPokemon nome={item.name} imagem={item.sprites.front_default} tipo={item.types} />
            </Grid>
          ))}

          {apiFilter ? (
            <Grid item key={apiFilter.id} xs={12} sm={4} md={2}>
              <CardPokemon nome={apiFilter.name} imagem={apiFilter.sprites.front_default} tipo={apiFilter.types} />
            </Grid>
          ) : null}

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Paginacao addMore={() => setOffset(prevOffset => prevOffset + limit)} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
