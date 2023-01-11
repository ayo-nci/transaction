const TableBody = ({ tableData, columns}) => {
return (
    <tbody>
        {tableData.map((data) => {
            return (
                <tr key={data._id} id={data._id}>
                    
                    {columns.map(({accessor})=>{
                        const tData = accessor === "date" ? new Date(data[accessor]).toLocaleString() : data[accessor] ? data[accessor] : "--";
                        return <td key={accessor}>{tData}</td>;
                    })}
                </tr>
            );
        })}
    </tbody>
);
};

export default TableBody;