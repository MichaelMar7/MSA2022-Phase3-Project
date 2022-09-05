import {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";
import {bounce} from "react-animations";
import styled, {keyframes} from "styled-components";

function App() {
  const [input, setInput] = useState("");
  const [inputInfo, setInputInfo] = useState<undefined | any>(undefined);
  const Bounce = styled.div`animation: 4s ${keyframes `${bounce}`} infinite`
  let searchMode = "Random";
  return (
    <div style={{margin: "auto", width: "90%"}}>
      <Bounce style={{margin: "50px"}}><h1> Anime Random Quotes Displayer </h1></Bounce>
      <p>
          This is an React Typescript API application that displays random quotes from anime provided by the third party API <strong style={{color:"green"}}> AnimeChan </strong> created by <strong> rocktimsaikia </strong>. The url for the api is <a href="https://animechan.vercel.app/"> https://animechan.vercel.app/</a>. 
      </p>
      <p>
        In API applicaiton allows the user to generate a <u> random anime quote from the API</u>, generate a random quote from a specific <u> Anime Title</u>, or generate a random quote from a specific <u> Anime Character</u>.
      </p>
      <p> Now cloud hosted on Vercel!! https://msa-2022-phase3-project.vercel.app/ </p>

      {/* Change without using mui */}
      {/*<Grid
        container
        direction="row"
        sx={{
          margin: "10px",
          justifyContent: "center",
        }}
      >*/}
      <div className={"navbar"}>
        <div className={"dropdown"}>
          <Button className={"dropdownbtn"} variant="outlined"></Button>
          <div className="dropdown-content">
            <Button className={"link"} id={"searchModeButtonA"} onClick={random} variant="outlined"> Random Anime Quote </Button>
            <Button className={"link"} id={"searchModeButtonB"} onClick={animeTitle} variant="outlined"> Anime Title </Button>
            <Button className={"link"} id={"searchModeButtonC"} onClick={characterName} variant="outlined">Character Name </Button>
          </div>
        </div>
      </div>
        
      {/*</Grid>*/}
      <p style={{textAlign: "center", marginTop: "5px"}}> Remember to click on one of the three button before searching (otherwise it would default to "Random" after each search). </p>

      <div className={"searchbar"} style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="search-bar"
          className="text"
          value={input}
          onChange={(e: any) => {
            setInput(e.target.value);
          }}
          label="Enter Text"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            GO
        </Button>
      
      </div>

      <div style={{margin: "auto", maxWidth: "80%", }}>
      {inputInfo === undefined ? (
        <Grid
          container
          direction="row"
          spacing={5}
          className={"QuoteGrid"}
          sx={{
            width: "100%",
            margin: "20px auto",
            textAlign: 'center',
            justifyContent: "center",
          }}
        >
        <p> Error. If you are in "Anime Title" or "Character Name". Either the textbox is empty or text is invalid. </p>
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          spacing={5}
          className={"QuoteGrid"}
          sx={{
            width: "100%",
            margin: "20px auto",
            textAlign: 'center',
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <p> 
            <strong> {inputInfo.anime} </strong>  <br/>
            {inputInfo.character} <br/>
            <i>"{inputInfo.quote}"</i>
          </p>
        </Grid>
      )}
      </div>
    </div>
  );

  function random() {
    searchMode = "Random";
    //console.log("A->2")
    document.getElementById("searchModeButtonA")!.id = "searchModeButton2A";
    if (document.getElementById("searchModeButton2B")) {
      //console.log("2->B")
      document.getElementById("searchModeButton2B")!.id = "searchModeButtonB";
    } else if (document.getElementById("searchModeButton2C")) {
      //console.log("2->C")
      document.getElementById("searchModeButton2C")!.id = "searchModeButtonC";
    }
    //console.log("DONE")
  }

  function animeTitle() {
    searchMode = "Anime Title";
    //console.log("B->2")
    document.getElementById("searchModeButtonB")!.id = "searchModeButton2B";
    if (document.getElementById("searchModeButton2A")) {
      //console.log("2->A")
      document.getElementById("searchModeButton2A")!.id = "searchModeButtonA";
    } else if (document.getElementById("searchModeButton2C")) {
      //console.log("2->C")
      document.getElementById("searchModeButton2C")!.id = "searchModeButtonC";
    }
    //console.log("DONE")
  }

  function characterName() {
    searchMode = "Character Name";
    //console.log("C->2")
    document.getElementById("searchModeButtonC")!.id = "searchModeButton2C";
    if (document.getElementById("searchModeButton2B")) {
      //console.log("2->B")
      document.getElementById("searchModeButton2B")!.id = "searchModeButtonB";
    } else if (document.getElementById("searchModeButton2A")) {
      //console.log("2->A")
      document.getElementById("searchModeButton2A")!.id = "searchModeButtonA";
    }
    //console.log("DONE")
  }

  function bgcSearchMode(searchMode: any) {
    if (searchMode === "Random") {
      return "red";
    } else {
      return "green";
    }
  }

  function search(){
    if (searchMode === "Random") {
      fetch("https://animechan.vercel.app/api/random")
        .then(res => res.json())
        .then(quote => setInputInfo(quote))
        //.then(quote => console.log(quote))
      console.log("Random")

    } else if (searchMode === "Anime Title") {
      fetch("https://animechan.vercel.app/api/quotes/anime?title=" + input)
        .then(res => res.json())
        .then(quotes => setInputInfo(quotes[Math.floor(Math.random() * quotes.length)]))
        //.then(quotes => console.log(quotes))
      console.log("animeTitle")
    } else if (searchMode === "Character Name") {
      fetch("https://animechan.vercel.app/api/quotes/character?name=" + input)
        .then(res => res.json())
        .then(quotes => setInputInfo(quotes[Math.floor(Math.random() * quotes.length)]))
        //.then(quotes => console.log(quotes))
      console.log("characterName")
    }
    if (document.getElementById("searchModeButton2B") || document.getElementById("searchModeButton2C")) {
      document.getElementById("searchModeButtonA")!.id = "searchModeButton2A";
      if (document.getElementById("searchModeButton2B")) {
        document.getElementById("searchModeButton2B")!.id = "searchModeButtonB";
      } else if (document.getElementById("searchModeButton2C")) {
        document.getElementById("searchModeButton2C")!.id = "searchModeButtonC";
      }
    }
}
}

export default App;