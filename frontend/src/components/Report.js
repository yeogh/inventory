import { useState, useRef } from "react";
// import { useDownloadExcel } from "react-export-table-to-excel";

//Assets
import Button from "./assets/Button";
import InputBox from "./assets/InputBox";

const Report = () => {
  const [reportSearch, setReportSearch] = useState({
    startdate: "",
    enddate: "",
  });

  const [reportSummaryList, setReportSummaryList] = useState([]);
  const [reportDetailsList, setReportDetailsList] = useState([]);

  const [openTab, setOpenTab] = useState(1);

  const tableSummary = useRef(null);
  const tableDetails = useRef(null);

  const { startdate, enddate } = reportSearch;

  const onChange = (e) => {
    setReportSearch({ ...reportSearch, [e.target.name]: e.target.value });
  };
  console.log(startdate);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      //summary
      const responseSummary = await fetch(
        `http://localhost:5001/products/reportsummary/${startdate}/${enddate}`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      // console.log('resp', response)

      const parseResSummary = await responseSummary.json();

      console.log(parseResSummary);
      setReportSummaryList(parseResSummary);

      //details
      const responseDetails = await fetch(
        `http://localhost:5001/products/reportdetails/${startdate}/${enddate}`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      // console.log('resp', response)

      const parseResDetails = await responseDetails.json();

      console.log(parseResDetails);
      setReportDetailsList(parseResDetails);
    } catch (err) {
      console.error(err.message);
    }
  };

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
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {element.option}
        </td>
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {element.count}
        </td>
      </tr>
    );
  });

  //Details View
  const convertdate = (element) => {
    const dataDate = new Date(element);

    // const dataDayOfMonth = dataDate.getDate();
    // const dataMonth = dataDate.getMonth(); // Be careful! January is 0, not 1
    // const dataYear = dataDate.getFullYear();

    // const dateString = dataDayOfMonth + "-" + (dataMonth + 1) + "-" + dataYear;

    const dateString = dataDate.toISOString().substr(0, 10);

    return dateString;
  };

  const converttime = (element) => {
    const dataDate = new Date(element);
    const timeString = dataDate.toISOString().substr(11, 8);
    return timeString;
  };

  const detailsView = reportDetailsList.map((element, index) => {
    return (
      <tr key={index}>
        <td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
          {element.code}
        </td>
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {element.size}
        </td>
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {element.option}
        </td>
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {convertdate(element.date)}
        </td>
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {converttime(element.date)}
        </td>
      </tr>
    );
  });

  //Download to Excel

  // const {onDownload} = useDownloadExcel({
  //     currentTableRef: tableSummary.current,
  //     filename: 'summary',
  //     sheet: 'summary'
  // })

  //Date setup
  let today = new Date();
  today.setDate(today.getDate());
  let todayuse = today.toLocaleDateString("eng-ca");

  return (
    <>
      <div className="flex-col items-center justify-center text-center mt-6">
        <h1>Report</h1>
        <form
          className="flex flex-row items-center justify-center mt-4"
          onSubmit={onSubmitForm}
        >
          <InputBox
            className="mb-6 mr-6 w-48"
            label="From"
            type="date"
            max={todayuse}
            name="startdate"
            value={startdate}
            onChange={onChange}
          />
          <InputBox
            className="mb-6 mr-6 w-48"
            label="To"
            type="date"
            min={startdate}
            name="enddate"
            value={enddate}
            onChange={onChange}
          />
          <Button type="submit" text="Generate" />
        </form>
        <div className="flex flex-wrap mt-2">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-blue-600"
                      : "text-blue-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Summary
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-blue-600"
                      : "text-blue-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Details
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    {/* <Button type="button" text="Export to Excel" /> */}
                    <table className="table-auto" ref={tableSummary}>
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
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
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
                            Date
                          </th>
                          <th className="font-normal text-slate-600 border-b p-4 pl-8 pt-0 pb-3 text-left">
                            Time
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
