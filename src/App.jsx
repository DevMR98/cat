import './App.css'
import {useState} from "react";

const Turns={
    X:"x",
    O:"o"
}

const Square=({children,isSelected,updateBoard,index})=>{
    const className=`square ${isSelected ? 'is-selected' : 'square'}`;
    const handleClick=()=>{
        updateBoard(index);
    }
    return(
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    );

}
const WINNER_COMBOS=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const checkWinner=(boardToCheck)=>{
    //revisar todas las combinaciones ganadoras

    for(const combo of WINNER_COMBOS){
        const [a,b,c] = combo;
        if(boardToCheck[a] &&
        boardToCheck[a]===boardToCheck[b] &&
        boardToCheck[a]===boardToCheck[c]){
            //ganador
            return boardToCheck[a];
        }
    }
    //no hay ganador
    return null;
}
function App() {
   const [board,setBoard]=useState(Array(9).fill(null));
    console.log(board);

    const [turn,setTurn]=useState([Turns.X]);
    const[winner,setWinner]=useState(null);

    const updateBoard=(index)=>{
        //evitamos la actualizacion de la posicion
        //si ya tiene algo
        if(board[index] || winner) return
        //actualizar el tablero de acuerdo a al turno
        const newTurn=turn==Turns.X?Turns.O:Turns.X;
        setTurn(newTurn);
        const newBoard=[...board];
        newBoard[index]=turn;
        setBoard(newBoard);
        //escoger ganador
        const newWinner=checkWinner(newBoard);
        if(newWinner){
            setWinner(newWinner);
        }
    }
  return (
    <>
        <main className="board">
            <h1>Juego del Gato</h1>
            <section className="game">
                {
                    board.map((C,index)=>{
                        return(
                          <Square key={index} index={index} updateBoard={updateBoard} >{C}</Square>
                        );
                    })
                }
            </section>

            <section className="turn">
                <Square isSelected={turn==Turns.X}>{Turns.X}</Square>
                <Square isSelected={turn==Turns.O}>{Turns.O}</Square>
            </section>
        </main>
        //renderizado condicionalk
        {
            winner !==null && (
                <section></section>
            )

        }

    </>
  )
}

export default App
