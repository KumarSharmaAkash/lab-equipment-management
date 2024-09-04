import React, { useEffect, useState } from "react";
import { LoanRecord } from "../../models/LoanRecord";
import { ComponentHistoryItemList } from "../../features/component/components/ComponentHistoryItem/ComponentHistoryItemList";

const LoanedRecordsList: React.FC = () => {
    const [loanedRecords, setLoanedRecords] = useState<LoanRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<LoanRecord[]>([]);
    const [searchEmail, setSearchEmail] = useState<string>("");
    const [userEmails, setUserEmails] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLoanedRecords = async () => {
            try {
                const response = await fetch(`http://localhost:8000/loan`);
                if (!response.ok) {
                    throw new Error('Failed to fetch loaned records');
                }
                const data = await response.json();
                const records = data.records.filter((record: LoanRecord) => record.status === 'LOANED');

                records.sort((a: LoanRecord, b: LoanRecord) => {
                    const currentDate = new Date();
                    const dateA = new Date(a.loanedDate);
                    const dateB = new Date(b.loanedDate);
                    return Math.abs(currentDate.getTime() - dateA.getTime()) - Math.abs(currentDate.getTime() - dateB.getTime());
                });

                setLoanedRecords(records);
                setFilteredRecords(records);

                // Fetch user emails
                const emails: { [key: string]: string } = {};
                await Promise.all(records.map(async (record:any) => {
                    const userResponse = await fetch(`http://localhost:8000/users/${record.patron}`);
                    const userData = await userResponse.json();
                    emails[record.patron] = userData.user.email;
                }));
                setUserEmails(emails);
            } catch (err) {
                console.error(err);
                setError('Error fetching loaned records');
            }
        };

        fetchLoanedRecords();
    }, []);

    useEffect(() => {
        if (searchEmail) {
            setFilteredRecords(
                loanedRecords.filter(record => 
                    userEmails[record.patron]?.toLowerCase().includes(searchEmail.toLowerCase())
                )
            );
        } else {
            setFilteredRecords(loanedRecords);
        }
    }, [searchEmail, loanedRecords, userEmails]);

    return (
        <div className={`mt-20 h-${filteredRecords.length < 4 ? 'screen' : 'full'} bg-gray-100`}>
            {error && <p className="text-red-500 ">{error}</p>}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="px-4 py-2 border rounded-md ml-10 mt-14 text-gray-900"
                />
            </div>
            {filteredRecords.map((record) => (
                <ComponentHistoryItemList key={record._id} record={record} email={userEmails[record.patron]} />
            ))}
        </div>
    );
};

export default LoanedRecordsList;
