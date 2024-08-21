import React, { useEffect, useState } from "react";
import { LoanRecord } from "../../../../models/LoanRecord";
import { useNavigate } from "react-router-dom";
import './ComponentHistoryItem.css';

interface ComponentHistoryItemProps {
    record: LoanRecord;
    email: string;
}

export const ComponentHistoryItemList: React.FC<ComponentHistoryItemProps> = ({ record, email }) => {
    const [name, setName] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${record.patron}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setName(`${data.user.firstName} ${data.user.lastName}`);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserName();
    }, [record.patron]);

    const visitProfile = () => {
        navigate(`/profile/${record.patron}`);
    }

    return (
        <div className="flex items-center ml-8 mt-4 bg-white">
            <div className="space-y-6 border-l-2 border-dashed mt-8 mb-2">
                <div className="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <div className="ml-6">
                        <h4 className="font-bold text-blue-500 cursor-pointer" onClick={visitProfile}>Student: {name}</h4>
                        <p className="mt-2 max-w-screen-sm text-sm text-gray-500 cursor-pointer" onClick={visitProfile}>Email: {email}</p>
                        <p className="mt-2 max-w-screen-sm text-sm text-gray-500">Loan Date: {new Date(record.loanedDate).toDateString()}</p>
                        <span className="mt-1 block text-sm font-semibold text-blue-500">
                            <span className={record.status === 'AVAILABLE' ? 'green' : 'red'}>{record.status}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
