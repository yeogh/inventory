import {useState} from 'react';

//Assets
import Button from "./assets/Button";
import InputBox from "./assets/InputBox";


const Report = () => {

    const [reportSearch, setReportSearch] = useState({
        startdate:"",
        enddate:""
    });

    const [reportDetailsList, setReportDetailsList] = useState([]);

    const {startdate, enddate} = reportSearch;

    const onChange = (e) => {
        setReportSearch({...reportSearch, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {

            const response = await fetch (`http://localhost:5001/products/reportdetails/${startdate}/${enddate}`, {
            method: "GET",
            headers: {token: localStorage.token}
        });

            // console.log('resp', response)
      
            const parseRes = await response.json();
      
            console.log(parseRes)
            setReportDetailsList(parseRes)
      
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <>
        <div className="flex-col items-center justify-center text-center mt-6">
            <h1>Report</h1>
            <form className="flex flex-row items-center justify-center mt-4" onSubmit={onSubmitForm}>
                <InputBox className="mb-6 mr-6 w-48" label="From" type="date" name="startdate" value={startdate} onChange={onChange}/>
                <InputBox className="mb-6 mr-6 w-48" label="To" type="date" name="enddate" value={enddate} onChange={onChange}/>
                <Button type="submit" text="Generate" />
            </form>
        </div>

        </>
    );
};

export default Report;