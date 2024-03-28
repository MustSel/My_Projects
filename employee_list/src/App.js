
import { useState, useEffect } from 'react';
import List from './components/List';
// import 'bootstrap/dist/css/bootstrap.min.css';
import data from "./helper/data"

function App() {
let filtered = []

const [perPage,setPerpage] = useState(4)
const [page,setPage]= useState({
  x:0, 
  y:perPage})

  useEffect(() => {
    setPage({ x: 0, y: perPage });
  }, [perPage]);
 filtered = data.slice(page.x, page.y)

  return (
    <main>
      <section className="container">
        <div className='pagination'>
          <h3>Employee List</h3>
          <select value={perPage} name="pagination" id="pagination" onChange={(e)=> setPerpage(Number(e.target.value))}>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="8">8</option>
          </select>
          
        </div>
        
        <h5>
          (Employees {page.x+1} to {page.y})
        </h5>
        {filtered.map((emply)=> <List key={emply.id} {...emply}/>) }
        <div className='btns'>
          <button onClick={()=> (page.x===0) || setPage({...page, x:page.x-perPage, y:page.y-perPage})
          } >Prev</button>
          <button onClick={()=>setPage({...page, x:page.x+perPage, y:page.y+perPage})} disabled={page.y>data.length-1} >Next</button>
        </div>
      </section>
    </main>
  );
}

export default App;
