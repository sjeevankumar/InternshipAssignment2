import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';


const Table = () => {
      const [data, setData] = useState([]);

      const columns = [
            { title: 'ID', field: 'id', editable: false },
            { title: 'Name', field: 'name' },
            { title: 'Username', field: 'username' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Website', field: 'website' },

      ]
      useEffect(() => {
            fetch("https://jsonplaceholder.typicode.com/users")
                  .then(res => res.json())
                  .then(res => {
                        console.log(res);
                        setData(res);
                  })

      }, [])
      return (
            <>
                        <MaterialTable title="Employee Data"
                              data={data}
                              columns={columns}
                              editable={{
                                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                                          console.log(newRow);
                                          const updatedRows = [...data, { id: Math.floor(Math.random() * (100 - 11 + 1) + 11), ...newRow }];
                                          setTimeout(() => {
                                                setData(updatedRows);
                                                console.log(data);
                                                resolve();
                                          }, 1000)
                                    }),
                                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                                          const index = (selectedRow.tableData.id);
                                          const updatedRows = [...data];
                                          updatedRows.splice(index, 1);
                                          setTimeout(() => {
                                                setData(updatedRows);
                                                resolve();
                                          }, 1000)
                                    }),
                                    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                                          const index = oldRow.tableData.id;
                                          const updatedRows = [...data];
                                          updatedRows[index] = updatedRow;
                                          setTimeout(() => {
                                                setData(updatedRows);
                                                resolve();
                                          }, 1000)

                                    })
                              }}
                              options={{
                                    exportButton: true,
                                    actionsColumnIndex: -1,
                                    addRowPosition: "first",
                              }}
                        />
                  
            </>
      )
}

export default Table;
