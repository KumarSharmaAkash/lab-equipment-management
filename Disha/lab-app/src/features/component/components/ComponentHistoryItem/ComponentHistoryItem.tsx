import React, { useEffect, useState } from "react";
import { LoanRecord } from "../../../../models/LoanRecord";
import { useNavigate } from "react-router-dom";
import './ComponentHistoryItem.css';

interface ComponentHistoryItemProps {
    record: LoanRecord;
}

export const ComponentHistoryItem: React.FC<ComponentHistoryItemProps> = ({ record }) => {
    const [name, setName] = useState<string>(" ");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${record.patron}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setName(data.user.firstName + ' ' + data.user.lastName);
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
        <div className="component-history-item bg-white rounded mt-2">
            <p><span className={record.status === 'AVAILABLE' ? 'green' : 'red'}>{record.status}</span></p>
            <div className="component-history-item-group">
                <p
                    style={{ cursor: "pointer" }}
                    className="text-n-6"
                    onClick={visitProfile}
                >
                    Student: {name}
                </p>
                <p className="text-n-6">Loan Date: {new Date(record.loanedDate).toDateString()}</p>
                {record.status === 'AVAILABLE' && record.returnedDate && (
                    <p className="text-n-6">Returned Date: {new Date(record.returnedDate).toDateString()}</p>
                )}
            </div>
            <div className="component-history-item-group bg-white">
                <p className="text-n-6">Return by Date: {new Date(record.dueDate).toDateString()}</p>
            </div>
        </div>
    );
};
