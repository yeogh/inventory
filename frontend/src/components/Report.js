import {useState} from 'react';

//Assets
import Button from "./assets/Button";
import InputBox from "./assets/InputBox";


const Report = () => {

    const [reportSearch, setReportSearch] = useState({
        startdate:"",
        enddate:""
    });

    const [reportSummaryList, setReportSummaryList] = useState([]);
    const [reportDetailsList, setReportDetailsList] = useState([]);

    const [openTab, setOpenTab] = useState(1);

    const {startdate, enddate} = reportSearch;

    const onChange = (e) => {
        setReportSearch({...reportSearch, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {

            //summary
            const responseSummary = await fetch (`http://localhost:5001/products/reportsummary/${startdate}/${enddate}`, {
            method: "GET",
            headers: {token: localStorage.token}
            });

            // console.log('resp', response)
      
            const parseResSummary = await responseSummary.json();
      
            console.log(parseResSummary)
            setReportSummaryList(parseResSummary)

            //details
            const responseDetails = await fetch (`http://localhost:5001/products/reportdetails/${startdate}/${enddate}`, {
            method: "GET",
            headers: {token: localStorage.token}
            });

            // console.log('resp', response)
      
            const parseResDetails = await responseDetails.json();
      
            console.log(parseResDetails)
            setReportDetailsList(parseResDetails)
      
        } catch (err) {
            console.error(err.message);
        }
    }

    //Summary View
    const summaryView = reportSummaryList.map((element, index) => {
            
        return (
          <tr key={index}>
            <td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
              {element.code}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
              {element.size}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{element.option}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{element.count}
            </td>
          </tr>
        );
      });
    
    //Summary View
    const detailsView = reportDetailsList.map((element, index) => {
            
        return (
          <tr key={index}>
            <td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
              {element.code}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
              {element.size}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{element.option}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{element.date}
            </td>
          </tr>
        );
      });  

    return (
        <>
        <div className="flex-col items-center justify-center text-center mt-6">
            <h1>Report</h1>
            <form className="flex flex-row items-center justify-center mt-4" onSubmit={onSubmitForm}>
                <InputBox className="mb-6 mr-6 w-48" label="From" type="date" name="startdate" value={startdate} onChange={onChange}/>
                <InputBox className="mb-6 mr-6 w-48" label="To" type="date" name="enddate" value={enddate} onChange={onChange}/>
                <Button type="submit" text="Generate" />
            </form>
            <div className="flex flex-wrap mt-2">
                <div className="w-full">
                    <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +(openTab === 1? "text-white bg-blue-600"
                            : "text-blue-600 bg-white")}
                            onClick={e => {e.preventDefault(); setOpenTab(1);}}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist">Summary</a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2? "text-white bg-blue-600"
                            : "text-blue-600 bg-white")} onClick={e => {e.preventDefault(); setOpenTab(2);}}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist">Details</a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <table className="table-auto">
                                        <thead>
                                            <tr>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Product Code
                                                </th>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Size
                                                </th>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Option
                                                </th>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Total Qty Sold
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{summaryView}</tbody>
                                    </table>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <table className="table-auto">
                                        <thead>
                                            <tr>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Product Code
                                                </th>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Size
                                                </th>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Option
                                                </th>
                                                <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                                                Timestamp
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{detailsView}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Report;