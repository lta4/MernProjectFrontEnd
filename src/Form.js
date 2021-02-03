import React from "react";

const Form = (props) => {
    // STATE FOR THE FORM
    const [formData, setFormData] = React.useState(props.icecream);

    // FUNCTIONS
    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(formData);
        props.history.push("/");
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Ice Cream Choice"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="flavor"
                placeholder="Flavor Choice"
                value={formData.flavor}
                onChange={handleChange}
            />
            <input className="submit" type="submit" value={props.label} />
        </form>
    );
};

export default Form