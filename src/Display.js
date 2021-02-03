import React from "react";

const Display = (props) => {
    console.log("props", props)
    const {icecreams} = props
    // const {shops} = props

    const loaded = () => {
        return (<div style={{textAlign: "center"}}>
            {icecreams.icecream.map(icecream => {
                return (<article key={icecream._id}>
                    <h1>{icecream.name}</h1>
                    <h3>{icecream.flavor}</h3>
                    <button onClick={() => {
                        props.selectIcecreams(icecream)
                        props.history.push("/edit")
                    }}>Edit Ice Cream</button>
                    <button onClick={() => {
                        props.deleteIcecreams(icecream)
                    }}>Delete Ice Cream</button>
                        <p>Enjoy!</p>
                </article>)
            })}
        </div>)
    }

    // const loading = <h1>Loading...</h1>
    // return icecreams.length !== 0 ? loaded () : loading;

// const loaded2 = () => {
//     return (<div style={{textAlign: "center"}}>
//         {shops.shop.map(shop => {
//             return (<article key={shop._id}>
//                 <h1>{shop.name}</h1>
//                 <h3>{shop.yearBuilt}</h3>
//                 <button onClick={() => {
//                     props.selectShops(shop)
//                     props.history.push("/edit")
//                 }}>Edit Ice Cream</button>
//                 <button onClick={() => {
//                     props.deleteShops(shop)
//                 }}>Delete Ice Cream</button>
//                     <p>Enjoy!</p>
//             </article>)
//         })}
//     </div>)
// }

// const loading2 = <h1>Loading...</h1>
// const loading = <h1>Loading...</h1>
// return shops.length !== 0 ? loaded2 () : loading2;


const loading = <h1>Loading...</h1>

return icecreams.length !== 0 ? loaded () : loading;
};

export default Display