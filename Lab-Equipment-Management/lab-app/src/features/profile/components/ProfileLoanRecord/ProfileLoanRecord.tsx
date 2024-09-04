import React, { useEffect, useState } from 'react';
import { LoanRecord } from '../../../../models/LoanRecord';
import axios from 'axios';
import { RootState } from '../../../../redux/reduxStorage';
import { useSelector } from 'react-redux';

export const ProfileLoanRecord: React.FC = () => {
    const user = useSelector((state: RootState) => state.authentication.profileUser);
    const [records, setRecords] = useState<LoanRecord[]>([]);

    const fetchRecordsForUser = async () => {
        if (user) {
            try {
                let res = await axios.post(`http://localhost:8000/loan/query`, {
                    property: 'patron',
                    value: user._id
                });
                let r = res.data.records;
                setRecords(r);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchRecordsForUser();
    }, [user]);

    const loanedRecords = records
        .filter(record => record.status === 'LOANED')
        .sort((a, b) => new Date(b.loanedDate).getTime() - new Date(a.loanedDate).getTime());

    return (
        <div className="w-full mb-12 xl:mb-0 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                Loaned List
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <div className="max-h-64 overflow-y-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Loan Date
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Return By Date
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Barcode
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanedRecords.map((record, index) => (
                                    <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                            {record.item.genre.toLocaleLowerCase()}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                                            {new Date(record.loanedDate).toDateString()}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                                            {new Date(record.dueDate).toDateString()}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                                           <a target='_blank' href={`http://localhost:5173/catalog?barcode=${record.item.barcode}`}> {record.item.barcode}</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
