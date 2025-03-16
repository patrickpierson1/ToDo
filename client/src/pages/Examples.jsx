import Example1 from "../assets/example1.png";
import Example2 from "../assets/example2.png";
const Examples = () => {
    return (
        <div className="examples">
            <img src={Example1} alt="Grocery note" className="example-image" />
            <img src={Example2} alt="Class note" className="example-image" />
        </div>
    )
}

export default Examples