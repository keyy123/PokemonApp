import {createRoot} from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AllPokemon from "./Components/AllPokemon";
import DetailPokemon from "./Components/DetailPokemon";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./style/style.css";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
});

function App(){
    return (
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <header>
                <h1>
                    <Link to="/">
                        Pokemon App
                    </Link>    
                </h1>
            </header>
            <Routes>
                <Route path="/" element={<AllPokemon/>}/>
                <Route path="details/:id" element={<DetailPokemon/>}/>
            {/* <AllPokemon/> */}
            {/* <DetailPokemon/> */}
            </Routes>
        </QueryClientProvider>
        </BrowserRouter>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App/>);
