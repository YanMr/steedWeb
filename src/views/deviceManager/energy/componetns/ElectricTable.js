import React from "react";
import { Table } from "antd";

const ElectricTable = () => {
    const li = {
      type: '灯光',
      week1: "12",
      week2: "12",
      week3: "12",
      week4: "12",
      week5: "12",
      week6: "12",
      week7: "12",
    };
    const tableData = [];
    Array.from(new Array(30)).forEach((item, key) => {
      tableData.push({ ...li, key: key, status: key % 2 === 0 ? 1 : 0 });
    });
    const tableHeader = [
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center'      
      },
      {
        title: '星期一',
        dataIndex: 'week1',
        key: 'week1',
        align: 'center'      
      },
      {
        title: '星期二',
        dataIndex: 'week2',
        key: 'week2',
        align: 'center'      
      },  
      {
        title: '星期三',
        dataIndex: 'week3',
        key: 'week3',
        align: 'center'      
      },
      {
        title: '星期四',
        dataIndex: 'week4',
        key: 'week4',
        align: 'center'      
      },
      {
        title: '星期五',
        dataIndex: 'week5',
        key: 'week5',
        align: 'center'      
      },
      {
        title: '星期六',
        dataIndex: 'week6',
        key: 'week6',
        align: 'center'      
      },
      {
        title: '星期日',
        dataIndex: 'week7',
        key: 'week7',
        align: 'center'      
      },                                   
    ];   
  return (
    <section className="electric-table-wrapper">
      <header className="electric-table-title">用电详情统计（kwh）</header>
      <Table className="electric-table" dataSource={tableData} columns={tableHeader} pagination={{ defaultPageSize: 10 }}></Table>
    </section> 
  )
}

export default ElectricTable;