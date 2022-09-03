import {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import './App.css';
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [input, setInput] = useState("");
  const [inputInfo, setInputInfo] = useState<undefined | any>(undefined);
  let searchMode = "Random";
  return (
    <div style={{margin: "auto", width: "90%"}}>
      <h1> Anime Random Quotes Displayer </h1>
      <p>
          This is an React Typescript API application that displays random quotes from anime provided by the third party API <strong style={{color:"green"}}> AnimeChan </strong> created by <strong> rocktimsaikia </strong>. The url for the api is <a href="https://animechan.vercel.app/"> https://animechan.vercel.app/</a>. 
      </p>
      <p>
        In API applicaiton allows the user to generate a <u> random anime quote from the API</u>, generate a random quote from a specific <u> Anime Title</u>, or generate a random quote from a specific <u> Anime Character</u>.
      </p>

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
            <Button id={"searchModeButtonA"} onClick={random} variant="outlined" style={{margin: "10px"}}> Random Anime Quote </Button>
            <Button id={"searchModeButtonB"} onClick={animeTitle} variant="outlined" style={{margin: "10px"}}> Anime Title </Button>
            <Button id={"searchModeButtonC"} onClick={characterName} variant="outlined" style={{margin: "10px"}}>Character Name </Button>
          </div>
        </div>
      </div>
        
      {/*</Grid>*/}
      <p style={{textAlign: "center", marginTop: "5px"}}> Remember to click on one of the three button before searching (otherwise it would default to "Random" after each search). </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
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
    document.getElementById("searchModeButtonA")!.id = "searchModeButton2A";
    document.getElementById("searchModeButton2B")!.id = "searchModeButtonB";
    document.getElementById("searchModeButton2C")!.id = "searchModeButtonC";
  }

  function animeTitle() {
    searchMode = "Anime Title";
    document.getElementById("searchModeButtonB")!.id = "searchModeButton2B";
    document.getElementById("searchModeButton2A")!.id = "searchModeButtonA";
    document.getElementById("searchModeButton2C")!.id = "searchModeButtonC";
  }

  function characterName() {
    searchMode = "Character Name";
    document.getElementById("searchModeButtonC")!.id = "searchModeButton2C";
    document.getElementById("searchModeButton2B")!.id = "searchModeButtonB";
    document.getElementById("searchModeButton2A")!.id = "searchModeButtonA";
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
      //console.log("Random")

    } else if (searchMode === "Anime Title") {
      fetch("https://animechan.vercel.app/api/quotes/anime?title=" + input)
        .then(res => res.json())
        .then(quotes => setInputInfo(quotes[Math.floor(Math.random() * quotes.length)]))
        //.then(quotes => console.log(quotes))
      //console.log("animeTitle")
    } else if (searchMode === "Character Name") {
      fetch("https://animechan.vercel.app/api/quotes/character?name=" + input)
        .then(res => res.json())
        .then(quotes => setInputInfo(quotes[Math.floor(Math.random() * quotes.length)]))
        //.then(quotes => console.log(quotes))
      //console.log("characterName")
    }
    document.getElementById("searchModeButtonA")!.id = "searchModeButton2A";
    document.getElementById("searchModeButton2B")!.id = "searchModeButtonB";
    document.getElementById("searchModeButton2C")!.id = "searchModeButtonC";
}
}

export default App;