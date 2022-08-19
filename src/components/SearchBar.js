import searchIcon from './../imgs/Search.png'
import {useState} from "react";
import { Product } from './Products';
import { Gossip } from './Phoshto';
import { ResponseMessage } from './Products';

export const SearchBar = ({placeholderText, data, showAllItems, setShowAllItems, category}) => {

    const [searched, setSearched] = useState("");
    const [searching, setSearching] = useState(false);
    
    const toggleContainers = () => {
        setShowAllItems(!showAllItems);
        setSearching(!searching)
        setSearched("")
    }
    
    return(

        <>
            <div className="search-section">

                <p className="navigation-text">
                    <span onClick={toggleContainers}>All</span>{searched}
                </p>

                <div className="search-input-container">
                    <input value={searched} onFocus={toggleContainers}  onChange={e => setSearched(e.target.value)} type="text" placeholder={placeholderText}/>
                    <button type="submit">
                        <img src={searchIcon} alt="search icon" />
                    </button>
                </div>

            </div>

            
            {searching &&  category === "products" && <SearchedProducts data={data} searched={searched}/>}
            {searching && category === "gossips" && <SearchedGossips data={data} searched={searched}/>}
        </>
    )
}



export const SearchedProducts = ({data, searched}) => {

    // searching for matched product

    const matchedDataArray = data.filter(item =>{

        const itemIdentifier = item.name.toLowerCase();
        
        if(itemIdentifier.indexOf(searched.toLowerCase()) !== -1){
            return item
        }

    });

    // returning matched product

    return (

        <section className="searched-items">
            
            {   
                matchedDataArray.length <= 0 ? <ResponseMessage message={"No matches Found"} color="error"/> :

                matchedDataArray.map(matchedData => {
                   
                    return <Product key={matchedData._id} productName={ matchedData.name} image={matchedData.image} price={matchedData.price} desc={matchedData.description}/>
            
                })
            }
        </section>
    )
}

const SearchedGossips  = ({data, searched}) => {

    // searching for gossip

    const matchedGossipsArray = data.filter(gossip => {
        
        const gossipNameLowerCase = gossip.gossipName.toLowerCase();

        if(gossipNameLowerCase.indexOf(searched.toLowerCase()) !== -1){
            return gossip;
        }
    })

    // returning searched gossip

    return (

        <section className="searched-gossips">
           

            {
                matchedGossipsArray <= 0 ? <ResponseMessage message={"No matches Found"} color="error"/> :

                matchedGossipsArray.map(gossip => {

                    return <Gossip key={gossip._id} gossip={gossip}/>
                })
            }
        </section>
    )
}
/* 
    CSS styles for search bar are in Products.css
 */