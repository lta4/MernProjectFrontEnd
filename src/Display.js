import React from "react";

const Display = (props) => {
    // DESTRUCTURING ICECREAM FROM PROPS
    console.log("props", props)
    const {icecreams} = props
    // LOADING FUNCTION FOR IF ICECREAM EXISTS
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
                </article>)
            })}
        </div>)
    }

    const loading = <h1>Loading...</h1>

    return icecreams.length !== 0 ? loaded () : loading;
};

export default Display