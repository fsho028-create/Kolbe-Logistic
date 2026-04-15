import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuditLogViewer = ({ logs }) => {
    const [filteredLogs, setFilteredLogs] = useState(logs);
    const [actionFilter, setActionFilter] = useState('');
    const [entityTypeFilter, setEntityTypeFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const filtered = logs.filter(log => {
            const actionMatch = actionFilter ? log.action === actionFilter : true;
            const entityTypeMatch = entityTypeFilter ? log.entityType === entityTypeFilter : true;
            const dateMatch = (
                (startDate ? new Date(log.date) >= new Date(startDate) : true) && 
                (endDate ? new Date(log.date) <= new Date(endDate) : true)
            );
            return actionMatch && entityTypeMatch && dateMatch;
        });
        setFilteredLogs(filtered);
    }, [logs, actionFilter, entityTypeFilter, startDate, endDate]);

    return (
        <div>
            <h1>Audit Log Viewer</h1>
            <div>
                <label>
                    Action:
                    <input type='text' value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} />
                </label>
                <label>
                    Entity Type:
                    <input type='text' value={entityTypeFilter} onChange={(e) => setEntityTypeFilter(e.target.value)} />
                </label>
                <label>
                    Start Date:
                    <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
            </div>
            <div>
                <h2>Logs</h2>
                <ul>
                    {filteredLogs.map((log, index) => (
                        <li key={index}>{log.date} - {log.action} - {log.entityType}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

AuditLogViewer.propTypes = {
    logs: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        entityType: PropTypes.string.isRequired,
    })).isRequired,
};

export default AuditLogViewer;
